let express = require('express')
let Router = express.Router()
let getLocalTime = require('../api/getLocalTime')
const Role  = require('../db/collections/Role')
const User  = require('../db/collections/User')
Router.post('/add',(req,res,next)=>{ 
    let name = req.body.name
    let auth_level = req.body.auth_level
    let role = new Role({
        name ,auth_level
    })
    role.save().then((res2,err)=>{
        if(!err){
            res.json(0)
        }else{
            res.json(1)
        }
    })
})

Router.get('/get',(req,res,next)=>{
    let _id =req.query._id
    if(!_id){
        Role.find({}).then((res2,err)=>{
            if(!err){
                res.json({
                    status:0,
                    data:res2
                })
            }else{
                res.json({status:1})
            }
        })
    }else{
        Role.findOne({_id}).then((res2,err)=>{
            if(!err){
                res.json({
                    status:0,
                    data:res2
                })
            }else{
                res.json({status:1})
            }
        })
    }
    
})

Router.post('/updateRole',(req,res,next)=>{

    const menus =JSON.parse(req.body.menu)
    const _id = req.body._id
    const auth_name =req.body.auth_name
    let auth_time = getLocalTime()
    Role.update({_id},{auth_name,menus,auth_time}).then(res2=>{
        res.json({
            status:0
        })
    }).catch(err=>{
        res.json({
            status:1
        })
    })
 
})

Router.post('/getAuthById',(req,res,next)=>{
    let _id = req.body._id
    User.findOne({_id}).then(res1=>{
        Role.findOne({_id:res1.auth_id}).then(res2=>{
            res.json({
                status:0,
                data:JSON.stringify(res2.menus)
            })
        }).catch(err1=>{
            res.json({
                status:1
            })
        })
    }).catch(err2=>{
        res.json({status:2})
    })
})
module.exports=Router