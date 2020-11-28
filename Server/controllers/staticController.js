const formidable = require('formidable');
const fs = require('fs');
const {
  resolve
} = require('path');
const path = require('path');
const {
  getCurDate,
  FormByDate,
  ArrayItemMatch,
} = require("../common/methods")


const staticSource = {

  //上传封面
  uploadFaceIMG(req, res) {
    return new Promise((resolve, reject) => {
        let theArticlePath = path.join(__dirname, '../public/images/Face')
        fs.mkdir(theArticlePath, {
            recursive: true
          },
          (err) => {
            if (err) {
              reject({
                errorMsg: "创建图片目录失败",
                err: err
              })
            }
            resolve({
              theArticlePath: theArticlePath
            })
          })
      })
      .then(resolve => {
        console.log(resolve);
        let form = new formidable.IncomingForm()
        form.encoding = 'utf-8'; // 编码
        // 设置图片上传的地址
        form.uploadDir = resolve.theArticlePath + "\\"
        // 保留图片后缀名
        form.keepExtensions = true
        // 默认最大图片
        form.maxFieldsSize = 2 * 1024 * 1024
        // 因为里面还有一个嵌套回调函数，需要新的Promise进行进一步封装，否则拿不到返回值，或者下面只返回undefined
        return new Promise((resolve, reject) => {
          form.parse(req, (err, fields, files) => {
            if (err) {
              reject({
                errorMsg: "上传失败",
              })
            }
            let file = files.file;
            resolve({
              oldPath: path.normalize(file.path),
              extname: path.extname(file.name),
              uploadDir: form.uploadDir
            })
          })
        })
      })
      .then((res) => {
        let fileArr = fs.readdirSync(res.uploadDir)
        console.log(fileArr.filter((e) => ArrayItemMatch(e, getCurDate())));
        res.faceList = fileArr.length
        return res
      })
      .then(
        (res) => {
          return new Promise((resolve, reject) => {
            let newFaceImgName = getCurDate() + "-Face" + res.faceList + res.extname;
            fs.rename(res.oldPath, res.uploadDir + '\\' + newFaceImgName, (err) => {
              if (err) {
                reject({
                  errorMsg: "重命名失败,可能有相同的文件名",
                })
              }
            })
            res.newFaceImgName = newFaceImgName
            resolve(res);
          })
        })
      .then(
        (resolve) => {
          res.json({
            imgPath: "http://localhost:3000/images/Face/" + resolve.newFaceImgName, //返回的是获取图片的连接
            imgName: resolve.newFaceImgName
          })
        }
      )
      .catch((reject) => {
        res.status(400).json({
          errorMsg: reject.errorMsg
        })
      })
  },
  // 删除封面图片
  deleteFaceIMG(req, res) {
    let pathArr = req.query.ImagePath.split(req.headers.host)
    let theFaceImgPath = path.join(__dirname, '../public' + pathArr[1])
    return new Promise((resolve, reject) => {
        fs.unlink(theFaceImgPath, (err) => {
          if (err) {
            reject({
              errorMsg: "删除失败"
            })
          }
          resolve({
            successMsg: "删除成功"
          })
        })
      })
      .then((resolve) => {
        console.log(resolve);
        res.json({
          successMsg: resolve.successMsg
        })
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({
          errorMsg: err.errorMsg
        })
      })
  },
  // 上传md图片
  uploadMdIMG(req, res) {
    return new Promise((resolve, reject) => {
        // 当前目录地址
        let theMDImgPath = path.join(__dirname, '../public/images/' + getCurDate())
        // 创建目录
        fs.mkdir(theMDImgPath, {
          recursive: true
        }, (err, path) => {
          if (err) {
            reject({
              errorMsg: "创建图片目录失败",
              err: err
            })
          }
        })
        resolve({
          theMDImgPath: theMDImgPath
        })
      })
      // 获取目录的结果
      .then(res => {
        let form = new formidable.IncomingForm()
        form.encoding = 'utf-8'; // 编码
        // 设置图片上传的地址
        form.uploadDir = res.theMDImgPath
        // 保留图片后缀名
        form.keepExtensions = true
        // 默认最大图片
        form.maxFieldsSize = 2 * 1024 * 1024 //2Mb大小限制
        return new Promise((resolve, reject) => {
          form.parse(req, function (err, fields, files) {
            if (err) {
              reject({
                errorMsg: "上传失败",
              })
            }
            let file = files.upload;
            resolve({
              oldPath: path.normalize(file.path),
              extname: path.extname(file.name),
              uploadDir: form.uploadDir
            })
          })
        })
      })
      .then((res) => {
        // 计算该路径下的文件数
        let mdDirList = fs.readdirSync(res.uploadDir)
        // 重命名图片
        let newMDImgName = getCurDate() + FormByDate(mdDirList.length, 3) + res.extname;
        fs.rename(res.oldPath, res.uploadDir + '/' + newMDImgName, (err) => {
          if (err) {
            return Promise.reject({
              errorMsg: "重命名失败,可能有相同的文件名"
            });
          }
        })
        return Promise.resolve({
          newMDImgName: newMDImgName
        })
      })
      .then((resolve) => {
        res.json({
          imgPath: "http://localhost:3000/images/" + getCurDate() + '/' + resolve.newMDImgName, //返回的是获取图片的连接
          imgName: resolve.newMDImgName //使用新名字
        })
      })
      .catch(err => {
        res.status(400).json({
          errorMsg: err.errorMsg
        })
      })
  }
}

module.exports = staticSource;