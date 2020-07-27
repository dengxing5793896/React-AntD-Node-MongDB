import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class Input extends Component {
    state={
        word:''
    }
    input= React.createRef()
    getVal=()=>{
        let input=this.input.current
        let val = input.value
        this.setState({
            word:val
        })
    }
    componentDidUpdate(){
        PubSub.publish('pbMsg',this.state.word)
    }
    render() {
        return (
            <div>
                <input type='text' ref={this.input}/>
                <input type='button' onClick={this.getVal} value='获取'/>
            </div>
        )
    }
}
