import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'
import HomeMesDetail from './HomeMesDetail'

export default class HomeMes extends Component {

    state = {

    }
    componentDidMount() {

        this.timer = setTimeout(() => {
            this.setState({
                messages: [
                    { _id: 1, content: '青春有你2很好看' },
                    { _id: 2, content: '美国陷入一片混乱' },
                    { _id: 3, content: '中国保持谨慎态度' }
                ]
            })
        }, 300)
    }

    componentWillUnmount() {
        clearTimeout(this.timer)
    }

    pushShow = (path) => {
        this.props.history.push(path)
    }

    replaceShow = (path) => {
        this.props.history.replace(path)
    }

    back = () => {
        this.props.history.goBack()
   }

    render() {
        let { messages } = this.state
        if (!messages) {
            return <h2>Loading...</h2>
        } else {
            return (
                <div>
                    <ul>
                        {
                            messages.map(item => <li key={item._id}>
                                <Link to={`/home/mes/detail/${item._id}`}>{item.content}</Link>
                                <button onClick={() =>{this.pushShow(`/home/mes/detail/${item._id}`)}}>push</button>
                                <button onClick={() =>{this.replaceShow(`/home/mes/detail/${item._id}`)}}>replace</button>
                                <button>replace</button>
                            </li>)
                        }
                    </ul>
                    <button onClick={this.back}>返回</button>
                    <hr/>
                    {/* 路由传参 */}
                    <Route path="/home/mes/detail/:id" component={HomeMesDetail}/>
                </div>
            )
        }

    }
}
