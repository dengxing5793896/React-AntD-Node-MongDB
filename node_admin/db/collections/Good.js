const mongoose = require('../db')
const CategorySchma = new mongoose.Schema({
    goodsName:{
        type:String,
        require:true
    }, 
    goodsDesc:{
        type:String,
        required:true
    },
     goodsPrice:{
        type:String,
        required:true
     }, 
     goodsStatus:{
      type:Boolean,
      default:false
     },
     goodsCategory:{
        type:String,
        required:true
     },
     images:{
        type:String
     },
     richText:{
        type:String,
        required:true
     }
})

module.exports = mongoose.model('good',CategorySchma)