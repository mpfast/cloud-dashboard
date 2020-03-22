import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    baseUrl: 'https://api.weixin.qq.com',
    // 微信小程序APP_ID
    appId: '',
    // 微信小程序APP_SECRET
    appSecret: ''
  }
})
