const articleModel = require('../model/article');
const {
  article,
} = articleModel
const tagModel = require('../model/tag');
const {
  tag,
} = tagModel;
const casualArticleController = require('./casualArticleController');


const articleController = ({
  // 查询全部文章(用于省略显示)

  findAllArticle(req, res) {
    // let cookiesArr = req.headers.cookie.split(";")
    // let isAdmin = false;
    // if (cookiesArr.length > 2) {
    //   let adminArr = cookiesArr[2].split('=')
    //   if (adminArr[1] === "true" ? true : false) {
    //     isAdmin = true;
    //   }
    // }
    article.find({}).select('_id title tags description author publishDate modifyDate faceImg').sort('-_id')
      .then(
        resolve => {
          res.json(resolve)
        }
      )
      .catch(reject => {
        res.json(reject)
      })
  },
  // 查询文章
  findOneArticle(req, res) {
    let cookiesArr = req.headers.cookie.split(";")
    let isAdmin = false;
    if (cookiesArr.length > 2) {
      let adminArr = cookiesArr[2].split('=')
      if (adminArr[1] === "true" ? true : false) {
        isAdmin = true;
      }
    }
    console.log(req.query);
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
  },
  //新建文章
  //浏览器解析markdown文件再上传
  insertArticle(req, res) {
    let reqData = {
      title: req.body.title,
      description: req.body.description,
      author: req.body.author,
      faceImg: req.body.faceImg,
      tags: req.body.tags,
      content: req.body.html,
      md: req.body.md
    }
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
        console.log(casTagsArr);
        return tag.create(casTagsArr)
      })
      .then(resolve => {
        console.log(resolve);
      })
      .catch(reject => {
        console.log(reject);
      })
    //保存新文章的操作
    newArticle.save()
      .then(resolve => {
        let dataObj = {
          isPublish: false
        }
        if (resolve._id) { //如果返回的有_id
          dataObj.isPublish = true
          // 执行清除临时文章操作
          casualArticleController.deleteArticle()
        }
        return dataObj
      })
      .then(resolve => {
        console.log(resolve);
        res.json(resolve)
      })
      .catch(reject => {
        res.json(reject)
      })
  },
  // 更新文章信息
  updateArticle(req, res) {
    let newArticleObj = req.body
    let updateArticle = new article(newArticleObj)
    updateArticle.modifyDate = Date.now()
    console.log(updateArticle);
    article.updateOne({
        _id: req.body._id
      }, {
        updateArticle
      })
      .then(resolve => res.json(resolve))
      .catch(reject => res.json(reject))
  },
  //删除文章信息
  deleteArticle(req, res) {
    console.log(req.query);
    article.deleteOne({
        _id: req.query.articleId
      })
      .then(resolve => res.json(resolve))
      .catch(reject => res.json(reject))
  }
})

module.exports = articleController