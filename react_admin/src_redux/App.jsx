import React, { Component } from 'react'
import { Button } from 'antd'
import {increment,decrement} from './redux/actions'
export default class App extends Component {
    constructor(props) {
        super(props)
        this.select = React.createRef()
    }

    increment = () => {
        const num = this.select.current.value * 1
        console.log(num)
        this.props.store.dispatch(increment(num))
    }

    decrement = () => {
        const num = this.select.current.value * 1
        this.props.store.dispatch(decrement(num))
    }

    render() {
        const count = this.props.store.getState()
        return (
            <div>
                <Button onClick={this.increment}>+</Button>
                <h1>受控数字:{count}</h1>
                <select ref={this.select}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={2}>3</option>
                </select>
                <Button onClick={this.decrement}>-</Button>
            </div>
        )
    }
}
