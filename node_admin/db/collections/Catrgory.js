const mongoose  = require('../db')
const CategorySchma = new mongoose.Schema({
    category:{
        type:String,
        require:true
    },
    parentId:{
        type:String,
        default:'0'
    }
})

module.exports = mongoose.model('category',CategorySchma)