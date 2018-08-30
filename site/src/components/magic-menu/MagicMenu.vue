<template>
<nav class="navbar is-primary is-fixed-top is-light">
        <div class="navbar-brand">
            <a class="navbar-item" href="#">
                <img src="../../assets/flock-logo.png" alt="flock logo" width="112" height="28">
            </a>
            <div class="navbar-burger burger" data-target="navbarExampleTransparentExample">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>

        <div id="navbarExampleTransparentExample" class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" :to="{name: 'index'}">Home</router-link>
                <!-- <router-link class="navbar-item" :to="{name: 'profile'}">Add</router-link> -->
                <!-- <router-link class="navbar-item" :to="{name: 'account-index'}">Admin</router-link> -->
                <router-link class="navbar-item" :to="{name: 'index'}">Admin</router-link>
                <router-link class="navbar-item" :to="{name: 'login'}">Login</router-link>
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
            </div>
        </div>
    </nav>
</template>

<script>
console.log('MagicMenu.vue script')
export default {
  name: 'MagicMenu',
  data () {
    return {
    }
  },
  methods: {
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
