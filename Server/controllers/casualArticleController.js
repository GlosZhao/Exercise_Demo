const articleModel = require('../model/article');
const {
  CasualArticle
} = articleModel
const {
  mongoose,
  Schema,
  model,
  ObjectId
} = require('../model/common');
const {
  dataFormat
} = require("../common/methods.js")

const CasualArticleController = ({
  // 查询临时文章（仅有一篇）
  findArticle(req, res) {
    CasualArticle.findOne({}).exec()
      .then(
        resolve => {
          res.json(resolve)
        }
      )
      .catch(
        reject => {
          console.log(reject);
          res.json(reject)
        }
      )
  },
  //新建临时文章
  insertArticle(req, res) {
    let solveData = dataFormat(req.body)
    // console.log(solveData);
    let newArticle = CasualArticle(solveData)
    // 判断有临时集合有多少个文档（限制为一个）
    CasualArticle.find({}).exec()
      .then(resolve => {
        if (resolve.length == 0) {
          return newArticle.save()
        } else {
          newArticle._id = resolve[0]._id
          return CasualArticle.updateOne({
            _id: newArticle._id
          }, newArticle)
        }
      })
      .then(resolve => {
        if (resolve._id) {
          res.json({
            n: 1,
            ok: 1,
            nModified: 1
          })
        } else {
          res.json(resolve)
        }
      })
      .catch(reject => {
        console.log(reject);
        res.json(reject)
      })
  },

  //删除文章信息
  deleteArticle() {
    CasualArticle.find({}).exec()
      .then(resolve => {
        if (resolve.length != 0) {
          return CasualArticle.deleteOne({
            _id: resolve[0]._id
          })
        } else {
          return resolve
        }
      })
    // .then(resolve => {
    //   return resolve
    // })
    // .catch(reject => {
    //   return reject
    // })
  }
})

module.exports = CasualArticleController