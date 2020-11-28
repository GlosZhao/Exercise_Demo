/*
 * @Author: your name
 * @Date: 2020-11-01 10:44:19
 * @LastEditTime: 2020-11-27 15:13:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \blog-menagement\src\store\index.js
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: true,
  },
  // 同步
  mutations: {
    changeIsLogin(state) {
      state.isLogin = !state.isLogin
    },
  },
  // 异步
  actions: {
    // actChangeIsAdmin(context, payload) {
    //   context.commit("changeIsAdmin", payload)
    // }
  },
  modules: {}
})