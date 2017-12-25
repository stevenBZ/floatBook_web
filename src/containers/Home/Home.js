import React from 'react';

import {
    Select,
    Carousel,
    Input, 
    Button
} from 'antd';
import {
    bindActionCreators
} from 'redux';
import {
    connect
} from 'react-redux';
import * as bookActions from '../../actions/bookAction';
import './home.less';
import ShowList from '../../components/ShowList/ShowList.js';

const Option = Select.Option;
const InputGroup = Input.Group;

@connect(
    state => {
        return ({
            books: state.book.books
        });
    },
    dispatch => {
        return ({
            bookActions: bindActionCreators(bookActions, dispatch)
        });
    }
)
export default class Home extends React.Component {
    static propTypes = {
        name: React.PropTypes.string
    }

    constructor(props) {
        super(props);
        this.handleTypeClick = this.handleTypeClick.bind(this);
        this.handleRoleClick = this.handleRoleClick.bind(this);
        this.handleSchoolSearch = this.handleSchoolSearch.bind(this);
        this.state = {
            type: '所有类型',
            role: '所有年级',
            school:''
        };
    }
    componentDidMount() {
        this.props.bookActions.getBooks();
    }

    handleTypeClick(value) {
        this.setState({
            type: value
        });
    }
    handleRoleClick(value) {
        this.setState({
            role: value
        });
    }
    handleSchoolSearch(e){
        console.log(e.target.value)
        this.setState({
            school:e.target.value
        });
    }
    render() {
        const books = this.props.books || [];
        const settings = {
            dots: true,
            infinite: true,
            speed: 500
        };
        return (
            <div className="home">
                <Carousel className="banner" effect="fade" autoplay {...settings}>
                    <div><img className="message" src={require('../../static/img/swip1.png')}/></div>
                    <div><img className="design" src={require('../../static/img/swip2.png')}/></div>
                    <div><img className="join" src={require('../../static/img/swip3.png')}/></div>
                    <div><img className="no1" src={require('../../static/img/swip4.png')}/></div>
                </Carousel>
                <div className="filter">
                    <Select defaultValue="所有类型" style={{width: 120}} onChange={this.handleTypeClick}>
                        <Option value="所有类型">所有类型</Option>
                        <Option value="英语">英语</Option>
                        <Option value="考研">考研</Option>
                        <Option value="计算机">计算机</Option>
                        <Option value="金融">金融</Option>
                        <Option value="其他">其他</Option>
                    </Select>
                    <Select defaultValue="所有年级" style={{width: 120}} onChange={this.handleRoleClick}>
                    <Option value="大一">大一</Option>
                    <Option value="大二">大二</Option>
                    <Option value="大三">大三</Option>
                    <Option value="大四">大四</Option>
                    <Option value="所有年级">所有年级</Option>
                    </Select> 
                    <Input placeholder="请输入学校" style={{width:240}}  onPressEnter={this.handleSchoolSearch} />
                </div>
             
                   
            
                {
                    (() => {
                        if (books.length) {
                            return <ShowList books={books} filter={this.state}/>;
                        }
                        return <div style={{textAlign: 'center', paddingTop: '60px'}}>暂无数据</div>;
                    })()
                }
            </div>
        );
    }
}
