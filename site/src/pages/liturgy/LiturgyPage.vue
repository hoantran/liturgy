<template>
  <section class="hero is-fullheight">
    <div class="hero-body">

      <div class="container has-text-centered liturgy-list">
        <h1 v-if="liturgyProfile">{{liturgyProfile.title}}</h1>
        <h3 v-if="liturgyProfile">{{liturgyProfile.date}}</h3>
      </div>

      <table v-if="parts.length" class="table is-responsive">
        <thead>
          <tr>
            <th>Title</th>
            <th>Song</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(part, index) in parts" :key="index">
                <td>{{part.title}}</td>
                <td>{{part.song.name}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script>
import { liturgiesCollection } from '../../firebase/FirebaseInit'

export default {
  name: 'LiturgyPage',
  data () {
    return {
      id: 0,
      liturgyProfile: null,
      parts: []
    }
  },
  methods: {
    getLiturgyProfile (liturgyID) {
      liturgiesCollection.doc(liturgyID).get().then(doc => {
        console.log(doc)
        if (doc.exists) {
          console.log('data: ', doc.data())
          this.liturgyProfile = doc.data()
          this.parts = this.getParts()
        } else {
          console.error('could not get liturgy data')
        }
      }).catch(error => {
        console.error(error)
      })
    },
    getParts () {
      return [
        {
          liturgy_id: this.id,
          section: 'Liturgy of the Word',
          title: 'Processional',
          song_id: 'song_id',
          song: {
            name: 'In This Place',
            composer: 'Thomson'
          }
        },
        {
          liturgy_id: this.id,
          section: 'Liturgy of the Word',
          title: 'Gloria',
          song_id: 'song_id',
          song: {
            name: 'Mass of St. Ann: Gloria To God',
            composer: 'Bolduc'
          }
        },
        {
          liturgy_id: this.id,
          section: 'Liturgy of the Eucharist',
          title: 'Prep. of the Lord\' Table',
          song_id: 'song_id',
          song: {
            name: 'Dâng Chúa Trời',
            composer: 'Phanxicô'
          }
        },
        {
          liturgy_id: this.id,
          section: 'Liturgy of the Eucharist',
          title: 'Communion',
          song_id: 'song_id',
          song: {
            name: 'You Are Mine',
            composer: 'David Haas'
          }
        }
      ]
    }
  },
  created () {
    this.id = this.$route.params.id
    console.log('id = ' + this.id)
    this.getLiturgyProfile(this.id)
  }
}
</script>

<style scoped>
/* Do it here INSTEAD of styling index.html with <html class="has-navbar-fixed-top"> */
.liturgy {
  padding-top: 5px;
}
</style>
