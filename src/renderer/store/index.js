import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [createPersistedState()],
  strict: process.env.NODE_ENV !== 'production',
  state: {
    baseUrl: 'https://api.weixin.qq.com',
    // 微信小程序APP_ID
    appid: '',
    // 微信小程序APP_SECRET
    secret: ''
  },
  mutations: {
    setApp(state, payload) {
      state.appid = payload.appid
      state.secret = payload.secret
    }
  }
})
