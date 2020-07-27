import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import {Link} from 'react-router-dom'
import './register.less'
import axios from '../../api/axios/axios'
import localUtils from '../../api/localStorage/localUtils'
import memUtils from '../../api/localStorage/memUtils'
class Register extends Component {
    state={
        loading: false,
        iconLoading: false
    }

    regIconLoading = () => {
        this.setState({ iconLoading: true });
    }
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            if (!err) {
                let resData = await axios.post('/register', values)
                if (resData.status === 0) {
                    localUtils.removeLoginInfo()
                    memUtils.isLogin={}
                    message.success(resData.message)
                    this.props.history.push('./login')
                } else {
                    message.error(resData.message)
                    this.setState({iconLoading:false})
                }
            }else{
                this.setState({
                    loading:false,
                    iconLoading: false
                })
            }
        })
    }
    pwdValidate = (rules, value, callback) => {
        let cfmPwd = this.props.form.getFieldValue('repassword');
        if (cfmPwd && cfmPwd !== value) {
            callback(new Error('两次密码输入不一致!'))
        } else {
            callback();
        }

    }
    cfmPwdValitdate = (rules, value, callback) => {

        let loginpass = this.props.form.getFieldValue('password');
        if (loginpass && loginpass !== value) {
            callback(new Error('两次密码输入不一致!'))
        } else {
            callback();
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className='register'>
                <Form onSubmit={this.handleSubmit} className="register-form">
                <h1 style={{color:'#1890FF',textAlign:'center'}}>注册</h1>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名不能为空！' },
                                // {whitespace:true ,message:"用户名不能含有空格!"},
                                { min: 6, message: '用户名的长度不能小于6个字符！' },
                                { max: 12, message: '用户名的长度不能大于12个字符！' },
                                { pattern: /^[a-zA-Z][a-zA-Z0-9]+$/, message: '用户名必须以字母开头' },
                                { validator: this.usernameValidate }
                            ],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\s+/g, "")
                            }
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="请输入用户名..."
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [
                                { required: true, message: '密码不能为空！' },
                                { validator: this.pwdValidate }
                            ],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\s+/g, "")
                            }
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请输入密码..."
                                autoComplete='off'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('repassword', {
                            rules: [
                                { required: true, message: '确认密码不能为空！' },
                                { validator: this.cfmPwdValitdate }
                            ],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\s+/g, "")
                            }
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="请再次输入密码..."
                                autoComplete='off'
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" icon='poweroff' loading={this.state.iconLoading} onClick={this.regIconLoading} className="register-form-button">注册</Button>
                        <Link to='/login'>已有账号？点此登录</Link>
                        {/* <a href="/login">已有账号？点此登录</a> */}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedNormalRegisterForm = Form.create({ name: 'normal_register' })(Register);
export default WrappedNormalRegisterForm