import React from 'react';
import {
    Link
}
from 'react-router';
import {
    Button,
    message
} from 'antd';
import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as bookActions from '../../actions/bookAction';
import './book.less';

@connect(
    state => {
        return ({
            auth: state.auth,
            book: state.book
        });
    },
    dispatch => {
        return ({
            bookActions: bindActionCreators(bookActions, dispatch)
        });
    }
)
export default class Book extends React.Component {
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
        this.props.bookActions.getBook(_id);
        this.apply = this.apply.bind(this);
    }
    apply() {
        const value = {
            userID: this.props.auth.user._id,
            userName: this.props.auth.user.name,
            userPhone: this.props.auth.user.phone,
            publisherID: this.props.book.detailBook.userID,
            bookID: this.props.book.detailBook._id,
            bookName: this.props.book.detailBook.name,
            bookType: this.props.book.detailBook.type
        };
        if (this.props.auth.user._id === this.props.book.detailBook.userID) {
            message.error('不允许申请自己发布的教材！');
            return;
        }
        if (!value.userID) {
            message.error('请先登录！');
            return;
        }
        this.props.bookActions.apply(value);
    }
    render() {
        const detailBook = this.props.book.detailBook;
        detailBook.role = detailBook.role || [];
        const date = new Date(detailBook.deadline);
        return (
            <div className="book">
                    <div className="title-container">
                        <div className="title-row">
                            <span className="title">{detailBook.name}</span>
                            <span className="views"></span>
                        </div>
                        <div className="detail-row clearfix">
                            <div className="detail-span">
                                <span className="name">学校</span>￥{detailBook.school}
                            </div>
                            <div className="detail-span">
                                <span className="name">适用年级</span>{detailBook.role}
                            </div>
                        </div>
                        <div className="detail-row clearfix">
                            <div className="detail-span">
                                <span className="name">价格</span>￥{detailBook.money}
                            </div>
                            <div className="detail-span">
                                <span className="name">类型</span>{detailBook.type}
                            </div>
                            <div className="detail-span">
                                <span className="name">截止日期</span>{date.toLocaleDateString()}
                            </div>
                            <Button type="primary" className="apply" onClick={this.apply}>申请</Button>
                        </div>
                    </div>
                    <div className="content-container">
                        <p>一、简介</p>
                        <blockquote>
                            <p>{detailBook.introduction}</p>
                        </blockquote>
                        <p>二、交易方式</p>
                        <blockquote>
                            <p>{detailBook.description}</p>
                        </blockquote>
                    </div>
            </div>
        );
    }
}
