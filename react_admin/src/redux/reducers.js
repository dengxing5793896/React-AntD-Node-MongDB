import {header_title} from './actions-type'
export default function changeTitle(state='首页',action){
    switch (action.type) {
        case header_title:
            
            return action.data;
    
        default:
            return state
    }
}