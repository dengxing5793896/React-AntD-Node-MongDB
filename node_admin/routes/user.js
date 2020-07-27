let express = require('express')
let Router = express.Router()
let bcrypt= require('bcrypt')
const User = require('../db/collections/User')
Router.get('/get', (req, res, next) => {
    User.find({}).then(res2 => {
        res.json({
            status: 0,
            data: res2
        })
    }).catch(err => {
        res.json({
            status: 1,
            message: '用户数据查询失败'
        })
    })
})

Router.post('/update',(req,res,next)=>{
    let {username,password,auth_name,auth_id} = req.body
    const saltRounds =10
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            if (err) {
                return next(err)
            }else{
                password = hash
                User.updateOne({username},{$set:{password,auth_name,auth_id}}).then(r=>{
                    res.json({status:0})
                    next()
                }).catch(errs=>{
                    res.json({status:1})
                    return
                })
                
            } 
        });
        
    })

})

Router.post('/delete',(req,res,next)=>{
    let _id = req.body._id

    User.deleteOne({_id}).then(r=>{
        res.json({
            status:0,
            message:'删除成功'
        })
    }).catch(err=>{
        res.json({
            status:1,
            message:'删除失败'
        })
    })
})

Router.post('/checkAndAdd', (req, res, next) => {
    let {
        username,
        password,
        name,
        authority
    } = req.body
    if (!authority) {
        User.findOne({
            username
        }).then(res1 => {
            if (!res1) {
                res.json(1)
            } else {
                res.json(0)
            }
        })
    } else {
        let authArr = authority.split('%')
        console.log(authArr)
        let auth_id = authArr[0]
        let auth_name = authArr[1]
        User.create({
            username,
            password,
            name,
            auth_id,
            auth_name
        }).then(res2=>{
            res.json(0)
        }).catch(err=>{
            res.json(1)
        })
    }

})

module.exports = Router