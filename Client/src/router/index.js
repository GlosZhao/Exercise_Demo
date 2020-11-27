import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import comment from '../views/comment.vue';


Vue.use(VueRouter)

const routes = [{
    path: '',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    // 下面的方法是属于懒加载方式
    path: '/article',
    name: 'article',
    component: () => import('../views/article.vue')
  }, {
    path: '/commentControl',
    name: 'commentControl',
    component: comment
  },
  {
    path: '/adminView',
    name: 'adminView',
    component: () => import('../views/admin/adminView.vue'),
    children: [{
      path: 'insertArticle',
      name: 'insertArticle',
      component: () => import("../views/admin/insertArticle.vue")
    }, {
      path: 'showArticleList',
      name: 'showArticleList',
      component: () => import("../views/admin/showArticleList.vue")
    }, {
      path: 'editArticle',
      name: 'editArticle',
      component: () => import("../views/admin/editArticle.vue")
    }, ]
  }
]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router