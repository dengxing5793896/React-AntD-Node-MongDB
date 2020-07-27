import React, { Component } from 'react'
import { Card, Form, Input, Button, Select, message } from 'antd'
import RichEditor from './richEditor'
import axios from '../../../api/axios/axios'
import PicUpload from './FilesUpload'
import lodash from 'lodash'
import localUtils from '../../../api/localStorage/localUtils'
import memUtils from '../../../api/localStorage/memUtils'
const { debounce } = lodash
const { Item } = Form
const { Option } = Select
class GoodsUpdate extends Component {

    constructor(props) {
        super(props)
        this.state = {
            subCategory: [],
            loading: false,
            record:{}
        }
    
        this.richContent = React.createRef()
        this.getImg = React.createRef()
    }

    componentWillMount() {
        if(this.props.history.location.record){
           localUtils.setLGoodsInfo(this.props.history.location.record)
            this.setState({ record: this.props.history.location.record })
        }else{
            this.setState({ record: localUtils.getGoodsInfo() })
        }        
    }
    
    

    componentDidMount() {
        console.log(this.props.history.location.record)
       
        this.getCategory()
    }

    getCategory = async () => {
        let res = await axios.post('/category/getAllSub')
        this.setState({
            subCategory: res
        })
    }

    onChange = async (val) => {
        // console.log(typeof val)
        let sub = await axios.post('/category/getSubCategory', { pId: val.toString() })
        console.log(sub)
    }

    checkGoodsName = debounce((rule, value, callback) => {

        axios.post('/goods/checkGoodsName', { goodsName: value })
            .then(res => {
                if (res === 1) {
                    callback('该商品已存在')
                } else {
                    callback()
                }
            })
    }, 700)

    getRichEditorContent = () => this.richContent.current.getDetail()

    getImgData = () => this.getImg.current.getImgs()

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({
            loading: true
        })
        let richText = this.getRichEditorContent()
        let images = this.getImgData().toString()
        this.props.form.validateFields(async (err, values) => {
            // console.log(values)
            // console.log(this.state.record)
            const { goodsName, goodsDesc, goodsPrice, goodsCategory } = values
            if (!err) {
                let res =''
                let arr = Object.keys(this.state.record)
                const {_id} =this.state.record
                console.log(arr.length)
                if(arr.length===0){
                    res= await axios.post('/goods/saveGoods', { goodsName, goodsDesc, goodsPrice, goodsCategory, images, richText })
                }else{
                    res= await axios.post('/goods/saveGoods', { _id,goodsName, goodsDesc, goodsPrice, goodsCategory, images, richText })
                }
               
                if (res.status === 0) {
                    if(!this.state.record){
                        message.success('添加成功！')
                    }else{
                        message.success('修改成功')
                    }
                   
                    this.props.history.replace('/admin/goods/goodsMng')
                    this.setState({
                        loading: false
                    })
                } else {
                    if(!this.state.record){
                        message.success('添加失败！')
                    }else{
                        message.success('修改失败')
                    }
                    this.setState({
                        loading: false
                    })
                }
            } else {
                message.error('提交失败')
                this.setState({
                    loading: false
                })
            }
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const { subCategory, record } = this.state
        let arr = Object.keys(record)
        // return ''
        return arr.length===0? (
            <Card title='商品添加'>
                <Form className='form' onSubmit={this.handleSubmit} labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('goodsName', {
                                rules: [
                                    { required: true, message: '商品名不能为空！' },
                                    { validator: this.checkGoodsName }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                },
                            })(
                                <Input
                                    placeholder="请输入商品名称..."
                                />
                            )
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('goodsDesc', {
                                rules: [
                                    { required: true, message: '商品描述不能为空！' }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }
                            })(
                                <Input

                                    placeholder="请填写商品描述..."
                                />
                            )
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('goodsPrice', {
                                rules: [
                                    { required: true, message: '商品价格不能为空！' }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }
                            })(
                                <Input
                                    style={{ width: 190 }}
                                    type='number'
                                    addonAfter='元'
                                    placeholder="请输入商品价格..."
                                />
                            )
                        }
                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('goodsCategory', {
                                // initialValue:'请选择',
                                rules: [
                                    { required: true, message: '商品分类不能为空！' }
                                ]
                            })(
                                <Select>
                                    {/* <Option disabled key='0'>请选择</Option> */}
                                    {
                                        subCategory.map(item => {
                                            return <Option key={item._id.toString} value={item.category}>{item.category}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item label='图片上传'>
                        <PicUpload ref={this.getImg}></PicUpload>
                    </Item>
                    <Item label='商品详情'>
                        <RichEditor ref={this.richContent} />
                    </Item>
                    <Item labelCol={{ span: 2 }} wrapperCol={{ span: 12 }} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">提交</Button>&nbsp;&nbsp;&nbsp;
                        <Button type="danger" onClick={() => { this.props.history.push('/admin/goods/goodsMng') }} className="login-form-button">返回</Button>
                    </Item>
                </Form>
            </Card>
        ) : <Card title='商品添加'>
                <Form className='form' onSubmit={this.handleSubmit} labelCol={{ span: 2 }} wrapperCol={{ span: 6 }}>
                    <Item label='商品名称'>
                        {
                            getFieldDecorator('goodsName', {
                                initialValue:record.goodsName,
                                rules: [
                                    { required: true, message: '商品名不能为空！' },
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                },
                            })(
                                <Input
                                    placeholder="请输入商品名称..."
                                />
                            )
                        }
                    </Item>
                    <Item label='商品描述'>
                        {
                            getFieldDecorator('goodsDesc', {
                                initialValue:record.goodsDesc,
                                rules: [
                                    { required: true, message: '商品描述不能为空！' }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }
                            })(
                                <Input

                                    placeholder="请填写商品描述..."
                                />
                            )
                        }
                    </Item>
                    <Item label='商品价格'>
                        {
                            getFieldDecorator('goodsPrice', {
                                initialValue:record.goodsPrice,
                                rules: [
                                    { required: true, message: '商品价格不能为空！' }
                                ],
                                getValueFromEvent: (event) => {
                                    return event.target.value.replace(/\s+/g, "")
                                }
                            })(
                                <Input
                                    style={{ width: 190 }}
                                    type='number'
                                    addonAfter='元'
                                    placeholder="请输入商品价格..."
                                />
                            )
                        }
                    </Item>
                    <Item label='商品分类'>
                        {
                            getFieldDecorator('goodsCategory', {
                                initialValue:record.goodsCategory,
                                rules: [
                                    { required: true, message: '商品分类不能为空！' }
                                ]
                            })(
                                <Select>
                                    {/* <Option disabled key='0'>请选择</Option> */}
                                    {
                                        subCategory.map(item => {
                                            return <Option key={item._id.toString} value={item.category}>{item.category}</Option>
                                        })
                                    }
                                </Select>
                            )
                        }
                    </Item>
                    <Item label='图片上传'>
                        <PicUpload imgs={record.images} ref={this.getImg}></PicUpload>
                    </Item>
                    <Item label='商品详情'>
                        <RichEditor richText={record.richText} ref={this.richContent} />
                    </Item>
                    <Item labelCol={{ span: 2 }} wrapperCol={{ span: 12 }} style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button type="primary" loading={this.state.loading} htmlType="submit" className="login-form-button">提交</Button>&nbsp;&nbsp;&nbsp;
                <Button type="danger" onClick={() => { this.props.history.push('/admin/goods/goodsMng') }} className="login-form-button">返回</Button>
                    </Item>
                </Form>
            </Card>
    }
}
export default Form.create()(GoodsUpdate)