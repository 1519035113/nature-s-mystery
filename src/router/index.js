import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
import route from './route'

const routes = [{
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
  ...route
]

const router = new VueRouter({
  routes
})

export default router