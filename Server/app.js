/*
 * @Author: your name
 * @Date: 2020-09-03 23:46:57
 * @LastEditTime: 2020-11-11 16:50:39
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Release1.0\Server\app.js
 */
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const api = require('./routes/api')
const expressJwt = require('express-jwt');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  //必须为单一域名，跨域如果指* 会失效
  origin: ['http://localhost:8080','http://localhost:8081'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}))


const {
  expiresIn,
  secret
} = require("./token/constant")
app.use(expressJwt({
    secret: secret,
    algorithms: ["HS256"]
  })
  .unless({ //指定路径不用经过token解析
    path: ['/api/user/login', '/api/user', '/api/article/AllArticle', '/api/article', "/api/tag/AllTag"]
  })
)


// 连接数据库
mongoose.set('useCreateIndex', true)
mongoose
  .connect('mongodb://localhost:27017/test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB has connected'))
  .catch(err => console.log("error,error,warning!!!"))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', api)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;