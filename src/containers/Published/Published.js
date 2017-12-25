import React from 'react';
import {
    Table,
    Icon,
    pagination,
    Modal
}
from 'antd';
const confirm = Modal.confirm;
import {
    bindActionCreators
}
from 'redux';
import {
    connect
}
from 'react-redux';
import {
    Link
}
from 'react-router';

import * as bookActions from '../../actions/bookAction';
import './Published.less';

@connect(
    state => ({
        auth: state.auth,
        book: state.book
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch),
    })
)
export default class Published extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.bookActions.getBooks({
            userID: this.props.auth.user._id
        });
    }
    updateBook(id, status, e) {
        e.preventDefault();
        const value = {
            _id: id,
            status: status
        };
        this.props.bookActions.updateBook(value);
    }
    render() {
        let {
            publishedBook
        } = this.props.book;
        const data = [];
        publishedBook = publishedBook || [];
        for (let i = publishedBook.length - 1; i >= 0; i--) {
            data.push({
                key: publishedBook[i]._id,
                _id: publishedBook[i]._id,
                name: publishedBook[i].name,
                type: publishedBook[i].type,
                status: publishedBook[i].status
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
            title: '类型',
            dataIndex: 'type',
            key: 'type',
        }, {
            title: '状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '查看申请者列表',
            dataIndex: 'lookApplierList',
            render: (text, record) => (<Link to={'/user/applierList/'+record._id}>查看申请者列表</Link>)
        },
         {
            title: '更改教材状态',
            dataIndex: 'updateBook',
            render: (text, record) => (
                <span>
                    <a href="#" onClick={this.updateBook.bind(this,record._id,'已售出')}>已售出</a>
                    <span className="ant-divider"></span>
                    <a href="#" onClick={this.updateBook.bind(this,record._id,'未售出')}>未售出</a>
                </span>
            )
        }
    ];

        return (
            <div className="published">
                <div className="title">
                已发布教材
                </div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
