const {
  Schema,
  model,
  ObjectId
} = require("./common")

const bcrypt = require('bcrypt');

// declare Schema 要大写
const UserSchema = Schema({
  // _id: ObjectId,
  username: { //用户
    type: String,
    required: true,
    unique: true //字段唯一
  },
  email: {
    type: String
  },
  password: { //密码
    type: String,
    required: true,
    set(val) {//引入加密方法
      return bcrypt.hashSync(val, 10)//10为加密等级
    }
  }
}, {
  // 关闭 _V
  versionKey: false,
  timestamps: true
})

// new model
const user = model('user', UserSchema)

module.exports = {
  UserSchema,
  user

};