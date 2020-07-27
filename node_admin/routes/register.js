let express = require('express')
let Router = express.Router()
const User = require('../db/collections/User')
Router.post('/', (req, res, next) => {
    let resData = {
        status: 0,
        message: ''
    }
    let username = req.body.username||''
    let password = req.body.password||''
 
    let user = new User({
        username,   
        password
    });
    // console.log(username)
    User.findOne({
        username
    }).then(resDatas => {
        if (resDatas == null) {
            user.save().then(r => {
                resData.status = 0
                resData.message = '注册成功!将为您跳转到登录页面...'
                res.json(resData)
            })
        } else {
            resData.status = 1
            resData.message = '用户名已存在！'
            res.json(resData)
        }
    })
})
module.exports = Router