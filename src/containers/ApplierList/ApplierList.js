import React from 'react';
import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as bookActions from '../../actions/bookAction';
import {
    Table,
    Rate
} from 'antd';
import './ApplierList.less';

@connect(
    state => {
        return ({
            auth: state.auth,
            book: state.book,
            applyList: state.applyList
        });
    },
    dispatch => {
        return ({
            bookActions: bindActionCreators(bookActions, dispatch)
        });
    }
)
export default class ApplierList extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        const {
            _id
        } = this.props.params;
        this.props.bookActions.getApplierList({
            bookID: _id
        });
    }
    updateApplierList(id, status, e) {
        e.preventDefault();
        const value = {
            _id: id,
            status: status,
            bookID: this.props.params._id
        };
        this.props.bookActions.updateApplierList(value);
    }
    handleComment(id, userID, value) {
        const query = {
            _id: id,
            comment2applier: value,
            userID: userID,
            bookID: this.props.params._id
        }
        this.props.bookActions.updateApplierList(query);
    }

    render() {
        let applyList = this.props.book.applyList;
        const data = [];
        applyList = applyList || [];
        for (let i = applyList.length - 1; i >= 0; i--) {
            data.push({
                key: applyList[i]._id,
                _id: applyList[i]._id,
                bookName: applyList[i].bookName,
                userID: applyList[i].userID,
                userName: applyList[i].userName,
                userPhone: applyList[i].userPhone,
                status: applyList[i].status,
                comment: applyList[i].comment2applier
            });
        }
        const pagination = {
            total: data.length,
            onShowSizeChange(current, pageSize) {},
            onChange(current) {}
        };
        const columns = [{
            title: '教材名',
            dataIndex: 'bookName',
            key: 'bookName'
        }, {
            title: '申请者',
            dataIndex: 'userName',
            key: 'userName'
        }, {
            title: '申请者电话',
            dataIndex: 'userPhone',
            key: 'phone'
        }, {
            title: '申请状态',
            dataIndex: 'status',
            key: 'status'
        }, {
            title: '操作',
            key: 'operation',
            render: (text, record) => {
                return (
                    <span>
                        <a href="#" onClick={this.updateApplierList.bind(this, record._id, '同意')}>同意</a>
                        <span className="ant-divider"></span>
                        <a href="#" onClick={this.updateApplierList.bind(this, record._id, '回绝')}>回绝</a>
                    </span>
                );
            }
        }, {
            title: '评价申请者',
            dataIndex: 'comment',
            render: (text, record) => {
                return (
                    <Rate
                        onChange={this.handleComment.bind(this, record._id, record.userID)}
                        value={record.comment}/>
                );
            }
        }];
        return (
            <div className="applierlist">
                <div className="title">该教材申请者列表</div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
