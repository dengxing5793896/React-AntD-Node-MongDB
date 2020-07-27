
function getDate(now){
    function fix(originTime){
        return originTime < 10 ? '0' + originTime : originTime
    }    
    let date = new Date(now)
    let resDate = date.getFullYear() + '-' +fix((date.getMonth()+1))+'-'+fix(date.getDate())
    +' '+fix(date.getHours())+':'+fix(date.getMinutes())+':'+fix(date.getSeconds())

    return resDate
}
export default getDate