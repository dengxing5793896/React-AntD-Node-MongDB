const mongoose = require('../db')
const getLocalTime = require('../../api/getLocalTime')
const timezone = 8
let date = getLocalTime(timezone).toString().split("GMT+")[0].toString()
let RoleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    auth_level:{
        type:Number,
        required: true
    },
    create_time: {
        type: String,
        default:date
    },
    auth_time:{
        type:String,
        default:null
    },
    auth_name:{
        type:String,
        default:null
    },
    menus:{
        type:Array,
        default:null
    }
})
module.exports = mongoose.model('role',RoleSchema)