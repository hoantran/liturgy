<template>
  <section class="section">
      <div class="container has-text-left liturgy">
        <div v-if="liturgyProfile" class="has-text-white-ter is-size-2">{{liturgyProfile.title}}</div>
        <div v-if="liturgyProfile" class="has-text-white-ter is-size-5">{{liturgyProfile.date}}</div>
      </div>
      <div v-if="parts.length" class="container">
        <table class="table is-responsive table-full">
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
  background-color: rgb(168, 168, 168);
}
.table-full {
    flex: none;
    width: 100%;
    text-align: center;
}
</style>
