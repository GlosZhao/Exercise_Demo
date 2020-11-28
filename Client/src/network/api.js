import instance from 'network/network';

export function apiGet(url, params) {
  return new Promise((resolve, reject) => {
    instance.get(url, {
        params: params
      }).then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })

}

// 查询全部标签
const getAllTags = () => apiGet("/api/tag/AllTag")
// 查询全部文章
const getAllArticle = () => apiGet("/api/article/AllArticle")
// 根据文章关键词查询文章
const searchByKeyWords = (SearchData) => apiGet("/api/article/search", {
  search: SearchData
})


export {
  getAllTags,
  getAllArticle,
  searchByKeyWords
}