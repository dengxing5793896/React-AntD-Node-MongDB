let express = require('express')
let Router = express.Router()
const Category = require('../db/collections/Catrgory')
let resData = {
    status: 0,
    message: '',
    parentId: ''
}

Router.get('/getAllSub', (req, res, next) => {
    Category.find({
        parentId: {
            $ne: '0'
        }
    }).then(r => {
        res.json({
            status: 0,
            data: r
        })
    }).catch(err => {
        res.json({
            status: 1
        })
    })
})

Router.post('/getData', (req, res, next) => {
    // let Category = require('../db/collections/Catrgory')
    let resData = []
    Category.find({
        parentId: '0'
    }).then(result => {
        if (result) {
            result.map(item => {
                resData.push({
                    key: item._id.toString(),
                    name: item.category
                })
            })
            res.json(resData)
        } else {
            console.log('获取数据失败')
        }
    })
})

Router.post('/getSubCategory', (req, res, next) => {
    let id = req.body.pId
    let resData = []

    Category.find({
        parentId: id
    }, (err, res1) => {
        if (res1.length === 0) {

        }
        if (!err) {
            res1.map(item => {
                resData.push({
                    key: item._id.toString(),
                    name: item.category
                })
            })
            res.json(resData)
        } else {
            res.json('子分类查询失败！')
        }
    })


})

Router.post('/getAllSub', (req, res, next) => {
    Category.find({
        parentId: {
            $ne: '0'
        }
    }).then(r => {
        res.json(r)
    })
})

Router.post('/add', (req, res, next) => {
    let category = req.body.category
    let parentId = req.body.parentId
    let cgy = new Category({
        category,
        parentId
    })
    Category.findOne({
        category
    }).then(r => {
        if (!r) {
            cgy.save().then(result => {
                resData.status = 0
                resData.message = '添加成功！'
                res.json(resData)
            })
        } else {
            resData.status = 1
            resData.message = '分类已存在!'
            res.json(resData)
        }
    })
})

Router.post('/update', (req, res, next) => {
    let _id = req.body._id || ''
    let category = req.body.category
    Category.findOne({
        _id: _id
    }).then(r => {
        resData.parentId = r.parentId
    }).then(rrr => {
        Category.updateOne({
            _id
        }, {
            $set: {
                category
            }
        }, function (err, result) {
            if (!err) {
                resData.status = 0
                resData.message = '修改成功！'
                res.json(resData)
            } else {
                resData.status = 1
                resData.message = '修改失败！'
                res.json(resData)
            }
        })
    })

})

Router.post('/delete', (req, res, next) => {
    let _id = req.body._id
    Category.findOne({
        _id: _id
    }).then(r => {
        resData.parentId = r.parentId
    }).then(rrr => {
        Category.deleteOne({
            _id
        }, (err, res1) => {
            if (!err) {
                resData.status = 0
                resData.message = '删除成功！'
                res.json(resData)
            } else {
                resData.status = 1
                resData.message = '删除失败！'
                res.json(resData)
            }
        })
    })

})

Router.post('/checkCategory', (req, res, next) => {
    let {
        category
    } = req.body
    Category.findOne({
        category
    }).then(res2 => {
        if (!res2) {
            res.json({
                status: 0
            })
        } else {
            res.json({
                status: 1
            })
        }
    }).catch(err => {
        res.json({
            status: 2,
            message: '分类数据校验失败'
        })
    })


})

module.exports = Router