import React, { Component } from 'react'
import { Form, Input, Select } from 'antd'
const { Item } = Form
const { Option } = Select
class RoleAddForm extends Component {
    componentWillMount() {
        this.props.getForm(this.props.form)
    }
    render() {
        const { getFieldDecorator } = this.props.form
        return (
            <Form>
                <Item label='角色名' labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
                    {
                        getFieldDecorator('name', {
                            rules: [
                                {
                                    required: true,
                                    message: '角色名称不能为空'
                                }
                            ]
                        })(
                            <Input></Input>
                        )
                    }
                </Item>
                <Item label='权限等级' labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
                    {
                        getFieldDecorator('auth_level', {
                            rules: [
                                {
                                    required: true,
                                    message: '请选择权限等级'
                                }
                            ]
                        })(
                            <Select>
                                <Option key='0' value={1}>1</Option>
                                <Option key='1' value={2}>2</Option>
                                <Option key='2' value={3}>3</Option>
                                <Option key='3' value={4}>4</Option>
                                <Option key='4' value={5}>5</Option>
                            </Select>
                        )
                    }
                </Item>
            </Form>
        )
    }
}
export default Form.create()(RoleAddForm)