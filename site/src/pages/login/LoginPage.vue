<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <transition name="fade">
        <i v-if="performingRequest" class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </transition>

      <div class="container has-text-centered">
        <transition name="fade">
          <div v-if="errorMsg !== ''" class="message is-danger">
            <p>{{ errorMsg }}</p>
          </div>
        </transition>
      </div>
    </div>
  </section>
</template>
<script>
import { auth } from '../../firebase/FirebaseInit'
import firebase from 'firebase'

export default {
  name: 'LoginPage',
  data () {
    return {
      performingRequest: false,
      errorMsg: ''
    }
  },
  created () {
    this.signUserInFacebook()
  },
  methods: {
    signUserInFacebook () {
      var provider = new firebase.auth.FacebookAuthProvider()
      console.log('PROVIDER:', provider)
      //   let provider = new auth.FacebookAuthProvider()
      //   var provider = new auth.FacebookAuthProvider()
      //   console.log(provider)
      auth.signInWithPopup(provider).then(result => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        var token = result.credential.accessToken
        console.log('TOKEN:', token)
        // The signed-in user info.
        var user = result.user
        console.log('USER:', user)
        console.log('LOGGED IN')
        this.$store.commit('setCurrentUser', user)
        this.$store.dispatch('fetchUserProfile')
        this.performingRequest = false
        this.$router.push('/')

        // ...
      }).catch(error => {
        // Handle Errors here.
        var errorCode = error.code
        var errorMessage = error.message
        console.log(errorCode, errorMessage)
        // The email of the user's account used.
        var email = error.email
        console.log(email)
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential
        console.log(credential)
      })
    },
    login: function () {
      console.log('Logging in....')
      //   auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
      //     this.$store.commit('setCurrentUser', user.user)
      //     this.$store.dispatch('fetchUserProfile')
      //     this.$router.push('/')
      //   }).catch(err => {
      //     console.log(err)
      //     // this.errorMsg = err.message
      //   })
    }
  }
}
</script>

<style scoped>
.login-logo {
  border-radius: 64px;
}
</style>
