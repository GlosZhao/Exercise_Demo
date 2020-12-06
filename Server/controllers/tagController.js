const tagModel = require('../model/tag');
const {
  tag,
} = tagModel;


const tagController = {
  // 查询所有类别
  findAllTag(req, res) {
    tag
      .find({}).exec()
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
    let tags = req.body.tags
    let errorObj = {} //用于错误检查，一旦发现错误直接throw跳出循环
    console.log(tags);
    let casTagsArr = new Array();
    // 查询全部，进行匹配删除
    tag.find({}).select("tagName")
      .then(resolve => {
        console.log(resolve);
        tags.forEach(element => {
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
  },
  //更新标签
  updateTag(req, res) {
    tag.updateOne({
        tagName: req.query.tagName
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
        tagName: req.params.tagName
      })
      .then(resolve => {
        res.json(resolve)
      })
      .catch(reject => {
        res.json(reject)
      })
  }

}

module.exports = tagController;