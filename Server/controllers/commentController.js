const commentModel = require('../model/comment');
const articleModel = require('../model/article');
const {
  comment
} = commentModel
const {
  article
} = articleModel
const {
  mongoose,
  Schema,
  model,
  ObjectId
} = require('../model/common');

const commentController = {
  // 查询所有未读的消息
  findAllNORead(req, res) {
    let noReadObj = []
    article.find({}).select("_id title commentList ")
      .then(
        resolve => {
          for (const i in resolve) {
            console.log(resolve[i].commentList);
            if (resolve[i].commentList.length() == 0) {
              continue;
            } else if (resolve[i].commentList.length() != 0) {
              for (const j in resolve[i].commentList) {
                if (resolve[i].commentList[j].isRead == false) {
                  noReadObj.push(resolve[i].commentList[j])
                }
              }
            }
          }
          console.log(noReadObj);
        }
      )
  },
  // 查询评论对应的文章，并且改变评论状态
  findOneOnRead(req, res) {
    let ArtAndCom = req.params.ArtAndCom.split("+");
    let ArtAndComObj = {}
    article.findOne({
        _id: ArtAndCom[0]
      }).exec()
      .then(resolve => {
        ArtAndComObj.article = resolve
        return comment.updateOne({
          _id: ArtAndCom[1]
        }, {
          isRead: true
        })
      })
      .then(
        resolve => {
          res.json(resolve)
        }
      )
      .catch(
        reject => {
          res = json(reject)
        }
      )
  },

  // 插入新的评论(在文章中)
  insertComment(req, res) {
    // console.log(req.body);
    let commentObj = {
      user: req.body.user,
      commentWord: req.body.comment.commentWord
    }
    let newComment = new comment(commentObj)
    // console.log(newComment);
    article.updateOne({
        _id: req.body.article._id
      }, {
        $push: {
          commentList: newComment
        }
      })
      .then(
        resolve => {
          res.json(resolve)
        }
      )
      .catch(
        reject => {
          res.json(reject)
        }
      )
  },
  // 回复评论
  replyComment(req, res) {
    let commentObj = {
      user: req.body.user,
      commentWord: req.body.comment.commentWord
    }
    let newComment = new comment(commentObj)
    console.log(newComment);
    article.updateOne({
        "commentList._id": mongoose.Types.ObjectId(req.body.article._id)
      }, {
        $push: {
          "commentList.$.replyWord": newComment
        }
      })
      .then(
        resolve => {
          res.json(resolve)
        }
      )
      .catch(
        reject => {
          res.json(reject)
        }
      )
  },
  //更改评论 
  updateComment(req, res) {

  },
  // 删除评论
  deleteComment(req, res) {
    // console.log(newComment);
    article.updateOne({
        _id: req.params.article_id
      }, {
        $pull: {
          "commentList": {
            "_id": mongoose.Types.ObjectId(req.params.comment_id)
          }
        }
      })
      .then(
        resolve => {
          res.json(resolve)
        }
      )
      .catch(
        reject => {
          res.json(reject)
        }
      )
  }
}

module.exports = commentController