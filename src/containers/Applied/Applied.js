import React from 'react';
import {
    Table,
    Icon,
    pagination,
    Modal,
    Rate
} from 'antd';

import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';

import * as bookActions from '../../actions/bookAction';
import './Applied.less';

const confirm = Modal.confirm;

@connect(
    state => ({
        auth: state.auth,
        book: state.book
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch),
    })
)
export default class Applied extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    componentDidMount() {
        this.props.bookActions.getAppliedBooks({
            userID: this.props.auth.user._id
        });
    }
    handleComment(id, userID, publisherID, value) {
        const query = {
            _id: id,
            comment2publisher: value,
            userID: userID,
            publisherID: publisherID,
            bookID: this.props.params._id
        };
        this.props.bookActions.updateApplierList(query);
    }
    render() {
        let {
            applyList
        } = this.props.book;
        let data = [];
        applyList = applyList || [];

        for (let i = applyList.length - 1; i >= 0; i--) {
            data.push({
                key: applyList[i]._id,
                _id: applyList[i]._id,
                userID: applyList[i].userID,
                publisherID: applyList[i].publisherID,
                bookName: applyList[i].bookName,
                bookType: applyList[i].bookType,
                status: applyList[i].status,
                comment: applyList[i].comment2publisher
            });
        }
        let pagination = {
            total: data.length,
            showSizeChanger: true,
            onShowSizeChange(current, pageSize) {},
            onChange(current) {},
        };
        let columns = [{
            title: '教材名',
            dataIndex: 'bookName',
            key: 'bookName'
        }, {
            title: '教材类型',
            dataIndex: 'bookType',
            key: 'bookType',
        }, {
            title: '申请状态',
            dataIndex: 'status',
            key: 'status',
        }, {
            title: '评价发布者',
            'dataIndex': 'comment',
            render: (text, record) => (<Rate onChange={this.handleComment.bind(this, record._id,record.userID, record.publisherID)} value={record.comment} />)
        }];
        return (
            <div className="applied">
                <div className="title">
                已申请教材
                </div>
                <Table dataSource={data} columns={columns} pagination={pagination}/>
            </div>
        );
    }
}
