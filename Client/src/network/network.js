import axios from 'axios';


const instance = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 50000
})

instance.defaults.withCredentials = true;

// 请求拦截
instance.interceptors.request.use(
  (config) => {
      return config
  }, (err) => {
    return Promise.reject(err.request.data)
  })


// 响应拦截
instance.interceptors.response.use(
  (config) => {
    return config.data;
  }, (err) => {
    return Promise.reject(err.response.data);
  })



export default instance;