const {
  Schema,
  model,
  ObjectId
} = require("./common")

const TagSchema = Schema({
  // _id:Number,
  tagName: {
    type: String,
    required: true
  }
}, {
  versionKey: false,
  timestamps: true
})

const tag = model('tag', TagSchema)

module.exports = {
  tag
}