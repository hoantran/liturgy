import Vue from 'vue'
import Vuex from 'vuex'
import { usersCollection } from '../firebase/FirebaseInit'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {}
  },
  actions: {
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
    },
    fetchUserProfile ({commit, state}) {
      console.log('usersCollection: ' + usersCollection)
      usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    }
  }
})
