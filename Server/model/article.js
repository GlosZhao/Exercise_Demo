const {
  Schema,
  model,
  ObjectId
} = require('../model/common');
/**
 * 一般在设计中图片应该要独立出来，不要向数据库中加图片
 */
const ArticleSchema = Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: "Admin",
  },
  tags: { //标签（屏蔽关系）,
    type: Array,
    default: []
  },
  description: {
    type: String,
  },
  faceImg: [],
  // 发表时间和修改事件
  publishDate: {
    type: String,
    default: Date.now(),
    required: true
  },
  modifyDate: {
    type: String,
    default: ""
  },
  // 内容
  html: {
    type: String
  },
  md: {
    type: String
  },
  // 评论
  commentList: {
    type: Array,
    default: []
  }
}, {
  versionKey: false,
})
const CasualArticle = model("CasualArticle", ArticleSchema)

const article = model("article", ArticleSchema)

module.exports = {
  article,
  CasualArticle
}