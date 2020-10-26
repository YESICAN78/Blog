import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    aid: "",
    userid:""
  },
  //实时监听state值的变化(最新状态)
  getters: {},
  mutations: {
    Setid(state, aid) {
      state.aid = aid;
    },
    Userid(state,userid){
      state.userid = userid;
    }
  },
  actions: {
  },
  modules: {
  }
})
