// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { store } from './store/store'
import 'bulma'
import {auth} from './firebase/FirebaseInit'
import VueAnalytics from 'vue-analytics'

Vue.config.productionTip = false

/* eslint-disable no-new */
let app

Vue.use(VueAnalytics, {
  id: 'UA-126639858-1',
  router,
  // debug helps you to see events in the console
  // so you know that something is happening
  debug: {
    enabled: true
  }
})

auth.onAuthStateChanged(user => {
  if (!app) {
    app = new Vue({
      el: '#app',
      router,
      store,
      components: { App },
      template: '<App/>'
    })
  }
})
