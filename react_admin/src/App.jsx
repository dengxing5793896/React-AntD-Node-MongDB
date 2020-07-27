import React, { Component } from 'react'
import { Route, BrowserRouter, Switch,Redirect} from 'react-router-dom'
import Admin from './Pages/admin/Admin'
import Login from './Pages/login/Login'
// import Register from './Pages/register/Register'
export default class App extends Component {
    render() {
        
        return (
                <BrowserRouter>
                    <Switch>
                        <Route path='/admin' component={Admin} />
                        <Route path='/login' component={Login} />
                        {/* <Route path='/register' component={Register}/> */}
                        <Redirect to='/login'/>
                    </Switch>
                </BrowserRouter>
        )
    }
}
