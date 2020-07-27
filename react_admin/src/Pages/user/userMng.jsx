import React, { Component } from 'react'
import { Table, Card, message, Button, Modal,Popconfirm } from 'antd'
import axios from '../../api/axios/axios'
import memUtil from '../../api/localStorage/memUtils'
import UserAddForm from './userAddForm'
export default class userMng extends Component {
    state = {
        user: [],
        loading: false,
        isShow: false
    }

    initColumns = () => {
        return this.columns = [
        {
            title:'姓名',
            dataIndex:'name'
        },
        {
            title: '用户名',
            dataIndex: 'username',
        },
        {
            title: '密码',
            dataIndex: 'password',
        },
        {
            title: '角色',
            dataIndex: 'auth_name'
        },
        {
            title: '操作',
            width: 200,
            render: this.operationRender
        }]
    }

    componentWillMount() {
        this.getUser()
    }

    getUser = async () => {
        this.setState({
            loading: true
        })
        let res = await axios.get('/user/get')
        let resArr = res.data.filter(item => item.username !== memUtil.isLogin.username)
        if (res.status === 0) {
            this.setState({
                user: resArr
            })
            this.setState({
                loading: false
            })
        } else {
            message.success('获取用户数据失败')
            this.setState({
                loading: false
            })
        }

    }

    onOk = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                const { username, password, name, authority } = values
                let res = await axios.post('/user/checkAndAdd', { username, password, name, authority })
                if(res===0){
                    message.success('添加成功')
                    this.setState({
                        isShow:false
                    })
                }else{
                    message.error('添加失败')
                    this.setState({
                        isShow:true
                    })
                }
                this.form.resetFields()
            }
        })
    }

    onCancel = () => {
        this.form.resetFields()
        this.setState({
            isShow: false
        })
    }

    addUser = () => {
        this.setState({
            isShow: true
        })
    }

    update = (text) => {
        this.props.history.push({pathname:'/admin/userMng/update',text})
    }

    delete=async(_id)=>{
        this.setState({
            loading:true
        })
        let res = await axios.post('/user/delete',{_id})
        if(res.status===0){
            message.success(res.message)
            this.setState({loading:false},()=>{
                this.getUser()
            })
        }else{
            message.error(res.message)
            this.setState({loading:false})
        }
    }

    operationRender = (text) => {
        return (
            <span>
                <Button type='link' onClick={() => this.update(text)}>修改</Button>
                <Popconfirm  title='确定删除吗？' onConfirm={() => this.delete(text._id)}><Button type='link'>删除</Button></Popconfirm>
            </span>
        )
    }


    render() {
        const { isShow } = this.state
        const title = (
            <span>
                <Button type='primary' onClick={this.addUser} icon='plus'>添加用户</Button> &nbsp; &nbsp;
                {/* <Button type='primary' onClick={this.setAuth} icon='edit'>设置权限</Button> */}
            </span>
        )
        const { user, loading } = this.state
        return (
            <div>
                <Card title={title}>
                    <Table bordered 
                    loading={loading} 
                    columns={this.initColumns()} 
                    dataSource={user} 
                    rowKey='_id' 
                    pagination={{defaultPageSize:10}}>
                    </Table>
                    <Modal title='添加用户' visible={isShow} onOk={this.onOk} onCancel={this.onCancel}>
                        <UserAddForm getForm={(form) => this.form = form}></UserAddForm>
                    </Modal>
                </Card>
            </div>
        )
    }
}
