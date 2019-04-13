import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);


export default new Vuex.Store({
  state: {
    token: null,
    userInfo: null,
    lang: 'zh-CN'
  },
  getters: {
    token(state) {
      return state.token;
    },
    userInfo(state) {
      return state.userInfo;
    }
  },
  mutations: {
    setLang(state, lang) {
      localStorage.lang = lang;
      state.lang = lang;
    }
  },
  actions: {}
});
