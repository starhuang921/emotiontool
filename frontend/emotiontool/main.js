import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
export function createApp() {
  const app = createSSRApp(App)
  
  // #ifdef MP-WEIXIN
  wx.cloud.init({
  	env:'cloud1-4g8k754bee735955',
  	traceUser:true
  })
  // #endif
  return {
    app
  }
}
// #endif
