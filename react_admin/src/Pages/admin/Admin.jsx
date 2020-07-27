import { Layout } from 'antd'
import React, { Component } from 'react'
import Navleft from '../../component/Layout/navLeft/NavLeft'
import Header from '../../component/Layout/header/Header'
import {Switch,Route} from 'react-router-dom'
import Home from  '../home/Home'
import GoodsMng from '../goods/goodsMng/goodrRoute'
import GoodsCategory from '../goods/goodsCategory/goodsCategory'
import Role from '../role/Role'
import UserMng from '../user/userMng'
import UserUpdate from '../user/userUpdate'
import './admin.less'
const { Footer, Content, Sider } = Layout
export default class admin extends Component {

    render() {
        return (
            <Layout>
                <Sider>
                    <Navleft/>
                </Sider>
                <Layout>
                    <Header/>
                    <Content>
                        <Switch>
                            <Route path="/admin/home" component={Home}></Route>
                            <Route path="/admin/goods/goodsMng" component={GoodsMng}></Route>
                            <Route path="/admin/goods/category" component={GoodsCategory}></Route>
                            <Route path='/admin/role' component={Role}></Route>
                            <Route exact path='/admin/userMng' component={UserMng}></Route>
                            <Route path='/admin/userMng/update' component={UserUpdate}></Route>
                            
                        </Switch>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>
            </Layout>
        )
    }
}
