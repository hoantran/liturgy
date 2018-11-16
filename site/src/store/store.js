import Vue from 'vue'
import Vuex from 'vuex'
import { usersCollection } from '../firebase/FirebaseInit'
Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    choirID: null,
    currentUser: null,
    userProfile: {}
  },
  getters: {
    choirID: state => state.choirID
  },
  actions: {
    clearData ({ commit }) {
      commit('setCurrentUser', null)
      commit('setUserProfile', {})
      commit('choirID', null)
    },
    fetchUserProfile ({commit, state}) {
      // for firebase fb login
      usersCollection.doc(state.currentUser.uid).get().then(res => {
        commit('setUserProfile', res.data())
      }).catch(err => {
        console.log(err)
      })
      // only for firebase email login
      // usersCollection.doc(state.currentUser.uid).get().then(res => {
      //   commit('setUserProfile', res.data())
      // }).catch(err => {
      //   console.log(err)
      // })
    }
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val
    },
    setUserProfile (state, val) {
      state.userProfile = val
    },
    setChoirID (state, val) {
      console.log('setting:' + val)
      state.choirID = val
      console.log('verifying: ' + state.choirID)
    }
  }
})
