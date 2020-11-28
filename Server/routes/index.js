var express = require('express');
var router = express.Router();
const staticSource = require('../controllers/staticController');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express'
  });
});

// 上传封面图片
router.post("/uploadFaceIMG", staticSource.uploadFaceIMG)
// 删除封面图片
router.delete("/delFaceIMG", staticSource.deleteFaceIMG)
// 上传MD图片
router.post("/uploadMdIMG", staticSource.uploadMdIMG)



module.exports = router;