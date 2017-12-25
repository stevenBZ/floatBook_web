import React from 'react';
import {
    Table,
    Icon,
    pagination,
    Modal
} from 'antd';
const confirm = Modal.confirm;

import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';

import * as bookActions from '../../actions/bookAction';

import './Admin.less';

@connect(
    state => ({
        book: state.book,
        auth: state.auth
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch),
    })
)
export default class Admin extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        //这里有点问题，获取教材列表和获取用户信息是两个请求，所以无法在，下面这个请求里加入用户信息
        this.props.bookActions.getBooks({
            admin: 1
        });
    }
    deleteBook(id, e) {
        e.preventDefault();
        const _this = this;
        confirm({
            title: '是否确认要删除这项内容',
            onOk() {
                return new Promise((resolve) => {
                    setTimeout(resolve, 0);
                    _this.props.bookActions.deleteBook(id);
                });
            },
            onCancel() {},
        });
    }
    updateBook(id, status, e) {
        e.preventDefault();
        const value = {
            _id: id,
            status: status
        }
        this.props.bookActions.updateBook(value);
    }
    render() {
        const {
            books
        } = this.props.book;
        const data = [];
        for (let i = books.length - 1; i >= 0; i--) {
            data.push({
                key: books[i]._id,
                _id: books[i]._id,
                name: books[i].name,
                type: books[i].type,
                status: books[i].status
            });
        }
        const pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {
                console.log('Current: ', current, '; PageSize: ', pageSize);
            },
            onChange(current) {
                console.log('Current: ', current);
            },
        };
        const columns = [{
            title: '教材名',
            dataIndex: 'name',
            key: 'name',
        }, {
            title: '教材类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => (
                <span>
                  <a href="#" onClick={this.updateBook.bind(this,record._id,'审核通过')}>审核通过</a>
                  <span className="ant-divider"></span>
                  <a href="#" onClick={this.updateBook.bind(this,record._id,'审核不通过')}>不通过</a>
                  <span className="ant-divider"></span>
                  <a href="#" onClick={this.deleteBook.bind(this,record._id)}>删除</a>
                </span>
            ),
        }];
        return (
            <div className="admin">
                <div className="title">
                管理员界面
                </div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
