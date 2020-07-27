import React, { Component } from 'react'

export default class HomeMesDetail extends Component {

    state = {
        mesDetails: [
            {_id: 1, title: "青春有你十强诞生", content: "乃万含泪出十强"},
            {_id: 2, title: "特朗普下台", content: "F**K Y*U"},
            {_id: 3, title: "中国表态", content: "鉴于美国国内一片混乱,中国持有谨慎态度"},
        ]
    }
    render() {
        let { id } = this.props.match.params 
        let { mesDetails } = this.state
        console.log(typeof id)
        let data = mesDetails.find(item => item._id === parseInt(id))
        // console.log(data)
        return (
            <div>
                <ul>
                    <li>id: {id}</li>
                    <li>title: {data.title}</li>
                    <li>content: {data.content}</li>
                </ul>
            </div>
        )
    }
}
