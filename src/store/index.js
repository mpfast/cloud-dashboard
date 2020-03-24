import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== "production",
  state: {
    baseUrl: "https://api.weixin.qq.com",
    // 微信小程序appid
    appid: null,
    // 微信小程序secret
    secret: null,
    // 小程序全局唯一后台接口调用凭据access_token
    access_token: null,
    // 云开发环境ID
    env: "colorbox-5ivf1",
    // 腾讯云API
    secretid: null,
    secretkey: null,
    token: null
  },
  mutations: {
    setApp(state, payload) {
      state.appid = payload.appid;
      state.secret = payload.secret;
    },
    setAccessToken(state, token) {
      state.access_token = token;
    }
  }
});
