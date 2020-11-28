import Vue from 'vue';
import VueRouter from 'vue-router'
import init from 'views/Init/init';
import VueCookies from 'vue-cookies';
Vue.use(VueRouter)


const routes = [{
  path: "/",
  name: "init",
  component: init,
}, {
  path: '/adminHome',
  name: 'adminHome',
  component: () => import("views/AdminHome/AdminHome"),
  hidden: true,
  children: [{
    path: 'Article_List',
    name: 'List',
    component: () => import("views/Article/Article_List")
  }, {
    path: 'Article_create',
    name: 'Create',
    component: () => import("views/Article/Article_Create")
  }, {
    path: 'Article_Edit',
    name: 'Edit',
    component: () => import("views/Article/Article_Edit")
  }, {
    path: 'Article_Show',
    name: 'Show',
    component: () => import("views/Article/Article_Show")
  }, {
    path: "tags",
    name: "tags",
    component: () => import("views/Tag/tags")
  }]
}]


const router = new VueRouter({
  routes,
  mode: 'history',
})
/**
 * 路由拦截
 * 
 * 问题描述：路由跳转死循环
 * ，当我们在router.push( {‘name’ : 'login'} ) 时又重新进入了我们当前的这个beforeEach事件里，此时又进行了token的判断，还是没有token，导致又走到了
 * router.push({name:'login'}) 里，然后就是一直死循环。
 */
router.beforeEach((to, from, next) => {
  // console.log(VueCookies.get("token"));
  if (Object.is(to.name, 'init')) {
    next();
    return
  }

  if (VueCookies.get("token")) {
    next()
  } else {
    router.push({
      name: "init"
    })
  }
})




export default router