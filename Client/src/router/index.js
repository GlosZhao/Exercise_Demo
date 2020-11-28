import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from 'views/Home';
import List from 'views/List';


Vue.use(VueRouter)

const routes = [

  {
    path: '',
    redirect: "/Home/list"
  },
  {
    path: '/Home',
    name: 'Home',
    component: Home,
    children: [{
        path: 'list',
        name: 'list',
        component: List,
      },
      {
        // 下面的方法是属于懒加载方式
        path: 'article',
        name: 'article',
        component: () => import('views/article.vue')
      }
    ]
  },

]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router