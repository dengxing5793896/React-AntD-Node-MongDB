import React, { Component } from 'react'
import { Input, Form, Tree } from 'antd'
import meunConfig from '../../component/Layout/navLeft/meunConfig'
const { TreeNode } = Tree
const { Item } = Form
class AuthAddForm extends Component {
    constructor(props) {
        super(props)
        const { menus } = this.props.role[0]
        this.state = {
            checkedKeys: menus
        }

    }
    initTree = (meunConfig) => {
        return meunConfig.map(item => {
            if (!item.children) {
                return <TreeNode title={item.title} key={item.key}></TreeNode>
            } else {
                return <TreeNode title={item.title} key={item.key}>
                    {this.initTree(item.children)}
                </TreeNode>
            }
        })
    }

    onCheckHandel = (checkedKeys) => {
        this.setState({
            checkedKeys
        })
    }

    componentWillReceiveProps(props) {
        const menus = props.role[0].menus
        this.setState({ checkedKeys: menus })
    }

    getMenus = () => this.state.checkedKeys

    render() {
        const checkedKeys  = this.state.checkedKeys
        const { role } = this.props
        return (
            <div>
                <Item label='角色名' labelCol={{ span: 4 }} wrapperCol={{ span: 15 }}>
                    <Input readOnly value={role[0].name}></Input>
                </Item>
                <Tree checkable defaultExpandAll checkedKeys={checkedKeys} onCheck={this.onCheckHandel}>
                    <TreeNode title="系统权限" key="0-0">
                        {this.initTree(meunConfig)}
                    </TreeNode>
                </Tree>
            </div>
        )
    }
}
export default AuthAddForm