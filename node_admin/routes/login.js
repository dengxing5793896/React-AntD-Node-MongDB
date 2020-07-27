let express = require('express')
let Router = express.Router()
const User = require('../db/collections/User')

let resData = {
    status: 0,
    message: '',
    userInfo: ''
}
Router.post('/', (req, res, next) => {

    let username = req.body.username || ''
    let password = req.body.password || ''
    User.findOne({
        username
    }).then(result => {
        if (!result) {
            resData.status = 1
            resData.message = '用户名不存在！'
            res.json(resData)
            return
        }
        result.comparePassword(password, (err, r) => {
            if (!r) {
                resData.status = 2
                resData.message = '密码错误'
                res.json(resData)
                return
            } else {
                resData.status = 0
                resData.message = '登录成功！'
                resData.userInfo = {
                    _id: result._id.toString(),
                    username: result.username,
                    isUser: result.isUser,
                    isAdmin: result.isAdmin
                }
                // req.cookies.set('userInfo',JSON.stringify(resData.userInfo),{
                //     signed:true
                // })
                res.json(resData)
                return
            }
        })
    })
})
Router.post('/verify', (req, res, next) => {
    let status = 0
    let verify = req.session.captcha || ''
    let cfmVerify = req.body.verify || ''

    if (verify == cfmVerify) {
        status = 0
        res.json(status)
    } else {
        status = 1
        res.json(status)
    }
})
Router.get("/captchapng", function (req, res) {
    let captchapng = require("captchapng")
    // 生成验证码随机数
    var mynum = parseInt(Math.random() * 9000 + 1000);
    // 写入session
    req.session.captcha = mynum;
    var p = new captchapng(80, 30, mynum);
    p.color(0, 0, 0, 0);
    p.color(80, 80, 80, 255);
    var img = p.getBase64();
    var imgbase64 = new Buffer.from(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
})
module.exports = Router