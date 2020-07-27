let Link = require('./config')
let mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

mongoose.connect(`${Link.DB_LINK}:${Link.DB_PORT}/${Link.DB_BASENAME}`,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

mongoose.connection.on('connected',()=>{
    console.log('mongoose正在监听27017端口...')
})

mongoose.connection.on('error',err=>{
    console.log('mongoose连接异常:'+err)
})

mongoose.connection.on('disconnected',()=>{
    console.log('mongoose连接已断开...')
})

module.exports = mongoose