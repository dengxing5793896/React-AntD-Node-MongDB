import axios from 'axios'
import qs from 'qs'

axios.interceptors.request.use(config=>{
    const {method,data} = config
    if (method.toLowerCase()==='post' && typeof data=== 'object'){
        config.data=qs.stringify(data)
    }
    return config
})

axios.interceptors.response.use(response=>{
    return response.data
},error=>{
    return Promise.reject(error)
})
export default axios