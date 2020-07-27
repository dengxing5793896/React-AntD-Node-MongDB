import React, { Component } from 'react'
import { Card, Button, Modal, message } from 'antd'
import Table from '../../../component/Table/Table'
import AddCategoryForm from './CatrgoryAddForm'
import axios from '../../../api/axios/axios'
import PubSub from 'pubsub-js'
export default class goodsCategory extends Component {
    state = {
        confirmLoading: false,
        visible: false,
        data: [],
        tableLoding: false,
        category: true
    };

    showModal = () => {
        this.setState({
            visible: true,
            category: false
        })
    }
    
    pubsub=()=>{
        let data = this.state.data
        let getCategory = this.getTableData
        PubSub.publish('data', { data, getCategory })
    }

    getTableData = async () => {
        let res = null
        res = await axios.post('/category/getData')
        this.setState({
            data: res,
            category:true
        },()=>{
           this.pubsub()
        })
    }

    getSubCategory = async (key) => {
        this.setState({
            loading: true
        })
        let res = await axios.post('/category/getSubCategory', { pId: key })
        this.setState({
            data: res,
        },()=>{
            this.pubsub()
        })
      
    }

    componentWillMount() {
        this.getTableData()
    }

    handleOk = e => {
        // console.log(this.state.category)
        e.preventDefault()
        const { parentId } = this.form.getFieldsValue()
        this.setState({
            confirmLoading: true
        })
        const { validateFields, resetFields } = this.form
        validateFields(async (err, values) => {
            if (!err) {
                let resData = await axios.post('/category/add', { category: values.CategoryName, parentId: values.parentId })
                if (resData.status === 0) {

                    if (parentId === '0') {
                        // console.log('777')
                        this.getTableData()
                        this.setState({
                            category:true
                        })
                    } else {
                        // console.log('888')
                        this.getSubCategory(parentId)
                        this.setState({
                            category:false
                        })
                    }

                    await this.setState({
                        visible: false,
                        confirmLoading: false
                    })
                    resetFields()
                    message.success(resData.message)
                } else {
                    message.error(resData.message)
                    this.setState({
                        confirmLoading: false
                    })
                }
            } else {
                this.setState({
                    confirmLoading: false
                })
            }

        })
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        });
        // this.form.resetFields()
    }

    render() {
        // console.log(this.state.data)
        const { confirmLoading } = this.state
        return (
            <Card extra={<Button type='primary' onClick={this.showModal}>添加分类/子分类</Button>} >
                <Table data={this.state.data} category={this.state.category}/>
                <Modal
                    confirmLoading={confirmLoading}
                    title="添加分类"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <AddCategoryForm getCategoryName={(form) => this.form = form} datas={this.state.data} />
                </Modal>
            </Card>
        )
    }
}
