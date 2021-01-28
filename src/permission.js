import router from './router'
router.beforeEach((to, from, next) => {
    let token = localStorage.getItem('userInfo')
    if (!token) {
      if (to.path != '/') {
        next('/')
      } else {
        next()
      }
    } else {
      if (to.path == '/') {
        next('/home')
      } else {
        next()
      }
    }
  })