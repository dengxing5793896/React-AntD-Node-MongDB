import React from 'react'
import { withRouter, Link } from 'react-router-dom'
import { Menu, Icon, message } from 'antd';
import logo from '../../../assets/images/logo.png'
import './navLeft.less'
import menuList from './meunConfig'
import memUtils from '../../../api/localStorage/memUtils'
import axios from '../../../api/axios/axios'
import { connect } from 'react-redux'
import { setTitle } from '../../../redux/actions'
const { SubMenu } = Menu;

class NavLeft extends React.Component {
  state = {
    menus: [],
    myMenu: []
  }


  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  componentWillMount() {
    this.getUserAuth()
    this.setReflashTitle(menuList)

  }


  setReflashTitle = (menuList) => {
    menuList.map(item => {
      if (!item.children) {
        if (item.key === this.props.location.pathname) {
          this.props.setTitle(item.title)
        }
      } else {
        this.setReflashTitle(item.children)
      }
    }
    )
  }

  getUserAuth = () => {
    let _id = memUtils.isLogin._id
    axios.post('/role/getAuthById', { _id }).then(res => {
      if (res.status === 0) {
        this.setState({
          menus: JSON.parse(res.data),
        }, () => {
          this.setState({
            myMenu: this.showMenu(menuList)
          })
        })
      } else {
        message.error('获取用户权限失败')
      }
    })
  }

  showMenu = (menuList) => {
    const { menus } = this.state
    return menus.map(i => {
      return menuList.map(item => {
        if (i === item.key) {
          if (!item.children) {
            return (
              <Menu.Item key={item.key}>
                <Link to={item.key} onClick={() => { this.props.setTitle(item.title) }}>
                  <Icon type={item.icon} />
                  <span>{item.title}</span>
                </Link>
              </Menu.Item>
            )
          } else {
            return (
              <SubMenu
                key={item.key}
                title={
                  <span>
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </span>
                }
              >
                {this.showMenu(item.children)}
              </SubMenu>
            )
          }
        }

      })
    })
  }


  render() {
    const pathKey = this.props.location.pathname
    return (
      <div className='navLeft'>
        <Link className='link' to='/admin/home'>
          <img src={logo} alt="" />
          <span>鑫商品后台</span>
        </Link>
        <Menu
          defaultSelectedKeys={[pathKey]}
          defaultOpenKeys={['/admin/good']}
          mode="inline"
          theme="dark"
        >
          {this.state.myMenu}
        </Menu>
      </div>);
  }
}
export default connect(
  state => ({}), {
  setTitle
}
)(withRouter(NavLeft))