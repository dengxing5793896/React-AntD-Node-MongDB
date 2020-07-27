import {INCREMENT,DECREMENT} from './actions-type'
import {combineReducers} from 'redux'
 function count(state = 0, action) {
    switch (action.type) {
        case INCREMENT:
            return state + action.data
        case DECREMENT:
            return state - action.data
        default:
            return state
    }
}

const userData ={name:'admin',age:20,sex:'男'}

function user (state=userData,action){
    switch (action.type) {
        default:
            return state
    }
}

export default combineReducers ({
    count,user
})