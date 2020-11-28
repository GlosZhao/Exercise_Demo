const {
  Schema,
  model,
  ObjectId
} = require('../model/common');

const userModel = require('../model/user');
const {
  UserSchema,
  user
} = userModel

const commentSchema = Schema({
  user: {
    type:ObjectId,
    ref: "user"
  }, //用户
  isRead: { //判断是否已读
    type: Boolean,
    default: false
  },
  wroteDate: {
    type: String,
    default: Date.now()
  }, //评论日期
  commentWord: String, //评论内容
  replyWord: { //回复评论
    type: Array,
    default: []
  }
}, {
  versionKey: false,
})

const comment = model("comment", commentSchema)

module.exports = {
  comment
}