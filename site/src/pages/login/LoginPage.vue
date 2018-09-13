<template>
  <section class="hero is-fullheight">
          <div class="hero-body">
              <div class="container has-text-centered">
                  <div class="column is-4 is-offset-4">
                      <h3 class="title has-text-grey">Login</h3>
                      <p class="subtitle has-text-grey">Please login to proceed.</p>
                      <div class="box">
                          <figure class="avatar">
                              <img class="login-logo" src="../../assets/robert-logo.png">
                          </figure>
                          <form v-if="showLoginForm" @submit.prevent="login">
                              <div class="field">
                                  <div class="control">
                                      <input class="input is-large" type="email" placeholder="Your Email" autofocus="" v-model.trim="loginForm.email">
                                  </div>
                              </div>

                              <div class="field">
                                  <div class="control">
                                      <input class="input is-large" type="password" placeholder="Your Password" v-model.trim="loginForm.password">
                                  </div>
                              </div>
                              <div class="field">
                                  <label class="checkbox">
                                    <input type="checkbox">
                                      Remember me
                                  </label>
                              </div>
                              <button class="button is-block is-info is-large is-fullwidth">Login</button>
                          </form>
                      </div>
                      <p class="has-text-grey">
                          <a href="../">Sign Up</a> &nbsp;·&nbsp;
                          <a href="../">Forgot Password</a> &nbsp;·&nbsp;
                          <a href="../">Need Help?</a>
                      </p>
                  </div>
              </div>
          </div>
      </section>
</template>
<script>
// import firebase from 'firebase/app'
// import 'firebase/auth'
// const auth = firebase.auth()
import { auth } from '../../firebase/FirebaseInit'
console.log('auth: ' + auth)

export default {
  name: 'LoginPage',
  data () {
    return {
      loginForm: {
        email: '',
        password: ''
      },
      signupForm: {
        name: '',
        title: '',
        email: '',
        password: ''
      },
      passwordForm: {
        email: ''
      },
      showLoginForm: true,
      showForgotPassword: false,
      passwordResetSuccess: false,
      performingRequest: false,
      errorMsg: ''
    }
  },
  methods: {
    login: function () {
      console.log('EMAIL: ' + this.loginForm.email + ', PASSWORD: ' + this.loginForm.password)
      this.performingRequest = true
      auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
        console.log('success: user : ' + user)
        console.log('my object: %o', user)
        console.log('my user user: %o', user.user)
        console.log('my user id: %o', user.user.uid)
        this.$store.commit('setCurrentUser', user.user)
        this.$store.dispatch('fetchUserProfile')
        this.performingRequest = false
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
        this.performingRequest = false
        this.errorMsg = err.errorMsg
      })
    }
  }
}

</script>

<style scoped>
.login-logo { border-radius: 64px;}
</style>
