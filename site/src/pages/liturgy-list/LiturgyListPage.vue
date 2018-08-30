<template>
    <section class="hero is-fullheight">
  <div class="hero-body">

  <div class="container has-text-centered liturgy-list">
    <div class="has-text-centered">
      <table class="table is-responsive">
        <thead>
          <tr>
            <th>Date</th>
            <th>Liturgy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="index in 20" :key="index">
            <td>Sun Sept 2, 2018</td>
            <td><router-link :to="{ name: 'liturgy', params: { id: index }}">Sunday #{{index}} in Ordinary Time</router-link></td>
            <!-- {{ shoppingItems[index].name }} - {{ shoppingItems[index].price }} -->
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  </div>
  </section>
</template>
<script>
export default {
  name: 'LiturgyListPage'
}
</script>

<style scoped>
/* Do it here instead of styling index.html with <html class="has-navbar-fixed-top"> */
.liturgy-list {
  padding-top: 5px;
}
</style>
