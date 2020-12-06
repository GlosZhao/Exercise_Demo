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
将其放入到Server文件夹中，根据官方建议

安装connect-history-api-fallback中间件
```
npm install --save connect-history-api-fallback
```
具体参考 [使用Express部署Vue项目](https://zhuanlan.zhihu.com/p/116749549)

- 本地测试注意:如果直接运行Client和Admin,需要分两个浏览器进行运行，具体原因是由于chrome中cookies的共享问题。

解决办法之一:可以改用localStorage存token信息。

> 特别说明：
> 该博客系统相对于第一版的优化：
> 1.使用减少了游客界面的功能点的冗余，剔除了客户端需要登录的功能点
> 2.将管理端和客户端进行了分离
> 3.前后端api进行了封装，同时使用了Axios拦截器进行数据请求头的处理以及返回数据的处理。大大提高代码可读性，也更方便维护。


效果图 -->客户端
!(客户端)[https://github.com/GlosZhao/Exercise_Demo/blob/blog2.0/showIMG/blog2.0Client.jpg]
GIF效果图-->
!(客户端)[https://github.com/GlosZhao/Exercise_Demo/blob/blog2.0/showIMG/show.gif]

后台管理界面
!(后台管理端)[https://github.com/GlosZhao/Exercise_Demo/blob/blog2.0/showIMG/blog2.0Admin.jpg]
