import React, { Component } from 'react'
import {Switch,Route,Redirect } from 'react-router-dom'
import GoodsMng from './GoodsMng'
import GoodsAdd from './GoodsUpdate'
export default class goodrRoute extends Component {
    render() {
        return (
            <Switch>
                <Route exact path='/admin/goods/goodsMng' component={GoodsMng}></Route>
                <Route path='/admin/goods/goodsMng/add' component={GoodsAdd}></Route>
                <Redirect to="/admin/goods/goodsMng"/>
            </Switch>
        )
    }
}
