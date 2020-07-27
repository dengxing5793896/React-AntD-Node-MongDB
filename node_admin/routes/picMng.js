let multiparty = require('multiparty')
let express = require('express')
let Router = express.Router()
let path = require('path')
let fs = require('fs')

Router.post('/upload',(req, res, next) => {

    let form = new multiparty.Form()
    // 设置上传文件路径
    let dirPath = path.join(__dirname, '../public/images')
    let exists=fs.existsSync(dirPath)
    if(exists===false){
        fs.mkdirSync(dirPath,err=>{
            let status = 2
            let data = {
                mes: '创建目录失败！'
            }
            res.json({
                status,
                data
            })
        })
        form.uploadDir = './public/images'
    }else{
        form.uploadDir = './public/images'
    }
    
    // 解析上传文件
    form.parse(req, function (err, fields, files) {
        let name = files.image[0].originalFilename
        let url = files.image[0].path
        let uploadName = url.substr(url.lastIndexOf('\\') + 1)
        url = "http://localhost:8080/public/images/" + uploadName

        if (!err) {
            let status = 0
            let data = {
                name,
                url,
            }
            res.json({
                status,
                data
            })
        } else {
            let status = 1
            let data = {
                mes: '上传文件失败！'
            }
            res.json({
                status,
                data
            })
        }

    });
})

Router.post('/delete', (req, res2, next) => {
    const name = req.body.name
    const url = "public/images"
    // console.log(name)
    // 删除后台文件
    fs.readdirSync(url).map(file => {
        if (file === name) {
            // console.log(file)
            fs.unlink(`${url}/${name}`, err => {
                if (err) {
                    res2.json({
                        status: 1
                    })
                } else {
                    res2.json({
                        status: 0
                    })
                }
            })
        }
    })
})

module.exports = Router