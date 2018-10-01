<template>
  <section class="section">
    <div class="container liturgy-list">
      <div v-if="isLoading" class="has-text-centered">
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
        <p >Waiting to acquire choir ID from the server ...</p>
        <a class="button is-info is-loading">Loading</a>
      </div>
      <div v-if="!isLoading && liturgies.length == 0" class="has-text-centered">
        <a class="has-text-primary" href="#">
        <router-link :to="{name: 'populate'}">FLOCK choir not found. Wanna go the restroom?</router-link>
        </a>
      </div>
      <div v-if="liturgies.length" class="columns is-centered">
      <table class="table is-responsive">
        <thead>
          <tr>
            <th>Date</th>
            <th>Liturgy</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="liturgy in liturgies" :key="liturgy.id" @click="selected(liturgy.id)">
              <!-- <router-link :to="{ name: 'liturgy', params: { id: liturgy.id }}"> -->
                <!-- <td><router-link :to="{ name: 'liturgy', params: { id: index }}">Sunday #{{index}} in Ordinary Time</router-link></td> -->
                <td>{{liturgy.date}}</td>
                <td>{{liturgy.title}}</td>
              <!-- </router-link> -->
            <!-- {{ shoppingItems[index].name }} - {{ shoppingItems[index].price }} -->
          </tr>
        </tbody>
      </table>
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
        this.liturgies = this.litSort(liturgyArray)
      })
    },
    litSort (litArray) {
      let finalSet = []
      if (Array.isArray(litArray) && litArray.length) {
        finalSet = litArray
        finalSet.sort((a, b) => {
          return a.date.seconds - b.date.seconds
        })
      }
      return finalSet
    },
    selected (liturgyID) {
      this.$router.push({ path: '/liturgy/' + liturgyID })
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
  padding-top: 25px;
}

tr:hover{
    background-color:rgb(255, 255, 239);
}
</style>
