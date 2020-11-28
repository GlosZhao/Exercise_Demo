const tagModel = require('../model/tag');
const {
  tag,
} = tagModel;


const tagController = {
  // 查询所有类别
  findAllTag(req, res) {
    tag
      .find({}).select('_id tagName')
      .then(resolve => {
        res.json(resolve)
      })
      .catch(reject => {
        res.json(reject)
      })
  },
  // 根据标签查询
  findOneTag(req, res) {
    console.log(req.query.tagId);
    tag.
    find({
        tagNme: req.query.tagId
      }).exec()
      .then(resolve => {
        res.json(resolve)
      })
      .catch(reject => {
        res.json(reject)
      })
  },
  // 插入新的标签
  insertTag(req, res) {
    let tagName = req.body
    let newTag = new tag(tagName);
    // 查询全部，进行匹配删除
    tag.findOne(tagName)
      .then(resolve => {
        if (resolve == null) {
          return newTag.save()
        } else {
          throw {
            errorMsg: "标签已经存在"
          }
        }
      })
      .then(resolve => {
        res.json({
          _id: resolve._id,
          tagName: resolve.tagName
        })
      })
      .catch(reject => {
        res.status(400).json(reject.errorMsg)
      })
  },
  //更新标签
  updateTag(req, res) {

    tag.updateOne({
        _id: req.query.tagId
      }, {
        tagName: req.body.tagName
      })
      .then(resolve => {
        console.log(resolve);
        res.json(resolve)
      })
      .catch(reject => {
        res.json(reject)
      })

  },
  // 根据ID删除指定的标签
  deleteTag(req, res) {
    tag.deleteOne({
        _id: req.query.tagId
      })
      .then(resolve => {
        if (resolve.ok == 1 && resolve.deletedCount == 1) {
          res.json({
            successJudge: true
          })
        } else {
          throw {
            successJudge: false
          }
        }
      })
      .catch(reject => {
        res.status(400).json(reject)
      })
  }

}

module.exports = tagController;