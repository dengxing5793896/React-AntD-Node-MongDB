import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
import axios from '../../../api/axios/axios'

const { Item } = Form
const { Option } = Select
class CatrgoryAddForm extends Component {
    state = {
        loading: true,
        datas:[]
    }
    
   async componentWillMount() {
        this.props.getCategoryName(this.props.form)
        this.setState({
            loading: false
        })
        // this.getCategory()
    }

    getCategory=async()=>{
        let res = await axios.post('/user/getData')
        this.setState({datas:res})
    }

    render() {
        const { getFieldDecorator } = this.props.form
        const {datas} = this.props
        return (
            <Form>
                <Item>
                    {
                        getFieldDecorator('parentId', {
                            initialValue:'0',
                            rules: [],
                        })(
                            <Select  loading={this.state.loading}>
                                <Option key={0} >顶级分类</Option>
                                {datas.map((item) => {
                                    return <Option key={item.key} value={item.key}>{item.name}</Option>
                                })}
                            </Select>
                        )
                    }
                </Item>
                <Item>
                    {
                        getFieldDecorator('CategoryName', {
                            rules: [
                                { required: true, message: '分类名不能为空！' }
                            ],
                            getValueFromEvent: (event) => {
                                return event.target.value.replace(/\s+/g, "")
                            }
                        })(
                            <Input placeholder="请输入分类名..." />
                        )
                    }
                </Item>
            </Form>
        )
    }
}

export default Form.create()(CatrgoryAddForm)