import React, { Component } from 'react'

export default class Show extends Component {
    render() {
        let {data} = this.props
        // console.log(data.resData)
        if(data.resData!=null){
            return (
                <div>
                    <div id='show'>
                        <ul>
                       { 
                            data.resData.map(function(item){
                            return <li key={item.uniquekey}><a href={item.url} target='_blank'>{item.title}</a></li>
                            }) 
                       } 
                        </ul>
                    </div>
                </div>
            )
        }else{
            return <div><h1>暂无数据...</h1></div>
        }
       
    }
}
