import React, { Component } from 'react'
import PubSub from 'pubsub-js'
export default class Show extends Component {
    state={
        word:''
    }
    componentDidMount(){ 
        this.pubsub_token=PubSub.subscribe('pbMsg',function(topic,message){
            this.setState({
                word:message
            })
        }.bind(this))
    }
    componentWillUnmount(){
        PubSub.unsubscribe(this.pubsub_token)
    }
    render() {
        
        return (
            <div>
                <h1>{this.state.word}</h1>
            </div>
        )
    }
}
