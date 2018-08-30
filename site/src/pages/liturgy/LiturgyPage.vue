<template>
  <section class="hero is-fullheight">
    <div class="hero-body">

      <div class="container has-text-centered liturgy-list">
        <h1>Liturgy #{{ id }}</h1>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'LiturgyPage',
  data () {
    return {
      id: 0
    }
  },
  created () {
    this.id = this.$route.params.id
    console.log('id = ' + this.id)
  }
}
</script>

<style scoped>
/* Do it here INSTEAD of styling index.html with <html class="has-navbar-fixed-top"> */
.liturgy {
  padding-top: 5px;
}
</style>
