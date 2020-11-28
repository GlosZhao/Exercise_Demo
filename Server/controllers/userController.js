const userModel = require('../model/user');
const {
  user
} = userModel;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {
  expiresIn,
  secret
} = require("../token/constant");

const {
  dataFormat
} = require('../common/methods');

const {
  COOKIES_VALID_TIME
} = require("../common/constant")









// 定义持久层方法
const userController = {
  // 查找登录
  findUser(req, res) {
    console.log(req.headers.origin);
    let loginObj = dataFormat(req.body)
    console.log(loginObj);
    user
      .findOne({
        username: loginObj.username
      })
      .exec() //没有回调函数默认返回一个promise对象
      .then(
        resolve => {
          if (resolve == null) {
            throw {
              errorMsg: "用户不存在",
              status: 400
            }
          } else {
            let pswJudge = bcrypt.compareSync(loginObj.password, resolve.password)
            if (pswJudge) {
              // 设置token
              const token = 'Bearer ' + jwt.sign({
                  _id: resolve._id,
                  username: resolve.username,
                },
                secret, {
                  expiresIn: expiresIn
                }
              )
              return {
                token: token,
              }
            } else {
              throw {
                errorMsg: "密码或用户名错误",
                status: 400
              }
            }
          }
        }
      )
      .then(
        resolve => {
          res.cookie('token', resolve.token, {
            // httpOnly: true,
            maxAge: COOKIES_VALID_TIME,
            domain:  ""
          })
          res.cookie('loginName', loginObj.username, {
            maxAge: COOKIES_VALID_TIME,
            // domain: req.headers.origin
          })
          res.json({
            successMsg: "You has logined!",
          });
        })
      .catch(
        reject => {
          res.status(reject.status).json({
            errorMsg: reject.errorMsg
          });
        }
      )
  },
  // 插入用户
  newUser(req, res) {
    let userObj = dataFormat(req.body)
    // 判断是否存在user集合
    user
      .exists({})
      .then(
        resolve => {
          return user.findOne({
            username: userObj.username
          }).exec()
        }
      )
      //判断用户是否已经注册
      .then(
        resolve => {
          // console.log(resolve);
          if (resolve == null) {
            let newUser = new user(userObj)
            return newUser.save()
          } else {
            throw {
              errorMsg: "该用户已经注册",
              status: 400
            }
          }
        }
      )
      .then(
        resolve => {
          res.json({
            successMsg: "注册成功,请重新登录"
          })
        }
      )
      .catch(
        reject => {
          res.status(reject.status).json({
            errorMsg: reject.errorMsg
          })
        })
  },
  // 更新密码
  updateUser(req, res) {
    let username = req.params.username;
    let requestBody = req.body;
    console.log(req.params.username);
    console.log(requestBody);
    user
      .updateOne({ // 要更新而不需要返回数据的时候使用update
        username: username
      }, {
        ...requestBody
      })
      .then(resolve => {
        console.log(resolve)
        res.json(resolve)
      })
      .catch(reject => {
        console.log(reject)
        res.json(reject)
      })
  },
  // deleteUser(req, res) {


  // }

}

module.exports = userController;