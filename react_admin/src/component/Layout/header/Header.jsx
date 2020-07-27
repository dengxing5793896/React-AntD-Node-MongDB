import React, { Component } from 'react'
import { Button, Modal } from 'antd'
import { withRouter } from 'react-router-dom'
import './header.less'
import localUtils from '../../../api/localStorage/localUtils'
import memUtils from '../../../api/localStorage/memUtils'
import getTime from '../../../api/time/time'
import { connect } from 'react-redux'

const { confirm } = Modal
class Header extends Component {
    state = {
        time: getTime(Date.now())
    }
    componentDidMount() {
        this.timer = setInterval(() => {
            this.setState({
                time: getTime(Date.now())
            })
        }, 1000);
    }
    componentWillUnmount() {
        clearInterval(this.timer)
    }
    logout = () => {
        confirm({
            title: '确认退出吗？',
            onOk: () => {
                localUtils.removeLoginInfo()
                memUtils.isLogin = {}
                this.props.history.push('/login')
            },
            oncancel() { }
        })
    }
    render() {
        const { time } = this.state
        const { title } = this.props
        return (
            <div className='header'>
                <div className='header-top'>
                    <span style={{ fontWeight: 'bold' }}>欢迎您，{memUtils.isLogin.username}</span>
                    <Button onClick={this.logout}>退出</Button>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>{time}</div>
                </div>
            </div>
        )
    }
}
export default connect(
    state => ({ title: state }), {}
)(withRouter(Header))