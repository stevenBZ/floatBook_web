import React from 'react';
import {
    Link
}
from 'react-router';
import './User.less';
import {
    bindActionCreators
} from 'redux';
import '../../static/font/css/fontello.css';
import * as bookActions from '../../actions/bookAction';
import {
    connect
} from 'react-redux';
@connect(
    state => ({
        auth: state.auth,
        book:state.book
    }),
    dispatch => ({
        bookActions: bindActionCreators(bookActions, dispatch),
    })
)
export default class User extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
    }
    componentWillMount() {
        this.props.bookActions.getRecord({
            userID: this.props.auth.user._id
        });
        console.log('获得了book:',this.props.book.record)
    }
    
    render() {
        return (
            <div className="user clearfix">
                <div className="left">
                    <div className="level">
                        <img className="avatar" src={require('../../static/img/avatar.png')}/>
                        <div className="username">{this.props.auth.user.name}</div>
                        <div className="school-content">
                            {this.props.auth.user.school || '未填写院校'}
                        </div>
                    </div>
                    <div className="nav">
                        <Link activeClassName={"active"} className="item" to="/user/setting">
                            <i className="icon-cog-outline"></i>个人信息设置</Link>
                        <Link activeClassName={"active"} className="item" to="/user/publish">
                            <i className="icon-pencil"></i>发布教材</Link>
                        <Link activeClassName={"active"} className="item" to="/user/published">
                            <i className="icon-spin3"></i>已发布教材</Link>
                        <Link activeClassName={"active"} className="item" to="/user/applied">
                            <i className="icon-flag"></i>已申请教材</Link>
                    </div>
                </div>
                <div className="right">
                    <div className="achieve">
                        <div className="title">历史记录</div>
                        <div className="achieve-content">
                            <div className="item">
                                <div className="value">{this.props.book.record?this.props.book.record.applySum:'0'}</div>
                                <div className="name">已申请教材</div>
                            </div>
                            <div className="item">
                                <div className="value">{this.props.book.record?this.props.book.record.publishedSum:'0'}</div>
                                <div className="name">已发布教材</div>
                            </div>
                            <div className="item">
                                <div className="value"> 0</div>
                                <div className="name">评价</div>
                            </div>
                        </div>
                    </div>
                    <div className="content">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}
