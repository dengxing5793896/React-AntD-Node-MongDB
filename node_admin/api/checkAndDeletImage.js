function checkAndDeletImahe(arr, res) {
    var fs = require('fs')
    var path = require('path')
    let url ='public/images'
    arr.forEach(item => {
        var dirPath = path.join(__dirname, '../public/images/' + item)
        var exists = fs.existsSync(dirPath)
        if (exists) {
            fs.unlink(`${url}/${item}`, err => {
                if (err) {
                    res.json(1)
                }
            })
        }
    })
}
module.exports = checkAndDeletImahe