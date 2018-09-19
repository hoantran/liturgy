<template>
    <section class="hero is-fullheight">
  <div class="hero-body">

  <div class="container has-text-centered liturgy-list">
    <div class="has-text-centered">
      <div v-if="isLoading">
          <p >Waiting to acquire choir ID from the server ...</p>
          <a class="button is-info is-loading">Loading</a>
      </div>
      <div v-if="!isLoading && liturgies.length == 0">
        <a class="has-text-primary" href="#">
          <router-link :to="{name: 'populate'}">FLOCK choir not found. Wanna go the restroom?</router-link>
        </a>
      </div>
      <table v-if="liturgies.length" class="table is-responsive">
        <thead>
          <tr>
            <th>Date</th>
            <th>Liturgy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="liturgy in liturgies" :key="liturgy.id">
            <td>{{liturgy.date}}</td>
            <td>{{liturgy.title}}</td>
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
import { choirsCollection, liturgiesCollection } from '../../firebase/FirebaseInit'

export default {
  name: 'LiturgyListPage',
  data () {
    return {
      choir: '',
      liturgies: [],
      choirID: '',
      isLoading: true
    }
  },
  methods: {
    acquireLiturgyList (choirID) {
      liturgiesCollection.where('choirID', '==', choirID).get().then(docs => {
        let liturgyArray = []
        docs.forEach(doc => {
          let liturgy = doc.data()
          console.log(liturgy)
          liturgy.id = doc.id
          liturgyArray.push(liturgy)
        })
        this.liturgies = liturgyArray
      })
    }
  },
  created () {
    let choirID = this.$store.getters.choirID
    if (choirID) {
      this.isLoading = false
      this.acquireLiturgyList(choirID)
    } else {
      console.log('can not find choirID. looking for it...')
      choirsCollection.where('name', '==', 'FLOCK').limit(1).get().then(docs => {
        this.isLoading = false
        if (docs.size === 0) {
          console.log('server came back empty.')
        } else {
          docs.forEach(doc => {
            let choirID = doc.id
            console.log('got choirID: ' + choirID)
            this.$store.commit('setChoirID', choirID)
            this.acquireLiturgyList(choirID)
          })
        }
      }).catch(function (error) {
        console.error(error)
        console.log('Can NOT acquire choirID')
      })
    }
  }
}
</script>

<style scoped>
/* Do it here instead of styling index.html with <html class="has-navbar-fixed-top"> */
.liturgy-list {
  padding-top: 5px;
}
</style>
