import React, { Component } from 'react'
import { Link, Route, NavLink, Switch, Redirect } from 'react-router-dom'
import About from './Pages/About'
import Home from './Pages/Home'
import {Button} from 'antd'
export default class App extends Component {
    render() {
        return (
            <div>
                <h1>react路由实例</h1>
                {/* <Link to="/about" className="app">about</Link> |
                <Link to="/home">home</Link> */}

                <NavLink to="/about" className="main" activeClassName="app">about</NavLink> | 
                <NavLink to="/home" className="main" activeClassName="app">home</NavLink>
                <Button type='primary'>你好</Button>
                <Switch>
                    <Route path='/about' component={About}/>
                    <Route path='/home' component={Home}/>
                    <Redirect to='/about'/>
                </Switch>
            </div>
        )
    }
}
