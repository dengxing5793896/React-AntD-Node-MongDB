import React from 'react'
import {HashRouter,Route,Switch} from 'react-router-dom'
import Home from '../components/Home'
import Detail from '../components/Detail'
import { createHashHistory } from 'history';

const hashHistory = createHashHistory();
const BasicRoute =()=>(
    <HashRouter history={hashHistory}>
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/detail' component={Detail}/>
        </Switch>
    </HashRouter>
)
export default BasicRoute