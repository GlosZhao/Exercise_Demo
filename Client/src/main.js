import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import 'element-ui/lib/theme-chalk/index.css'
import VueCookies from 'vue-cookies'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'


Vue.use(VueCookies)
Vue.use(mavonEditor)
Vue.use(ElementUI, {
  locale
})



Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')