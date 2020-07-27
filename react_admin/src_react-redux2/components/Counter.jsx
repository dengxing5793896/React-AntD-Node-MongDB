import React, { Component } from 'react'
import { Button } from 'antd'
export default class Counter extends Component {
    select = React.createRef()
    increment = () => {
        const num = this.select.current.value * 1
        this.props.increment(num)
    }

    decrement = () => {
        const num = this.select.current.value * 1
        this.props.decrement(num)
    }

    incrementAsync=()=>{
        const num = this.select.current.value * 1
        this.props.incrementAsync(num)
    }

    render() {
        const {count} = this.props
        return (
            <div>
                <Button onClick={this.increment}>+</Button>
                <select ref={this.select}>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                </select>
                <h1>count:{count}</h1>
                <Button onClick={this.decrement}>-</Button>
                <Button onClick={this.incrementAsync}>异步</Button>
            </div>
        )
    }
}
