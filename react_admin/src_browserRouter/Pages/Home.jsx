import React, { Component } from 'react'
import { NavLink, Route, Switch, Redirect } from 'react-router-dom'
import HomeNews from './HomeNews'
import HomeMes from './HomeMes'
export default class Home extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><NavLink to='/home/news'>新闻资讯</NavLink></li>
                    <li><NavLink to='/home/mes'>娱乐</NavLink></li>
                </ul>
                <Switch>
                    <Route path='/home/news' component={HomeNews} />
                    <Route path='/home/mes' component={HomeMes} />
                    <Redirect to="/home/news" />
                </Switch>

            </div>
        )
    }
}
