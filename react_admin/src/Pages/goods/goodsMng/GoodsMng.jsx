import React, { Component } from 'react'
import { Card, Table, Button, Divider, Icon, message, Switch, Popconfirm, Select, Input, Form } from 'antd'
import axios from '../../../api/axios/axios'
import localUtils from '../../../api/localStorage/localUtils'
const { Option } = Select
class GoodsMng extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            data: [],
            form: '',
            SwitchLoading: false,
            total: '',
            defaultPageSize: 0,
            current: 1
        }

        this.columns = [{
            title: '商品名称',
            dataIndex: 'goodsName',
            key: 'goodsName'
        }, {
            title: '商品描述',
            dataIndex: 'goodsDesc',
            key: 'goodsDesc'
        }, {
            title: '商品价格',
            dataIndex: 'goodsPrice',
            key: 'goodsPrice',
            render: price => (
                price = '￥' + price
            )

        }, {
            title: '商品状态',
            dataIndex: 'goodsStatus',
            key: 'goodsStatus',
            render: this.goodsStatusRender
        }, {
            title: '操作',
            key: 'operation',
            width: 270,
            render: (record) => (
                <span>
                    <a onClick={() => this.goodsUpdate(record)}>修改</a>
                    <Divider type="vertical" />
                    <Popconfirm title='确定删除吗？' onConfirm={() => this.goodsDelete(record._id)}><a>删除</a></Popconfirm>
                    <Divider type="vertical" />
                    <a onClick={() => this.goodsDetial(record._id)}>详情</a>
                </span>
            )
        }]
    }

    componentDidMount() {
        this.getGoods(1)
    }

    setGoodsStatus = (form) => {
        this.form = form
    }

    switchClickHandle = async (status) => {
        let res = await axios.post('/goods/setGoodsStatus', { _id: this.form._id, status })
        if (res.status !== 0) {
            message.error(res)
        }
    }

    goodsStatusRender = (value, form) => {
        return <Switch
            onClick={this.switchClickHandle}
            onChange={() => this.setGoodsStatus(form)}
            checkedChildren="上架"
            unCheckedChildren="下架"
            loading={this.state.SwitchLoading}
            defaultChecked={value}
        />
    }

    getGoods = async (current) => {
        this.setState({
            loading: true
        })

        let res = await axios.post('/goods/getGoods', { current })
        if (res.status === 0) {
            if (res.data.length === 0 && current >= 2) {
                current = current - 1
                this.getGoods(current)
            } else {
                this.setState({
                    data: res.data,
                    total: res.total,
                    defaultPageSize: res.defaultPageSize,
                    loading: false
                })
            }
        } else {
            message.error('获取商品数据失败')
            this.setState({
                loading: false
            })
        }

    }

    onChangeHandle = (page) => {
        this.getGoods(page.current)
        this.setState({
            current: page.current
        })
    }

    goodsUpdate = (record) => {
        this.props.history.push({pathname:'/admin/goods/goodsMng/add',record})
    }

    goodsDelete = async (_id) => {
        const { current } = this.state
        let res = await axios.post('/goods/delete', { _id })
        if (res === 0) {
            message.success('删除成功')
            this.getGoods(current)
        } else {
            message.error('删除失败')
            this.setState({
                loading: false
            })
        }

    }

    goodsDetial = () => {

    }

    getDataByCondition = () => {
        this.props.form.validateFields(async (err, values) => {
            const { select, input } = values
            let res = await axios.post('/goods/getDataByCondition', { select, input })
            if (!err) {
                if (res.status === 0) {
                    this.setState({
                        data: res.data
                    })
                }
                this.props.form.resetFields('input')
            } else {
                message.error('获取失败')
            }
        })
    }

    addGoods=()=>{
        if(localUtils.getGoodsInfo()){
            localUtils.removeGoodsInfo()
        }
        this.props.history.push('/admin/goods/goodsMng/add')
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { loading, data, total, defaultPageSize } = this.state
        // console.log(total,PageSize)
        const extraButton = (
            <Button
                type='primary'
                onClick={this.addGoods}
            >
                <Icon type='plus' />
            添加商品
            </Button>
        )
        const search = (
            <Form>
                {getFieldDecorator('select', {
                    initialValue: '请选择'
                })(
                    <Select style={{ width: 80 }} >
                        <Option key='0' value='goodsName' >按名称</Option>
                        <Option key='1' value='goodsDesc' >按描述</Option>
                        <Option key='3' value='goodsPrice'>按价格</Option>
                    </Select>
                )}
                &nbsp;
                {
                    getFieldDecorator('input', {
                        rules: [{ required: true, message: '搜索值不能为空' }]
                    })(<Input style={{ width: 200 }}></Input>)
                }
                &nbsp; &nbsp;
                <Button onClick={this.getDataByCondition} type='danger'> 搜索</Button>
            </Form>
        )
        return (
            <div>
                <Card title={search} extra={extraButton} >
                    <Table
                        bordered
                        loading={loading}
                        columns={this.columns}
                        dataSource={data}
                        rowKey={record => record._id}
                        pagination={{
                            defaultPageSize: defaultPageSize,
                            total,
                            pageSize: defaultPageSize
                        }}
                        onChange={this.onChangeHandle}
                    >
                    </Table>
                </Card>
            </div>
        )
    }
}
export default Form.create()(GoodsMng)