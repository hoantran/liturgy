import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import firebase from 'firebase'

Vue.use(Router)

const router = new Router({
  routes,
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    const fromKeepScrollRoute = from.meta && from.meta.keepScroll
    const toKeepScrollRoute = to.meta && to.meta.keepScroll
    if (fromKeepScrollRoute || toKeepScrollRoute) return

    return savedPosition || { x: 0, y: 0 }
  }
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser

  if (requiresAuth && !currentUser) {
    next('/login')
  } else if (requiresAuth && currentUser) {
    next()
  } else {
    next()
  }
})

export default router
