function getRichPicName(str){
    var urlArr =str.split('"')
    var resArr= []
    urlArr.forEach(item => {
        if(/http:\/\//.test(item)){
            resArr.push(item.substr(item.lastIndexOf('/')+1)) 
        }
    });
    return resArr
}
module.exports =getRichPicName