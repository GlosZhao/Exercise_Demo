const articleModel = require('../model/article');
const {
  article,
} = articleModel
const tagModel = require('../model/tag');
const {
  tag,
} = tagModel;
const casualArticleController = require('./casualArticleController');
const {
  dataFormat,
  deleteOneKey
} = require("../common/methods.js")
const {
  mongoose
} = require('../model/common');

const articleController = ({
  // 根据传过来的结果查询文章
  findArticleByCondition(req, res) {
    let inputQuery = req.query.search;
    if (inputQuery.search("tags:") == 0) {
      article.find({
          tags: inputQuery.split(":")[1]
        }).select('title description _id').limit(15)
        .then(resolve => {
          res.json({
            resultArr: resolve
          })
        })
        .catch(reject => {
          console.log(reject);
        })
    } else {

      article.find({
          $or: [{
            title: {
              $regex: new RegExp(inputQuery, "i")
            }
          }, {
            description: {
              $regex: new RegExp(inputQuery, "i")
            }
          }]
        }).select('title description _id').limit(15)
        .then(resolve => {
          res.json({
            resultArr: resolve
          })
        })
        .catch(reject => {
          console.log(reject);
        })
    }
  },
  // 查询全部文章(用于省略显示)
  findAllArticle(req, res) {
    if (req.headers.cookie) {
      article.find({}).select('_id title tags description author publishDate modifyDate').sort('-publishDate')
        .then(
          resolve => {
            res.json(resolve)
          }
        )
        .catch(reject => {
          res.json(reject)
        })
    } else {
      article.find({}).select('_id title tags description author publishDate modifyDate faceImg').sort('-publishDate')
        .then(
          resolve => {
            res.json(resolve)
          }
        )
        .catch(reject => {
          res.json(reject)
        })
    }
  },
  // 查询文章
  findOneArticle(req, res) {
    if (req.headers.cookie == undefined) {
      // 普通用户
      article.findOne({
          _id: req.query.articleId
        }).select('title tags description author publishDate modifyDate html')
        .then(
          resolve => {
            console.log(resolve);
            res.json(resolve)
          }
        )
        .catch(
          reject => {
            console.log(reject);
            res.json(reject)
          }
        )
    } else {
      // 管理员
      article.findOne({
          _id: req.query.articleId
        }).exec()
        .then(
          resolve => {
            console.log(resolve);
            res.json(resolve)
          }
        )
        .catch(
          reject => {
            console.log(reject);
            res.json(reject)
          }
        )
    }
  },
  //新建文章
  insertArticle(req, res) {
    let reqData = dataFormat(req.body)

    let newArticle = new article(reqData)

    // 查看是否有新标签，如果有就自动更新
    let casTagsArr = new Array();
    // 查询全部，进行匹配删除
    tag.find({}).select("tagName")
      .then(resolve => {
        reqData.tags.forEach(element => {
          if (!resolve.some(el => el.tagName == element)) {
            casTagsArr.push({
              tagName: element
            })
          }
        });
        return tag.create(casTagsArr)
      })
      .then(resolve => {
        newArticle.publishDate = Date.now();
        return newArticle.save()
        //保存新文章的操作
      })
      .then(resolve => {
        let isPublish = false
        if (resolve._id) { //如果返回的有_id
          isPublish = true
          // 执行清除临时文章操作
          casualArticleController.deleteArticle()
        }
        return isPublish;

      })
      .then(resolve => {
        console.log(resolve);
        res.json({
          isPublish: resolve
        })
      })
      .catch(reject => {
        res.json(reject)
      })
  },

  // 更新文章信息
  updateArticle(req, res) {
    req.body.Data.modifyDate = Date.now()
    console.log(req.body.Data);
    article.updateOne({
          _id: mongoose.Types.ObjectId(req.body._id)
        },
        req.body.Data
      )
      .then(resolve => {
        if (resolve.nModified == 1 && ok == 1) {
          res.json({
            successMsg: "修改成功"
          })
        } else {
          throw {
            errorMsg: "修改失败"
          }
        }
      })
      .catch(reject => res.json({
        errorMsg: reject.errorMsg
      }))
  },
  //删除文章信息
  deleteArticle(req, res) {
    article.deleteOne({
        _id: req.query.articleId
      })
      .then(resolve => res.json(resolve))
      .catch(reject => res.status(400).json(reject))
  }
})

module.exports = articleController