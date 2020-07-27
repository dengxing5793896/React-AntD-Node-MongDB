import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd'
import {  Redirect } from 'react-router-dom'
import './login.less'
import axios from '../../api/axios/axios'
import localUtils from '../../api/localStorage/localUtils';
import memUtils from '../../api/localStorage/memUtils'

class Login extends Component {
    state = {
        iconLoading: false
    }

    imgValidate = React.createRef()

    enterIconLoading = () => {
        this.setState({ iconLoading: true });
    }

    pwdValidate = (rule, value, callback) => {
        if (value === undefined) {
            value = ''
        }
        if (value.length < 6) {
            callback('密码的长度必须大于6位！')
        } else if (value.length > 16) {
            callback('密码的长度必须小于16位！')
        } else if (!/^[a-zA-Z0-9.!]+$/) {
            callback('密码只能含有字母，数字,".",或者"!"')
        } else {
            callback()
        }
    }

    imgChange = () => {
        let img = this.imgValidate.current
        img.src = img.src + '?num=' + Math.random()
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(async (err, values) => {
            // console.log(values)
            let { username, password } = values
            if (!err) {
                let resData = await axios.post('/login', { username, password })
                if (resData.status === 0) {
                    localUtils.setLloginInfo(resData.userInfo)
                    memUtils.isLogin=resData.userInfo
                    message.success(resData.message)
                    this.props.history.push('/admin/home')
                } else {
                    message.error(resData.message)
                    this.setState({
                        iconLoading: false
                    })
                }
            } else {
                this.setState({
                    isLoading: false,
                    iconLoading: false
                })
            }
        })
    }

    verify = async (rule, value, callback) => {
        let resData = await axios.post('/login/verify', { verify: value })
        if (resData === 0) {
            callback()
        } else {
            callback('验证码不正确！')
        }
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const userInfo = memUtils.isLogin
        if(userInfo.isUser){
            return <Redirect to='/admin'/>
        }
        return (
            <div className='login'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <h1 style={{ color: '#1890FF', textAlign: 'center' }}>登录</h1>
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [
                                { required: true, message: '用户名不能为空！' },
                                // {whitespace:true ,message:"用户名不能含有空格!"},
                                { min: 6, message: '用户名的长度不能小于6个字符！' },
                                { max: 12, message: '用户名的长度不能大于12个字符！' },
                                { pattern: /^[a-zA-Z][a-zA-Z0-9]+$/, message: '用户名必须以字母开头' }
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
                        {getFieldDecorator('verify', {
                            rules: [{ validator: this.verify }],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\s+/g, "")
                            }
                        })(
                            <Input
                                prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="text"
                                maxLength={4}
                                placeholder="请输入验证码..."
                                autoComplete='off'
                                style={{ width: '150px' }}
                            />,

                        )}
                        <img alt="" src='/login/captchapng' style={{ cursor: 'pointer' }} onClick={this.imgChange} ref={this.imgValidate} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" icon="poweroff" loading={this.state.iconLoading} onClick={this.enterIconLoading} htmlType="submit" className="login-form-button">登录</Button>
                        {/* <a href="/register">没有账号？点此注册</a> */}
                        {/* <Link to='/register'>没有账号？点此注册</Link> */}
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(Login);
export default WrappedNormalLoginForm