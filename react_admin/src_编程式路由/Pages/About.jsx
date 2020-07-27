import React, { Component } from 'react'

export default class About extends Component {

    componentWillUnmount() {
        console.log('about组件即将卸载')
    }
    render() {
        return (
            <div>
                <h3>about组件</h3>
            </div>
        )
    }
}
