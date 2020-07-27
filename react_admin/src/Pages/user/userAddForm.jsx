import React, { Component } from 'react'
import { Form, Input, Select, message } from 'antd'
import axios from '../../api/axios/axios'
import lodash from 'lodash'
const { Item } = Form
const { Option } = Select
const { debounce } = lodash
class userAddForm extends Component {
    state = {
        role: []
    }

    componentDidMount() {
        this.getAuth()
        this.getForm()
    }

    getForm = () => {
        const { getForm } = this.props
        getForm(this.props.form)
    }

    getAuth = async () => {
        let res = await axios.get('/role/get')
        if (res.status === 0) {
            this.setState({
                role: res.data
            })
        } else {
            message.error('获取角色失败')
        }
    }

    checkUsername = debounce((rule, value, callback) => {
        axios.post('/user/checkAndAdd', { username: value}).then(res => {
            if (res === 0) {
                callback('用户名已存在')
            }else{
                callback()
            }
        })
    }, 500)

    render() {
        const { getFieldDecorator  } = this.props.form
        const { role } = this.state
        return (
            <div>
                <Form labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
                    <Item label='用户名' >
                        {
                            getFieldDecorator('username', {
                                rules: [
                                    {
                                        required: true,
                                        message: '用户名不能为空'
                                    },
                                    { validator: this.checkUsername }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }

                            })(
                                <Input></Input>
                            )
                        }
                    </Item>
                    <Item label='密码' >
                        {
                            getFieldDecorator('password', {
                                rules: [
                                    {
                                        required: true,
                                        message: '密码不能为空'
                                    }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }
                                
                            })(
                                <Input></Input>
                            )
                        }
                    </Item>
                    <Item label='姓名' >
                        {
                            getFieldDecorator('name', {
                                rules: [
                                    {
                                        required: true,
                                        message: '姓名不能为空'
                                    }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }
                            })(
                                <Input></Input>
                            )
                        }
                    </Item>
                    <Item label='角色' >
                        {
                            getFieldDecorator('authority', {
                                rules: [
                                    {
                                        required: true,
                                        message: '角色不能为空'
                                    }
                                ],
                            })(
                                <Select>
                                    {
                                        role.map(item => {
                                            return <Option key={item._id} value={item._id+'%'+item.name}>{item.name}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Item>
                </Form>
            </div>
        )
    }
}

export default Form.create()(userAddForm)