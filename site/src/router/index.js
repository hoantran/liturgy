import Vue from 'vue'
import Router from 'vue-router'
import FirebaseTest from '@/components/FirebaseTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'FirebaseTest',
      component: FirebaseTest
    }
  ]
})
