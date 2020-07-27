let express = require('express');

let path = require('path');

let app = express();

// let Cookies =require('cookies')

let bodyParser = require('body-parser')

let cookieParser = require('cookie-parser')

let session = require('express-session')
app.use('/public', express.static(__dirname + '/public'))

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(cookieParser('sessionUsed'));

// let keys =['keyboard cat']

// app.use((req,res,next)=>{

//   req.cookies = new Cookies(req,res,{keys})

//   // if(req.cookies.get())
// })



// 配置session信息
app.use(session({

    secret: "sessionUsed", //与cookieParser 的值要一样
    cookie: {
        maxAge: 1000 * 60 * 10 // 十分钟有效期
    }, //作用时间 单位毫秒 用来设置有效期
    rolling: true, //只要操作有响应 就会刷新这个时间 不然会总断
    resave: false, //添加 resave 选项
    saveUninitialized: true //添加 saveUninitialized 选项
}))

app.use('/login',require('./routes/login'))

app.use('/register',require('./routes/register'))

app.use('/category',(require('./routes/category')))

app.use('/goods',require('./routes/goods'))

app.use('/manage/img',require('./routes/picMng'))

app.use('/role',require('./routes/role'))

app.use('/user',require('./routes/user'))
// app.use('/getTabelData',require('./routes/getTableData'))
app.listen(8080)

console.log('node正在监听8080端口')
module.exports = app;
