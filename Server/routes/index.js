var express = require('express');
var router = express.Router();
const formidable = require('formidable');
const fs = require('fs');
const path = require('path');
const {
  resolve
} = require('path');


// 获取图片
router.get("/img", (req, res) => {
  console.log(req.params);
})



// 封面图片上传
router.post("/uploadImg", (req, res) => {
  // 判断是否有当前文件目录
  // 文件位置
  let theArticlePath = path.join(__dirname, '../public/images/' + getCurDate())
  fs.mkdir(theArticlePath, {
      recursive: true
    },
    (err) => {
      if (err) {
        console.log(err);
        throw err;
      }
    });
  let form = new formidable.IncomingForm()
  form.encoding = 'utf-8'; // 编码
  // 设置图片上传的地址
  form.uploadDir = theArticlePath + "\\"
  console.log(form.uploadDir);
  // 保留图片后缀名
  form.keepExtensions = true
  // 默认最大图片
  form.maxFieldsSize = 2 * 1024 * 1024

  form.parse(req, function (err, fields, files) {
    // 判断是数组还是对象属性
    // 重命名图片
    let file = files.file
    let extName = path.extname(file.name)
    // 获取旧的路径
    let oldPath = path.normalize(file.path);
    // 新名字
    let newFileName = getCurDate() + extName
    fs.rename(oldPath, form.uploadDir + '\\' + newFileName, (err) => {
      if (err) {
        console.error("重命名失败,可能有相同的文件名" + err);
        res.status(500);
      }
      res.status(200);
    })
    if (err) {
      return res.json({
        errorMSG: '上传失败',
      })
    }
    return res.json({
      imgPath: "http://localhost:3000/images/" + getCurDate() + '/' + newFileName, //返回的是获取图片的连接
      imgName: newFileName //使用新名字
    })
  })
})

// md图片上传
router.post("/uploadMDImg", (req, res) => {
  // 当前目录地址
  let theArticlePath = path.join(__dirname, '../public/images/' + getCurDate())
  // 创建目录
  fs.mkdirSync(theArticlePath, {
    recursive: true
  })
  // 获取目录的结果
  new Promise((resolve, reject) => {
    fs.readdir(theArticlePath, (err, files) => {
      if (err) {
        reject(err)
      } else {
        if (files.length == 0) {
          resolve(getCurDate() + (FormByDate(files.length, 2) + 1))
        } else {
          // 遍历，如果有封面图就删除
          for (let i = 0; i < files.length; i++) {
            if (files[i].length < 14) {
              files.splice(i, 1)
            }
          }
          resolve(getCurDate() + FormByDate(files.length + 1, 3))
        }
      }
    })
  }).then(resolve => {
    console.log(resolve);
    let form = new formidable.IncomingForm()
    form.encoding = 'utf-8'; // 编码
    // 设置图片上传的地址
    form.uploadDir = theArticlePath
    // 保留图片后缀名
    form.keepExtensions = true
    // 默认最大图片
    form.maxFieldsSize = 2 * 1024 * 1024

    form.parse(req, function (err, fields, files) {
      // 判断是数组还是对象属性
      // 重命名图片
      let file = files.upload
      let extName = path.extname(file.name)
      // 获取旧的路径
      let oldPath = path.normalize(file.path);
      // 新名字
      let newFileName = resolve + extName
      fs.rename(oldPath, form.uploadDir + '/' + newFileName, (err) => {
        if (err) {
          console.error("重命名失败,可能有相同的文件名" + err);
          res.status(500);
        }
        res.status(200);
      })
      if (err) {
        return res.json({
          errorMSG: '上传失败',
        })
      }
      return res.json({
        imgPath: "http://localhost:3000/images/" + getCurDate() + '/' + newFileName, //返回的是获取图片的连接
        imgName: newFileName //使用新名字
      })
    })
  }).catch(reject => {
    console.log(reject);
  })

})
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
  return curYear + curMonth + curDate
}
//位数格式化
function FormByDate(num, length) {
  return (Array(length).join('0') + num).slice(-length);
}

module.exports = router;