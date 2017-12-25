import BookModel from './schema/book';

const Book = {
    //获取所有教材
    getBooks(query) {
        return BookModel
            .find(query)
            .exec();
    },
    //获取单个教材信息
    getBook(id) {
        const query = {
            _id: id
        };
        return BookModel
            .findOne(query)
            .exec();
    },
    deleteBook(id) {
        const query = {
            _id: id
        };
        return BookModel
            .update(query, {
                $set: {
                    isDeleted: true,
                    status: '已删除'
                }
            })
            .exec();
    },
    updateBook(query) {
        return BookModel
            .update({
                _id: query._id
            }, query)
            .exec();
    },
    async createBook(body) {
        return await new BookModel(body).save();
    },
};

export default Book;