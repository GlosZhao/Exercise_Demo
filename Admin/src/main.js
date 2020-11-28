import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import VueCookies from 'vue-cookies';




Vue.config.productionTip = false
Vue.use(mavonEditor)
Vue.use(VueCookies)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')