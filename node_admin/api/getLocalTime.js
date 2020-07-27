function getLocalTime(i) {
    if (typeof i !== "number") {
        return new Date();
    }
    var d = new Date();
    var len = d.getTime();
    var offset = d.getTimezoneOffset() * 60000;
    var utcTime = len + offset;
    return new Date(utcTime + 3600000 * i);
}
module.exports = getLocalTime