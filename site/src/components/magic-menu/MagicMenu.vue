<template>
<nav class="navbar is-primary is-fixed-top is-light">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <img src="../../assets/flock-logo.png" alt="flock logo" width="112" height="28">
            </a>
            <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" @click="burger">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" @click="handleClick('')">Home</a>
              <div class="navbar-item has-dropdown is-hoverable">
                <a class="navbar-link" href="#">
                  Admin
                </a>
                <div class="navbar-dropdown is-boxed">
                  <a class="navbar-item" @click="handleClick('updatesongurls')">Update Song URLs</a>
                  <a class="navbar-item" @click="handleClick('populate')">Peeing in the Genepool</a>
                  <a class="navbar-item" @click="handleClick('huy')">Basketball Update</a>
                  <a class="navbar-item" @click="handleClick('sleeping')">Sleeping</a>
                </div>
              </div>
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link" href="#">
                        Merchandise
                    </a>
                    <div class="navbar-dropdown is-boxed">
                        <a class="navbar-item" href="#">
                            FLOCK Shirts
                        </a>
                        <a class="navbar-item" href="#">
                            FLOCK Shoes
                        </a>
                        <a class="navbar-item" href="#">
                            FLOCK Spirit (Alchohol Kind)
                        </a>
                    </div>
                </div>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <div class="field">
                        <div class="control">
                            <input class="input" type="text" placeholder="search . . .">
                        </div>
                    </div>
                </div>
                <a class="navbar-item" @click="logout">Logout</a>
            </div>
        </div>
    </nav>
</template>

<script>
import { auth } from '../../firebase/FirebaseInit'
export default {
  name: 'MagicMenu',
  data () {
    return {
    }
  },
  methods: {
    handleClick (item) {
      this.burger()
      this.$router.push('/' + item)
    },
    burger () {
      document.querySelector('.navbar-menu').classList.toggle('is-active')
      document.querySelector('.navbar-burger').classList.toggle('is-active')
    },
    logout () {
      auth.signOut().then(() => {
        this.$store.dispatch('clearData')
        this.$router.push('/login')
      }).catch(err => {
        console.log(err)
      })
    },
    handleScroll () {
      console.log('scrolling...')
      if (window.scrollY > 0) {
        console.log('Adding a class')
        // add a class here like:
        // $('nav').addClass('black')
        // console.log(this.$options.parent)
        // console.log('options.name:' + this.$options.name)
      } else {
        console.log('Remove class')
        // remove that class like:
        // $('nav').removeClass('black')
      }
    }
  },
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy () {
    window.removeEventListener('scroll', this.handleScroll)
  }
}
</script>

<style>
</style>
