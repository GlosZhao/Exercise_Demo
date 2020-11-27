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
  token
} = require('morgan');


// 定义持久层方法
const userController = {
  // 核实权限
  checkAdmin(req, res) {
    // console.log(req.headers.authorization);
    // console.log(req.user.false);
    if (req.user.isAdmin) {
      res.status(200).json({
        isAdmin: req.user.isAdmin
      })
    } else {
      res.status(401).send();
    }
  },
  // 查找登录
  findUser(req, res) {
    let errorObj = {}
    let loginObj = {
      loginUsername: req.body.username,
      loginPassword: req.body.password
    }
    console.log(loginObj.loginUsername);
    user
      .findOne({
        username: loginObj.loginUsername
      })
      .exec() //没有回调函数默认返回一个promise对象
      .then(
        resolve => {
          if (resolve == null) {
            errorObj.errorMsg = "用户不存在"
            throw errorObj
          } else {
            let pswJudge = bcrypt.compareSync(loginObj.loginPassword, resolve.password)
            if (pswJudge) {
              // 设置token
              const token = 'Bearer ' + jwt.sign({
                  _id: resolve._id,
                  username: resolve.username,
                  isAdmin: resolve.isAdmin
                },
                secret, {
                  expiresIn: expiresIn
                }
              )
              return {
                token: token,
                isAdmin: resolve.isAdmin
              }
            } else {
              errorObj.errorMsg = "密码或用户名错误"
              throw errorObj
            }
          }
        }
      )
      .then(
        resolve => {
          res.cookie('token', resolve.token, {
            // httpOnly: true,
            maxAge: 1000 * 60 * 60 * 3
          })
          res.cookie('loginName', loginObj.loginUsername, {
            maxAge: 1000 * 60 * 60 * 3
          })
          if (resolve.isAdmin) {
            // 这个会和登录人名一起过期
            res.cookie('isAdmin', resolve.isAdmin, {
              maxAge: 1000 * 60 * 60 * 3
            })
          }
          res.json({
            successMSG: "You has logined!",
            // isAdmin: resolve.isAdmin
          });
        })
      .catch(
        reject => {
          res.json(reject);
        }
      )
  },
  // 插入用户
  newUser(req, res) {
    let userObj = {
      username: req.body.username,
      password: req.body.password,
      email: req.body.email
    }
    let errorObj = {}
    // 判断是否存在user集合
    user
      .exists({})
      .then(
        resolve => {
          if (resolve == false) { //第一个用户必须为博客博主
            userObj.isAdmin = true
          }
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
            errorObj.errorMsg = "该用户已经注册"
            throw errorObj
          }
        }
      )
      .then(
        resolve => {
          res.send("注册成功")
        }
      )
      .catch(
        reject => {
          res.json(reject)
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
        res.json.reject
      })
  },
  // deleteUser(req, res) {


  // }

}

module.exports = userController;