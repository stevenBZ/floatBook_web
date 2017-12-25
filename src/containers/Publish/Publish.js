import React from 'react';
import {
    Form,
    Input,
    Select,
    Checkbox,
    Radio,
    InputNumber,
    DatePicker,
    Col,
    Button,
    Upload,
    Icon,
    message
}
from 'antd';
import {
    connect
}
from 'react-redux';
import {
    bindActionCreators
}
from 'redux';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const createForm = Form.create;
const CheckboxGroup = Checkbox.Group;

import * as bookActions from '../../actions/bookAction';

import './Publish.less';

@connect(
    state => ({
        auth: state.auth,
        data: state.data
    })
)
class Publish extends React.Component {
    static propTypes = {
        name: React.PropTypes.string,
    };
    static contextTypes = {
        router: React.PropTypes.object
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTypeSelect = this.handleTypeSelect.bind(this);
        this.handleRoleSelect = this.handleRoleSelect.bind(this);        
        this.handleUpload = this.handleUpload.bind(this);
        this.state = {
            type: '英语',
            fileList: []
        };
    }
    componentDidMount() {
        const {
            dispatch
        } = this.props;
        this.bookActions = bindActionCreators(bookActions, dispatch);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((errors, values) => {
            if (!!errors) {
                console.log('Errors in form!!!');
                return;
            }
            var stateValues = {
                role: this.state.role,
                type: this.state.type
            }
            if (this.state.fileList.length > 0) {
                stateValues.img = this.state.fileList[0].thumbUrl;
            }
            this.bookActions.publish(Object.assign({}, values, stateValues, {
                userID: this.props.auth.user._id
            }), () => {
                this.props.form.resetFields();
                this.setState({
                    'role': [],
                    'type': '英语',
                    'fileList': []
                })
            });
        });

    }
    handleTypeSelect(value) {
        this.setState({
            'type': value
        });
    }
    handleRoleSelect(value) {
        this.setState({
            'role': value
        });
    }
    handleUpload(info) {
        let fileList = info.fileList;
        this.setState({
            fileList
        });
    }
    render() {
        const {
            getFieldProps,
            getFieldError,
            isFieldValidating
        } = this.props.form;
        const nameProps = getFieldProps('name', {
            rules: [{
                required: true,
                message: '请填写书籍名称'
            }]
        });
        const introductionProps = getFieldProps('introduction', {
            rules: [{
                required: true,
                message: '请填写书籍简介'
            }]
        });
        const descriptionProps = getFieldProps('description', {
            rules: [{
                required: true,
                message: '请填写交易方式'
            }]
        });
        const formItemLayout = {
            labelCol: {
                span: 6
            },
            wrapperCol: {
                span: 14
            },
        };
        const uploadProps = {
            action: '//127.0.0.1:3000/api/upload',
            onChange: this.handleUpload,
            beforeUpload: (file) => {
                const isPicture = file.type === 'image/jpeg' || file.type === 'image/png';
                if (!isPicture) {
                    message.error('只能上传 JPG/PNG 文件哦！');
                }
                return isPicture;
            }
        };
        return (
            <Form horizontal form={this.props.form} className="publish">
                <FormItem
                    {...formItemLayout}
                    label="教材名称"
                    hasFeedback
                    required
                    help={isFieldValidating('name') ? '校验中...' : (getFieldError('name') || []).join(', ')}
                >
                    <Input {...nameProps} autoComplete="off"/>
                </FormItem>

                <FormItem
                    label="教材简介"
                    {...formItemLayout}
                    hasFeedback
                    required
                >
                    <Input {...introductionProps} type="textarea" rows="3" />
                </FormItem>
                <FormItem
                    label="交易方式"
                    {...formItemLayout}
                    hasFeedback
                    required
                >
                    <Input {...descriptionProps} type="textarea" rows="3" />
                </FormItem>
                <FormItem
                    label="所在学校"
                    {...formItemLayout}
                    required
                >
                    <Input  {...getFieldProps('school') } style={{ width: 200 }}/>
                </FormItem>
                <FormItem label = "教材类型" {...formItemLayout} required>
                    <Select size="large" defaultValue="英语" style={{ width: 200 }} onChange={this.handleTypeSelect}>
                    <Option value="英语">英语</Option>
                    <Option value="考研">考研</Option>
                    <Option value="计算机">计算机</Option>
                    <Option value="金融">金融</Option>
                    <Option value="其他">其他</Option>
                    </Select>
                </FormItem>
                <FormItem label = "适用年级" {...formItemLayout} required>
                    <Select size="large" defaultValue="所有年级" style={{ width: 200 }} onChange={this.handleRoleSelect}>
                    <Option value="大一">大一</Option>
                    <Option value="大二">大二</Option>
                    <Option value="大三">大三</Option>
                    <Option value="大四">大四</Option>
                    <Option value="所有年级">所有年级</Option>
                    </Select>
                </FormItem>
                <FormItem
                    label="参考价格(￥)"
                    {...formItemLayout}
                    required
                >
                    <Input type="number" {...getFieldProps('money') } min={0} max={1000000} style={{ width: 200 }}/>
                </FormItem>
                <FormItem
                    label="截止日期"
                    {...formItemLayout}
                    required
                >
                    <DatePicker {...getFieldProps('deadline')} />
                </FormItem>
                <FormItem
                    label="图片上传"
                    {...formItemLayout}
                    help="点击上传教材展示图片"
                >
                    <Upload name="logo" listType="picture" {...uploadProps} >
                        <Button type="ghost">
                            <Icon type="upload" /> 点击上传
                        </Button>
                    </Upload>
                </FormItem>
                <FormItem wrapperCol={{ span: 18, offset: 6 }}>
                    <Button type="primary" onClick={this.handleSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
}

export default createForm()(Publish);
