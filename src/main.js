import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 样式重置
import './assets/css/reset.css'
import './assets/css/index.scss'

// 配置element
import 'element-ui/lib/theme-chalk/index.css'
import './element'

// 配置axios
import axios from './utils/request'
Vue.prototype.$axios = axios

// 配置echarts
import echarts from "echarts"
Vue.prototype.$echarts = echarts

// 路由拦截
import './permission'

Vue.config.productionTip = false



new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')