
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const tagController = require('../controllers/tagController');
const articleController = require('../controllers/articleController')
const casualArticleController = require('../controllers/casualArticleController');
const commentController = require('../controllers/commentController');

// POST：创建
// GET：获取
// PUT：修改        需要url中的参数和body中的参数
// DELETE：删除     只需要URL中的参数

// 这个项目一定要有且只有一个管理员，只能查询一个
// router.get('/manufacturers', manufacturerController.all);
// 登陆时要查询相应信息
router.post('/user/login', express.urlencoded({
  extended: true
}), userController.findUser);
// 初次登陆时需要注册
router.post('/user/register', express.urlencoded({
  extended: true
}), userController.newUser);
// 修改密码
router.put('/user/:username', userController.updateUser);
//这个项目一定要有且只有一个管理员
// router.delete('/manufacturers/:id', manufacturerController.remove);



/**
 * 标签
 */
router.get('/tag/AllTag', tagController.findAllTag);
router.get('/tag', tagController.findOneTag);
router.post('/tag', tagController.insertTag);
router.put('/tag', tagController.updateTag);
router.delete('/tag', tagController.deleteTag);

//记录删除 
// router.delete('/record/:recordRange',recordController.deleteRecord);


/**
 * 文章
 */
router.get('/article/AllArticle', articleController.findAllArticle)
router.get('/article/search',articleController.findArticleByCondition)
router.get('/article', articleController.findOneArticle)
router.post('/article', articleController.insertArticle)
router.put('/article', articleController.updateArticle)
router.delete('/article', articleController.deleteArticle)

// 临时文章
router.get('/findCasualArticle', casualArticleController.findArticle)
router.post('/CasualArticle', casualArticleController.insertArticle)


/**
 * 评论
 */
router.get('/comment/AllComment', commentController.findAllNORead)
router.get('/comment/:ArtAndCom', commentController.findOneOnRead)
router.post('/comment/newComment', commentController.insertComment)
// router.post('/comment/replyComment', commentController.replyComment)
router.put('/comment/:commentId', commentController.updateComment)
router.delete('/comment/:article_id/:comment_id', commentController.deleteComment)

module.exports = router;