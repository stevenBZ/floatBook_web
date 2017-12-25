import React from 'react';
import {
    Link
}
from 'react-router';
import './ShowList.less';
import '../../static/font/css/fontello.css';

export default class ShowList extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    };

    constructor(props) {
        super(props);
        this.showMore = this.showMore.bind(this);
        // 改变UI的临时state
        this.state = {
            listNum: 9
        };
    }
    showMore() {
        let listNum = this.state.listNum + 9;
        if (listNum < this.props.books.length) {
            listNum = this.props.books.length;
        }
        this.setState({
            listNum
        });
    }
    render() {
        const {
            books,
            filter
        } = this.props;
        let list = 0;

        let listComps = books.map(item => {
            if (filter.type !== '所有类型' && filter.type !== item.type) {
                return;
            }
            if (filter.role !== '所有年级' && filter.role!==item.role){
                return;
            }
            if (filter.school !== '' && filter.school!==item.school){
                return;
            }
            if (item.status === '已删除') {
                return false;
            }
            if (list === this.state.listNum) {
                return false;
            }
            list++;
            let imgUrl = require(`../../static/img/book/${(parseInt(item._id, 16) % 10 + 1)}.png`);
            return (
                <div className='list-item' key={item._id}>
                    <Link to={'/book/' + item._id} className='img'
                        style={{backgroundImage: item.img ? `url(${item.img})` : `url(${imgUrl})`}}>
                        <div className="introduction"><p>{item.introduction}</p></div>
                    </Link>
                    <div className="list-content">
                        <div className="name">{item.name}</div>
                        <div className="money"><span style={{color: '#c7c7c7'}}>￥</span>{item.money}</div>
                        <div className="deadline">截止时间: {(new Date(item.deadline)).toLocaleDateString()}</div>
                        <div className="info">
                          <div className="school">{item.school}</div>
                        </div>
                    </div>
                </div>
            );
        });
        listComps = listComps.filter(item => item !== false);
        return (
            <div className='show-list clearfix'>
                {
                    (() => {
                        if (listComps.length) {
                            return listComps;
                        }
                        return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
                    })()
                }
                <div className="show-more">
                {
                    (() => {
                        if (listComps.length === books.length) {
                            return <div></div>;
                        }
                        return (<div onClick={this.showMore}>显示更多</div>);
                    })()
                }
                </div>
            </div>
        );
    }
}
