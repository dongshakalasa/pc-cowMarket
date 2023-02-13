import Vue from 'vue'
import App from './App.vue'

// 引入路由
import router from '@/router/index'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

// 注册全局API接口
import API from '@/api'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  beforeCreate() {
    Vue.prototype.$bus = this
    Vue.prototype.$API = API
  },
  router
}).$mount('#app')
