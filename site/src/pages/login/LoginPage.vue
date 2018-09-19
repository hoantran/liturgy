<template>
  <section class="hero is-fullheight">
          <div class="hero-body">
              <transition name="fade">
                <div v-if="performingRequest" class="fas fa-spinner fa-pulse">
                    <p>Loading...</p>
                </div>
              </transition>

              <div class="container has-text-centered">
                  <!-- LOGIN FORM -->
                  <div v-if="showLoginForm" class="column is-4 is-offset-4">
                      <h3 class="title has-text-grey">Login</h3>
                      <p class="subtitle has-text-grey">Please login to proceed.</p>
                      <div class="box">
                          <figure class="avatar">
                              <img class="login-logo" src="../../assets/robert-logo.png">
                          </figure>
                          <form @submit.prevent="login">
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
                          <a @click="toggleForm">Sign Up</a> &nbsp;·&nbsp;
                          <a @click="togglePasswordReset">Forgot Password</a> &nbsp;·&nbsp;
                          <a href="../">Need Help?</a>
                      </p>
                  </div>
                  <!-- SIGNUP FORM -->
                  <div v-if="!showLoginForm && !showForgotPassword" class="column is-4 is-offset-4">
                      <h3 class="title has-text-grey">Sign Up</h3>
                      <p class="subtitle has-text-grey">Please enter information to sign up.</p>
                      <div class="box">
                          <form @submit.prevent="signup">
                              <div class="field">
                                  <div class="control">
                                      <input class="input is-large" type="text" placeholder="Your Name" autofocus="" v-model.trim="signupForm.name">
                                  </div>
                              </div>

                              <div class="field">
                                  <div class="control">
                                      <input class="input is-large" type="email" placeholder="Your Email" autofocus="" v-model.trim="signupForm.email">
                                  </div>
                              </div>

                              <div class="field">
                                  <div class="control">
                                      <input class="input is-large" type="password" placeholder="Your Password" v-model.trim="signupForm.password">
                                  </div>
                              </div>
                              <button class="button is-block is-info is-large is-fullwidth">Sign Up</button>
                          </form>
                      </div>
                      <p class="has-text-grey">
                          <a @click="toggleForm">Sign In</a> &nbsp;·&nbsp;
                      </p>
                  </div>
                  <!-- FORGOT PASSWORD FORM -->
                  <div v-if="showForgotPassword" class="column is-4 is-offset-4">
                      <div v-if="!passwordResetSuccess">
                        <h3 class="title has-text-grey">Reset Password</h3>
                        <p class="subtitle has-text-grey">We will send you an email to reset your password.</p>
                        <div class="box">
                            <form @submit.prevent="resetPassword">
                                <div class="field">
                                    <div class="control">
                                        <input class="input is-large" type="email" placeholder="Your Email" autofocus="" v-model.trim="passwordForm.email">
                                    </div>
                                </div>

                                <button class="button is-block is-info is-large is-fullwidth">Submit</button>
                            </form>
                        </div>
                        <p class="has-text-grey">
                            <a @click="togglePasswordReset">Sign In</a> &nbsp;·&nbsp;
                        </p>
                      </div>
                      <div v-else>
                      <h1>Email sent</h1>
                      <p>Check your email for a link to reset your password.</p>
                      <p class="has-text-grey">
                        <a @click="togglePasswordReset">Back to sign In</a> &nbsp;·&nbsp;
                      </p>
                  </div>
                  </div>
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
// import firebase from 'firebase/app'
// import 'firebase/auth'
// const auth = firebase.auth()
import { auth, usersCollection } from '../../firebase/FirebaseInit'

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
    toggleForm () {
      this.errorMsg = ''
      this.showLoginForm = !this.showLoginForm
    },
    togglePasswordReset: function () {
      if (this.showForgotPassword) {
        this.showLoginForm = true
        this.showForgotPassword = false
        this.passwordResetSuccess = false
      } else {
        this.showLoginForm = false
        this.showForgotPassword = true
      }
    },
    login: function () {
      this.performingRequest = true
      this.performingRequest = true
      auth.signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)
        this.$store.dispatch('fetchUserProfile')
        this.performingRequest = false
        this.$router.push('/')
      }).catch(err => {
        console.log(err)
        this.performingRequest = false
        this.errorMsg = err.message
      })
    },
    signup: function () {
      this.performingRequest = true
      auth.createUserWithEmailAndPassword(this.signupForm.email, this.signupForm.password).then(user => {
        this.$store.commit('setCurrentUser', user.user)
        usersCollection.doc(user.user.uid).set({
          name: this.signupForm.name
        }).then(() => {
          this.$store.dispatch('fetchUserProfile')
          this.performingRequest = false
          this.$router.push('/')
        }).catch(err => {
          console.log(err)
          this.performingRequest = false
          this.errorMsg = err.message
        })
      }).catch(err => {
        console.log('Sign Up error: ' + err)
        this.performingRequest = false
        this.errorMsg = err.message
      })
    },
    resetPassword: function () {
      auth.sendPasswordResetEmail(this.passwordForm.email).then(() => {
        this.performingRequest = false
        this.passwordResetSuccess = true
        this.passwordForm.email = ''
      }).catch(err => {
        console.log(err)
        this.performingRequest = false
        this.errorMsg = err.message
      })
    }
  }
}

</script>

<style scoped>
.login-logo { border-radius: 64px;}
</style>
