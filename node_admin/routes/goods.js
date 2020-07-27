let express = require('express')
let Router = express.Router()
let getRichPicName = require('../api/getRichPicName')
let getImageName = require('../api/getImageName')
let checkAndDeleteImage = require('../api/checkAndDeletImage')
const Good = require('../db/collections/Good')
let resData = {
    status: 0,
    message: ''
}
Router.post('/saveGoods', (req, res, next) => {
    const {
        _id,
        goodsName,
        goodsDesc,
        goodsPrice,
        goodsCategory,
        images,
        richText
    } = req.body
    let good = new Good({
        goodsName,
        goodsDesc,
        goodsPrice,
        goodsCategory,
        images,
        richText
    })
    if (!_id) {
        good.save().then((res2, err) => {
            if (!err) {
                resData.status = 0
            } else {
                resData.status = 1
            }
            res.json(resData)
        })
    } else {
        Good.updateOne({
            _id
        }, {
            $set: {
                goodsName,
                goodsDesc,
                goodsPrice,
                goodsCategory,
                images,
                richText
            }
        }).then((res3,err)=>{
            if (!err) {
                resData.status = 0
            } else {
                resData.status = 1
            }
            res.json(resData)
        })
    }


})

Router.post('/checkGoodsName', (req, res, next) => {
    let goodsName = req.body.goodsName
    Good.findOne({
        goodsName
    }).then((res2, err) => {
        if (!err) {
            if (res2 == null) {
                let status = 0
                res.json(status)
            } else {
                let status = 1
                res.json(status)
            }
        }
    })
})

Router.post('/getGoods', (req, res, next) => {

    let current = req.body.current
    let defaultPageSize = 2
    // console.log(current)
    let skip = (current - 1) * defaultPageSize

    Good.count({}, (err1, count) => {
        if (!err1) {
            Good.find({})
                .skip(skip)
                .limit(defaultPageSize)
                .sort({
                    _id: -1
                })
                .exec()
                .then((res2, err2) => {
                    if (!err2) {
                        res.json({
                            status: 0,
                            total: count,
                            data: res2,
                            defaultPageSize
                        })
                    } else {
                        res.json({
                            status: 2
                        })
                    }
                })
        } else {
            res.json({
                status: 2
            })
        }

    })
})

Router.post('/getDataByCondition', (req, res, body) => {
    let {
        select,
        input
    } = req.body
    let query = new RegExp(input)
    Good.where(select, query).then(r => {
        res.json({
            status: 0,
            data: r
        })

    }).catch(err => {
        res.json({
            status: 1,
            message: '查询失败'
        })
    })
})

Router.post('/setGoodsStatus', (req, res, next) => {
    let status = req.body.status
    let _id = req.body._id
    Good.updateOne({
        _id
    }, {
        $set: {
            goodsStatus: status
        }
    }).then((res2, err) => {
        if (!err) {
            resData.status = 0
            res.json(resData)
        } else {
            resData.status = 1
            resData.message = '操作失败'
            res.json(resData)
        }
    })



})

Router.post('/delete', (req, res, next) => {
    let _id = req.body._id
    Good.findOne({
        _id
    }).then((res1, err) => {
        let richPicNameArr = getRichPicName(res1.richText)
        let imagesNameArr = getImageName(res1.images)
        checkAndDeleteImage(richPicNameArr)
        checkAndDeleteImage(imagesNameArr)
    }).then((res2, err2) => {
        if (!err2) {
            Good.deleteOne({
                _id
            }).then((res3, err3) => {
                if (!err3) {
                    res.json(0)
                } else {
                    res.json(2)
                }
            })
        } else {
            res.json(3)
        }
    })
})

module.exports = Router