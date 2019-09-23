import Vue from 'vue'
import App from './App.vue'
import router from './routers'
import store from './stores'
import axios from 'axios'

import Scroller from '@/components/Scroller'
import Loading from '@/components/Loading'
Vue.prototype.axios = axios
//设置图片宽高过滤器
Vue.filter('setWH', (url, arg) => {
  return url.replace(/w\.h/, arg)
})

Vue.config.productionTip = false
//注册全局组件
Vue.component('Scroller', Scroller)
Vue.component('Loading', Loading)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
