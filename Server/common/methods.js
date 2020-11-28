// 日期格式化工具
function getCurDate() {
  let nowDate = new Date()
  let curYear = nowDate.getFullYear();
  let curMonth = nowDate.getMonth() + 1;
  let curDate = nowDate.getDate()
  // 对月份进行处理，1-9月在前面添加一个“0”
  if (curMonth >= 1 && curMonth <= 9) {
    curMonth = "0" + curMonth;
  }
  // 对日份进行处理，1-9号在前面添加一个“0”
  if (curDate >= 0 && curDate <= 9) {
    curDate = "0" + curDate;
  }
  return String(curYear) + String(curMonth) + String(curDate)
}


/**
 * @description:数组过滤器 
 * @param {*} params
 * @param {*} matchRules
 * @return {*}
 */
function ArrayItemMatch(params, matchRules) {
  return new RegExp(matchRules, "i").test(params)
}


//位数格式化
function FormByDate(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}



// 数据格式化
function dataFormat(params) {
  let newData = {}
  Object.keys(params).forEach(value => {
    newData[value] = params[value]
  })
  return newData
}



// 定义状态码


// 对象属性指定删除
function deleteOneKey(Obj, uselessKeys) {
  // let tempMap = new Map(Object.entries(Obj))
  // tempMap.delete(uselessKeys)
  // return [...tempMap.entries()].reduce((obj, [key, value]) => (obj[key] = value, obj), {})
  delete Obj[uselessKeys]
  return Obj;
}


module.exports = {
  getCurDate,
  FormByDate,
  dataFormat,
  ArrayItemMatch,
  deleteOneKey
}