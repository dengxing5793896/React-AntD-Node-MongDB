import React, { Component } from 'react'
export default class Item extends Component {
    componentDidMount(){
        let {getType} = this.props
        let li = document.getElementsByClassName('type')
       for(let i = 0 ;i<li.length;i++){ 
           li[i].addEventListener('mouseover',function(){
               let type = this.getAttribute('value')
               getType(type)
           })
       }
    }
    render() {
        return (
            <div>
                <div id='item'>
                    <ul>
                    <li className='type' value='toutiao'>头条</li>
                    <li className='type' value='keji'>科技</li>
                    <li className='type' value='shehui'>社会</li>
                    <li className='type' value='guonei'>国内</li>
                    <li className='type' value='guoji'>国际</li>
                    <li className='type' value='junshi'>军事</li>
                    <li className='type' value='yule'>娱乐</li>
                    </ul>
                </div>
            </div>
        )
    }
}
