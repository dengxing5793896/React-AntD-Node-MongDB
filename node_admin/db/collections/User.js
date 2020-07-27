const mongoose = require('../db')
const bcrypt = require('bcrypt')
const saltRounds = 10;

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        require:true,
        index:{
            unique:true
        }
    },
    password:{
        type:String,
        require:true,

    },
    name:{
        type:String,
    },
    isUser:{
        type:String,
        default:true
    },
    auth_id:{
        type:String,
        default:null
    },
    auth_name:{
        type:String,
        default:null
    }
})
UserSchema.pre('save', function (next) {
    let that = this
    if (!that.isModified('password')) {
        return next()
    }
    bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash(that.password, salt, function(err, hash) {
            if (err) {
                return next(err)
            }
            that.password = hash
            next()
        });
    })
})

// UserSchema.pre('updateOne', function (next) {
//     let that = this
//     console.log(that.password)
//     if (!that.isModified('password')) {
//         return next()
//     }
//     bcrypt.genSalt(saltRounds, function(err, salt) {
//         bcrypt.hash(that.password, salt, function(err, hash) {
//             if (err) {
//                 return next(err)
//             }
//             that.password = hash
//             next()
//         });
//     })
// })

UserSchema.methods.comparePassword = function(willBeComPassword, callback) {
    bcrypt.compare(willBeComPassword, this.password, function(err, result) {
        if (err) {
            return callback(err)
        } else {
            callback(err, result)
        }
    });
}
module.exports = mongoose.model('user',UserSchema)