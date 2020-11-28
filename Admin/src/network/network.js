/*
 * @Author: your name
 * @Date: 2020-11-04 17:00:20
 * @LastEditTime: 2020-11-20 14:48:57
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog-menagement\src\network\network.js
 */
import axios from "axios";
import VueCookies from "vue-cookies"
import vuex from '../store';
import {
  Message
} from 'element-ui';



const instance = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 50000
})
/**
 * 它指示了是否该使用类似cookies,authorization headers(头部授权)或者TLS客户端证书这一类资格证书来创建一个跨站点访问控制（cross-site 
 * Access-Control）请求
 */
instance.defaults.withCredentials = true;



// 请求拦截
instance.interceptors.request.use(
  (config) => {
    let splitURL = config.url.split("/").pop()
    if (splitURL == "login" || splitURL == "register" || splitURL == "AllTag" || splitURL == "AllArticle") {
      return config
    } else {
      if (VueCookies.get("token")) { //判断token是否存在
        config.headers.Authorization = VueCookies.get("token"); //将token设置成请求头
      }
      return config
    }
  }, (err) => {
    return Promise.reject(err.request.data)
  })


// 响应拦截
instance.interceptors.response.use(
  (config) => {
    //如果有cookies，读取cookies，改变Vuex
    if (VueCookies.get("token")) { //判断token是否存在
    }
    return config.data;
  }, (err) => {
    return Promise.reject(err.response.data);
  })



export default instance;