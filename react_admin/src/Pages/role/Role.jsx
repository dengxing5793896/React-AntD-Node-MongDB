import React, { Component } from 'react'
import { Card, Table, Modal, Button, message } from 'antd'
import RoleAddForm from './RoleAddForm'
import AuthAddForm from './AuthAddForm'
import axios from '../../api/axios/axios'
import memUtils from '../../api/localStorage/memUtils'
export default class Role extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            role: {},
            roles: [],
            total: '',
            isShow: false,
            ShowAuth: false,

        }

        this.AuthAddForm = React.createRef()
    }


    initColumns = () => {
        this.columns = [
            {
                title: '角色名称',
                dataIndex: 'name'
            },
            {
                title:'权限等级',
                dataIndex:'auth_level'
            },
            {
                title: '创建时间',
                dataIndex: 'create_time'
            },
            {
                title: '授权时间',
                dataIndex: 'auth_time'
            },
            {
                title: '授权人',
                dataIndex: 'auth_name'
            }
        ]
    }

    componentWillMount() {
        this.initColumns()
    }

    componentDidMount() {
        this.getRole()
    }

    getRole = async () => {
        let res = await axios.get('/role/get')
        if (res.status === 0) {
            this.setState({
                roles: res.data,
            
            })
        } else {
            message.error('获取角色数据失败')
        }
    }

    getRows =async()=>{
        let res =await axios.get(`/role/get?_id=${this.selectedRowKey}`)
        // console.log(res.data)
        let resArr =[]
        resArr.push(res.data)
        if(res.status===0){
            this.setState({
                role:resArr
            })
        }else{
            message.error('获取权限失败')
        }
        
    }
    
    createRole = () => {
        this.setState({
            isShow: true
        })
    }

    setAuth = () => {
        // this.getRows()
        if (Object.keys(this.state.role).length === 0) {
            message.error('请选择角色')
            this.setState({
                ShowAuth: false
            })
        } else {
            this.getRows()  
            this.setState({
                ShowAuth: true
            })
        }

    }

    addRole = () => {
        this.form.validateFields(async (err, values) => {
            if (!err) {
                let res = await axios.post('/role/add', { name: values.name ,auth_level:values.auth_level})
                if (res === 0) {
                    message.success('添加成功')
                    this.getRole()
                } else {
                    message.error('添加失败')
                }
                this.setState({
                    isShow: false
                })
            } else {
                this.setState({
                    isShow: true
                })
            }
        })
    }

    addAuth = async () => {
        const role = this.state.role
        
        const menus = this.AuthAddForm.current.getMenus()
        
        const auth_name =  memUtils.isLogin.username

        const menu=JSON.stringify(menus)
       
        let res = await axios.post('/role/updateRole',{_id:role[0]._id,menu,auth_name})
        if(res.status===0){
            message.success('权限修改成功')
            this.getRole()
            this.setState({
                ShowAuth:false
            })
        }else{
            message.error('权限修改失败')
        }
    }

    handleCancelAuth = () => {
        this.setState({
            ShowAuth: false
        })
    }

    handleCancel = () => {
        this.setState({
            isShow: false
        })
    }

    rowsChange=(selectedRowKeys, selectedRows)=>{
        this.selectedRowKey=selectedRowKeys.toString()
        this.setState({
            role: selectedRows
        })
        
    }
    render() {
        const rowSelection = {
            onChange: this.rowsChange,
            type: 'radio',
        };
        const { loading, roles, role,total, isShow, ShowAuth } = this.state
        const title = (
            <span>
                <Button type='primary' onClick={this.createRole} icon='plus'>创建角色</Button> &nbsp; &nbsp;
                <Button type='primary' onClick={this.setAuth} icon='edit'>设置权限</Button>
            </span>
        )
        return (
            <Card title={title}>
                <Table
                    rowSelection={rowSelection}
                    
                    bordered
                    rowKey="_id"
                    loading={loading}
                    columns={this.columns}
                    dataSource={roles}
                    pagination={{
                        total,
                        defaultPageSize: 2,
                        showQuickJumper: true
                    }}
                >
                </Table>
                <Modal
                    title='添加角色'
                    visible={isShow}
                    onOk={this.addRole}
                    onCancel={this.handleCancel}
                >
                    <RoleAddForm getForm={(form) => this.form = form} />
                </Modal>

                <Modal
                    title='设置权限'
                    visible={ShowAuth}
                    onOk={this.addAuth}
                    onCancel={this.handleCancelAuth}
                >
                    <AuthAddForm ref={this.AuthAddForm} role={role} />
                </Modal>
            </Card>
        )
    }
}
