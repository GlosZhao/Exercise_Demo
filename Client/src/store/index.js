import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isView: false,
  },
  getters: {
  },
  mutations: {
    changeView(state,boolean) {
      state.isView = boolean
    },
  },
  actions: {
    // actChangeIsAdmin(context, payload) {
    //   context.commit("changeIsAdmin", payload)
    // }
  },
  modules: {}
})