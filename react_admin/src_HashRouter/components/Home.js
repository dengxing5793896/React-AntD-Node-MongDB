import React, { Component } from 'react'
import { Button } from 'antd';
class Home extends Component {
    render() {
        return (
            <div className="App">
                 <a href='#/detail'>去detail</a>
                 <Button type='primary' onClick={() => this.props.history.replace({
                        pathname:'/detail',
                        state: {
                            id: 3
                        }
                 })}>通过函数跳转</Button>
            </div>
        )
    }
}
export default Home