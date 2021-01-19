import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
import router from './router'

const routes = [{
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
  ...router
]

const router = new VueRouter({
  routes
})

export default router