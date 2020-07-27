import React, { Component } from 'react'
import { Link } from 'react-router-dom'
export default class Linker extends Component {
    render() {
        const { linker } = this.props
        let linkStr = ''
        let arr = []
        arr = linker.split('/')
        arr.map(item => {
            switch (item) {
                case 'admin':
                    item = '首页'
                    break;
                case 'goods':
                    item = '商品'
                    break;
                case 'goodsMng':
                    item = '商品管理'
                    break;
                case 'category':
                    item = '分类管理'
                    break;
                case 'home':
                    item = '主页'
                    break;
            }
            linkStr += item + '>>'
        })
        // console.log(linker)
        return (
            <div>
               {linkStr}
            </div>
        )
    }
}
