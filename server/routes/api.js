import db from '../models/index';
import moment from 'moment';
import webtoken from 'jsonwebtoken';

const {
    Book,
    User,
    Apply
} = db;

export default function (Router) {
    const router = new Router({
        prefix: '/api'
    });

    router.post('/upload', async function () {
        this.body = {
            response: '上传文件'
        };
    });
    router.get('/books', async function () {
        const {
            admin,
            userID
        } = this.query;
        let book = [];
        let publishedBook = [];
        if (admin) {
            //管理员可查看所有
            book = await Book.getBooks();
        } else if (userID) {
            //用户查看自己已发布
            let publishedBook = await Book.getBooks({
                userID: userID
            });
            this.body = {
                publishedBook: publishedBook,
                success: '成功获取已发布的教材列表'
            };
            return;
        } else {
            //首页显示已通过
            book = await Book.getBooks({
                status: '审核通过'
            });
        }


        this.body = {
            book: book,
            success: '成功获取教材列表'
        };
    });

    router.post('/books', async function () {
        const body = this.request.body;
        const newBook = await Book.createBook(body);
        this.body = {
            success: '教材已成功发布，请等待管理员审核',
            book: newBook
        };
    });

    router.get('/book/:_id', async function () {
        const {
            _id
        } = this.params;

        const book = await Book.getBook(_id);
        if (!book) {
            this.body = {
                message: 'book not found'
            };
            return;
        }
        // 增加浏览次数
        book.views++;
        try {
            const body = {
                book: book,
                success: '获取详细教材信息'
            };
            this.body = body;
            book.save();
        } catch (e) {
            this.status = 403;
            this.body = 'err';
        }
    });
    router.delete('/book/:_id', async function () {
        const {
            _id
        } = this.params;
        const book = await Book.deleteBook(_id);
        console.log(book.result);

        this.body = {
            _id: _id,
            success: '成功删除教材'
        };
    });
    router.put('/book/:_id', async function () {
        const {
            _id
        } = this.params;
        const body = this.request.body;
        const result = await Book.updateBook(body);
        const book = await Book.getBook(_id);
        this.body = {
            book: book,
            success: '成功更新教材状态'
        };
    });
    router.post('/apply', async function () {
        const body = this.request.body;

        const exist = await Apply.existApply(body);
        if (exist) {
            this.body = {
                error: '请勿重复申请！'
            };
            this.status = 401;
            return;
        }
        const newApply = await Apply.createApply(body);
        this.body = {
            success: '已成功申请'
        };
    });
    router.put('/apply', async function () {
        const body = this.request.body;
        const result = await Apply.updateApply(body);

        let applyList;
        if (body.comment2publisher) {
            let userInfo = await User.getInfo({
                _id: body.publisherID
            })
            let level = userInfo.level + body.comment2publisher;
            userInfo = await User.updateInfo({
                _id: body.publisherID,
                level: level
            })
            applyList = await Apply.getApplied({
                userID: body.userID
            })
        } else if (body.comment2applier) {
            let userInfo = await User.getInfo({
                _id: body.userID
            })
            let level = userInfo.level + body.comment2applier;
            userInfo = await User.updateInfo({
                _id: body.userID,
                level: level
            });
            applyList = await Apply.getApplied({
                bookID: body.bookID
            })
        } else {
            applyList = await Apply.getApplied({
                bookID: body.bookID
            });
        }

        this.body = {
            applyList: applyList,
            success: '成功更新教材申请者列表'
        };
    });
    router.get('/apply', async function () {
        const {
            userID,
            bookID
        } = this.query;
        if (userID) {
            const applyList = await Apply.getApplied({
                userID: userID
            });
            this.body = {
                applyList: applyList,
                success: '成功获取申请教材列表'
            };
        } else {
            const applyList = await Apply.getApplied({
                bookID: bookID
            });
            this.body = {
                applyList: applyList,
                success: '成功获取教材申请者列表'
            };
        }

    });

    router.post('/login', async function () {
        let body = this.request.body;
        let {
            email,
            password
        } = body;

        let authInfo = await User.getAuth(email);

        if (!authInfo) {
            this.body = {
                error: '账号不存在'
            };
            this.status = 401;
            return;
        }
        if (password !== authInfo.password) {
            this.body = {
                error: '密码错误'
            };
            this.status = 401;
            return;
        }

        // this.set('Access-Control-Allow-Credentials', true);
        // this.cookies.set('userInfo', '1111', {
        //     httpOnly: false,
        //     domain: '127.0.0.1',
        // });
        let userInfo = await User.getInfo({
            email: email
        });
        let playload = {
            user: userInfo
        };
        let expires = moment().add(7, 'days').valueOf();
        let token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
        });
        this.body = {
            token,
            success: '登陆成功',
        };
    });

    router.post('/register', async function () {

        const body = this.request.body;
        const {
            email
        } = body;
        const authInfo = await User.getAuth(email);
        if (authInfo) {
            this.body = {
                error: '该邮箱已注册'
            };
            this.status = 401;
            return;
        }
        const newUser = await User.createUser(body);
        this.body = {
            success: '注册成功'
        };

    });


    router.get('/valid', async function () {
        const accessToken = this.headers['x-access-token'];
        const token = accessToken;
        const decoded = webtoken.verify(token, 'keys');
        if (decoded.exp <= Date.now()) {
            this.body = {
                error: '登录状态已过期，请重新登录'
            };
            return;
        }
        if (decoded) {
            this.body = {
                token,
                error: '',
                success: '登陆成功'
            };
            return;
        }
    });

    router.post('/setting', async function () {
        const body = this.request.body;
        const updateInfo = await User.updateInfo(body);
        const userInfo = await User.getInfo({
            _id: body._id
        });
        const playload = {
            user: userInfo
        };
        const expires = moment().add(7, 'days').valueOf();
        const token = webtoken.sign(playload, 'keys', {
            issuer: userInfo._id.toString(),
            expiresIn: expires
        });
        this.body = {
            token,
            success: '修改信息成功'
        };
    });

    router.get('/record',async function(){
        const {
            userID
        } = this.query;
        let applyList = [];
        let publishedList = [];
        const body=this.request.body;
        applyList = await Apply.getApplied({
            userID: userID
        });
        const applySum=applyList.length;
        publishedList = await Book.getBooks({
            userID: userID
        });
        const publishedSum=publishedList.length;
        const record={
            applySum:applySum,
            publishedSum:publishedSum
        }
        this.body={
            record:record,
            success:'获取记录成功'
        }
        console.log('用户id为:',userID)
        console.log('这里成功了',record.applySum)
        console.log('这里成功了',record.publishedSum)
        
    })

    return router.routes();
}
