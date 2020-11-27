const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const model = mongoose.model.bind(mongoose);
const ObjectId = mongoose.Schema.Types.ObjectId; //用于定义实体对象主键

module.exports = {
  mongoose,
  Schema,
  model,
  ObjectId
}