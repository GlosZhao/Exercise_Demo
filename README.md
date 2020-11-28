# 个人博客系统优化重构版

---

- 技术栈使用如下

| 前台展示（Client） | 后台管理（Admin） | 后台（Server） |
| ------------------ | ----------------- | -------------- |
| Vue2.0             | Vue2.0            | Express        |
| Vue-Router         | Vue-Router        | express-jwt    |
| VueX               | VueX              | formidable     |
| Axios              | Axios             | jsonwebtoken   |
| ---                | Element-UI        | mongoose       |
| ---                | Vue-cookies       | cors           |
| ---                | mavon-editor      | morgan         |

+ 注意点：
该版本没有将Admin模块打包放入到Server模块中，使用
```
npm run build
```
可以将Admin打包生成dist文件夹
将其放入到Server文件夹中，具体参考 [使用Express部署Vue项目](https://zhuanlan.zhihu.com/p/116749549)

- 如果直接运行Client和Admin,需要分两个浏览器进行运行，具体原因是由于cookies的共享问题。

> 特别说明：
> 该博客相对于第一版的优化：
1.使用减少了游客界面的功能点的冗余，剔除了客户端需要登录的功能点
2.将管理端和客户端进行了分离
3.前后端api进行了封装，同时使用了Axios拦截器进行数据请求头的处理以及返回数据的处理。
