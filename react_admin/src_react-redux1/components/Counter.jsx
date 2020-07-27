import React, { Component } from 'react'
import { Button } from 'antd'
import PropTypes from 'prop-types'


/**
 * UI组件 
 * 主要用于显示和与用户进行交互  
 * 这个组件中不包含任何redux代码
 * 
 */
export default class Counter extends Component {

    static propTypes = {
        count: PropTypes.number.isRequired,
        increment: PropTypes.func.isRequired,
        decrement: PropTypes.func.isRequired,
        incrementAsync: PropTypes.func.isRequired
    }

    constructor(props) {
        super(props)
        this.ref = React.createRef()
    }

    increment = () => {
        // 获取select的值  
        const num = this.ref.current.value * 1

        this.props.increment(num)
    }

    decrement = () => {
        // 获取seelct的值  
        const num = this.ref.current.value * 1
        this.props.decrement(num)
    }

    async = () => {

        // clearTimeout(this.timer)
        const num = this.ref.current.value * 1
   
        this.props.incrementAsync(num)
    }

  

    render() {
     
        const {count,user} = this.props

        // const user = this.props.user

      
        return (
            <div>
                <div>计数: {count}</div>
                <select ref={this.ref}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                </select>
                <Button onClick={this.increment}>+</Button>
                <Button onClick={this.decrement}>-</Button>
                <Button onClick={this.async}>异步</Button>

            </div>
        )
    }
}

