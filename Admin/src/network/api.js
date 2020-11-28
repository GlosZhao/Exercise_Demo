import {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
  splicingPath
} from './methods';

// 登录
const loginBlog = (loginForm) => apiPost("/api/user/login", loginForm);
// 注册
const registerBlog = (registerForm) => apiPost("/api/user/register", registerForm);

/**
 * 标签管理
 */
// 显示所有标签
const tagShow = () => apiGet("/api/tag/AllTag");
// 
const tagCreate = (tagName) => apiPost("/api/tag", tagName, "json");
// 修改标签
const tagUpdate = (tagName) => apiPut("/api/tag", tagName, "json");
// 删除标签
const tagDelete = (tagDataId) => apiDelete("/api/tag", {
  tagId: tagDataId
});



/**
 * 文章管理
 */

// 显示所有文章
const articleShow = () => apiGet("/api/article/AllArticle")
// 查询文章
const articleSearchByID = (articleID) => apiGet("/api/article", {
  articleId: articleID
})
// 查询临时文章
const articleTempFind = () => apiGet("/api/findCasualArticle")
// 新增文章
const articleNew = (articleCreateForm) => apiPost("/api/article", articleCreateForm, "json")
// 保存草稿
const articleTemp = (articleTempForm) => apiPost("/api/CasualArticle", articleTempForm, "json")
// 更新文章
const articleModify = (articleModifyForm) => apiPut("/api/article", articleModifyForm, "json")
// 删除文章
const articleDel = (articleID) => apiDelete("/api/article", {
  articleId: articleID
})

/**
 * 静态资源
 */
const getStatic = (data) => apiGet(data)

// 封面图片
const facePicture = () => splicingPath('/source/uploadFaceIMG');
// 文章图片
const articlePicture = (formData) => apiPost("/source/uploadMDImg", formData, "picture")
// 删除封面图片
const delFaceIMG = (ImagePath) => apiDelete("/source/delFaceIMG", {
  ImagePath: ImagePath
})
//删除MD图片
const delMDIMG = (ImagePath) => apiDelete("/source/delMDIMG", ImagePath)



export var staticResource = {
  facePicture,
  articlePicture,
  delFaceIMG,
  delMDIMG,
  getStatic
}

export var admin = {
  loginBlog,
  registerBlog
}
export var tags = {
  tagShow,
  tagCreate,
  tagUpdate,
  tagDelete
}
export var article = {
  articleShow,
  articleSearchByID,
  articleTempFind,
  articleNew,
  articleTemp,
  articleModify,
  articleDel
}