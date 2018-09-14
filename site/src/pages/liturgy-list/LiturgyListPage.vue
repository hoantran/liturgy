<template>
    <section class="hero is-fullheight">
  <div class="hero-body">

  <div class="container has-text-centered liturgy-list">
    <div class="has-text-centered">
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
import { choirsCollection } from '../../firebase/FirebaseInit'

// // adding a choir
// choirsCollection.add({
//   name: 'Faith',
//   parish: 'St. Elizabeth of Portugal',
//   mass: 'Sundays 9:30 AM'
// }).then(function (docRef) {
//   console.log('choir written with ID: ', docRef.id)
// }).catch(function (error) {
//   console.error('Error adding choir: ', error)
// })

export default {
  name: 'LiturgyListPage',
  data () {
    return {
      choir: '',
      liturgies: [],
      choirID: ''
    }
  },
  created () {
    choirsCollection.where('name', '==', 'FLOCK').limit(1).get().then(docs => {
      docs.forEach(doc => {
        this.choirID = doc.id
        choirsCollection.doc(this.choirID).collection('liturgies').add({
          createdOn: new Date(),
          title: 'Twenty-fifth Sunday in Ordinary Time',
          date: new Date(2018, 9, 23)
        })

        let liturgyArray = []
        choirsCollection.doc(this.choirID).collection('liturgies').get().then(docs => {
          docs.forEach(doc => {
            let liturgy = doc.data()
            console.log(liturgy)
            liturgy.id = doc.id
            liturgyArray.push(liturgy)
          })
          this.liturgies = liturgyArray
        })
      })
    })
  }
}
</script>

<style scoped>
/* Do it here instead of styling index.html with <html class="has-navbar-fixed-top"> */
.liturgy-list {
  padding-top: 5px;
}
</style>
