import React, { Component } from 'react'
import { Form, Input, Card, Button, message, Select } from 'antd'
import axios from '../../api/axios/axios'
import { Redirect } from 'react-router-dom'
const { Item } = Form
const { Option } = Select
class userUpdate extends Component {
    state = {
        data: [],
        loading: false,
        role: []
    }
    componentWillMount() {
        this.initData()
        this.getRole()
    }

    initData = () => {
        // console.log(this.props.location)
        this.setState({
            data: this.props.location.text
        })
    }

    getRole = async () => {
        let res = await axios.get('/role/get')
        if (res.status === 0) {
            this.setState({
                role: res.data
            })
        } else {
            message.error('获取权限失败')
        }
    }

    checkRole=(role,value,callback)=>{
        if(value=='请选择...'){
            callback('请设置新的角色')
        }else{
            callback()
        }
    }

    handleSubmit = (e) => {

        e.preventDefault()
        this.setState({loading:true})
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                const {username,password,auth}=values
                const authArr =auth.split('%')
                let res = await axios.post('/user/update',{username,password,auth_id:authArr[0],auth_name:authArr[1]})
                if(res.status===0){
                    message.success('修改成功')
                    this.setState({loading:false})
                    this.props.history.push('/admin/userMng/')
                }else{
                    message.error('修改失败')
                    this.setState({loading:false})
                }
            }else{
                message.error('数据提交失败')
                this.setState({loading:false})
            }
        })
    }

    render() {
        if (!this.state.data) {
            return <Redirect to='/admin/userMng/'></Redirect>
        }
        const { getFieldDecorator } = this.props.form
        const { name, username, password, auth_name, auth_id } = this.state.data
        const { role } = this.state
        return (
            <Card>
                <Form wrapperCol={{ span: 4 }} labelCol={{ span: 2 }} onSubmit={this.handleSubmit}>
                    <Item label='姓名'>
                        {getFieldDecorator('name', {
                            initialValue: name,
                            rules: [{ required: true, message: '姓名不能为空' }]
                        })(
                            <Input disabled></Input>
                        )}
                    </Item>
                    <Item label='用户名'>
                        {getFieldDecorator('username', {
                            initialValue: username,
                            rules: [{ required: true, message: '用户名不能为空' }]
                        })(
                            <Input disabled></Input>
                        )}
                    </Item>
                    <Item label='密码'>
                        {getFieldDecorator('password', {
                            initialValue: password,
                            rules: [{ required: true, message: '密码不能为空' }]
                        })(
                            <Input></Input>
                        )}
                    </Item>
                    <Item label='角色'>
                        {getFieldDecorator('auth', {
                            initialValue: '请选择...',
                            rules: [
                                { required: true, message: '角色不能为空' },
                                { validator:this.checkRole}
                            ]
                        })(
                            <Select>
                                {role.map(item => <Option key={item._id} value={item._id + '%' + item.name}>{item.name}</Option>)}
                            </Select>
                        )}
                    </Item>

                    <Item wrapperCol={{ span: 12 }}>
                        <Button style={{ marginLeft: 150 }} type="primary" loading={this.state.loading} htmlType="submit" >提交</Button>
                        &nbsp;&nbsp;&nbsp;&nbsp;<Button type="primary" onClick={()=>this.props.history.goBack(-1)}>返回</Button>
                    </Item>
                </Form>
            </Card>
        )
    }
}

export default Form.create()(userUpdate)