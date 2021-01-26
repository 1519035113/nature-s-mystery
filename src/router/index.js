import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
import ray from './ray'

const routes = [
  {
    path: '/',
    name: 'login',
    component: () => import('@/views/login')
  },
 
  ...ray
]

const router = new VueRouter({
  routes
})

export default router