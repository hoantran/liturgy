<template>
  <section class="hero is-fullheight">
    <div class="hero-body">

      <div class="container has-text-centered">
        <h1>Peeing in the Gene Pool</h1>
        <p>Populate database with sample data</p>
        <br>
        <transition name="fade">
          <div v-if="!gotChoirID">
              <p >Waiting to acquire choir ID from the server ...</p>
              <a class="button is-info is-loading">Loading</a>
          </div>
          <div v-if="!isPopulated && !hasError && gotChoirID">
            <p>Before populating the data, please delete these collections below from your Firestore console. </p>
            <p>Click on the button when done.</p>
            <div class="content">
            <ol>
                <li>choirs</li>
                <li>liturgies</li>
                <li>songs</li>
            </ol>
            </div>
            <button class="button is-info is-large is-centered" @click="populate">Populate</button>
          </div>
          <div v-if="isPopulated && !hasError" class="notification is-success">
            <p>Data populated.</p>
            <a class="has-text-grey" href="#">
              <router-link :to="{name: 'index'}">Go to main page</router-link>
            </a>
          </div>
          <div v-if="hasError" class="notification is-danger">
            <p>Encountered problem when populating data</p>
            <p>Check browser's console for error messages</p>
          </div>
        </transition>
      </div>

    </div>
  </section>
</template>

<script>
import { choirsCollection, liturgiesCollection, songsCollection } from '../../firebase/FirebaseInit'
export default {
  name: 'PopulatePage',
  data () {
    return {
      isPopulated: false,
      hasError: false,
      gotChoirID: false
    }
  },
  created () {
    this.populateCollection(choirsCollection, 'choir', this.getChoirs())
    choirsCollection.where('name', '==', 'FLOCK').limit(1).get().then(docs => {
      console.log('created')
      docs.forEach(doc => {
        console.log('acquired: ' + doc.id)
        this.$store.commit('setChoirID', doc.id)
        console.log('double check: ' + this.$store.getters.choirID)
        this.gotChoirID = true
      })
    }).catch(function (error) {
      console.error(error)
    })
  },
  methods: {
    // delete all existing data: prompting user to do that instead, because
    // it is not recommended to delete collection from web client: https://firebase.google.com/docs/firestore/manage-data/delete-data
    populate () {
      this.hasError = false
      this.populateCollection(liturgiesCollection, 'liturgy', this.getLiturgies(this.$store.getters.choirID))
      this.populateCollection(songsCollection, 'song', this.getSongs())
      this.isPopulated = !this.hasError
    },
    populateCollection: function (collection, name, set) {
      try {
        set.forEach(doc => {
          collection.add(doc).then(function (docRef) {
            console.log(name + ' written with ID: ', docRef.id)
          }).catch(function (error) {
            console.error('Error adding ' + name + ': ', error)
            this.hasError = true
          })
        })
      } catch (error) {
        console.error(error)
        this.hasError = true
      }
    },
    getChoirs () {
      return [
        {
          name: 'Faith',
          parish: 'St. Elizabeth of Portugal',
          mass: 'Sundays 9:30 AM'
        },
        {
          name: 'FLOCK',
          parish: 'Nuestra Senora de Lavang',
          mass: 'Sundays 8:30 PM'
        }
      ]
    },
    getLiturgies (choirID) {
      console.log('lit: ' + choirID)
      return [
        {
          choirID: choirID,
          createdOn: new Date(),
          title: 'Twenty-Fifth Sunday in Ordinary Time',
          date: new Date(2018, 9, 23)
        },
        {
          choirID: choirID,
          createdOn: new Date(),
          title: 'Twenty-Sixth Sunday in Ordinary Time',
          date: new Date(2018, 9, 30)
        },
        {
          choirID: choirID,
          createdOn: new Date(),
          title: 'Twenty-Seventh Sunday in Ordinary Time',
          date: new Date(2018, 10, 7)
        },
        {
          choirID: choirID,
          createdOn: new Date(),
          title: 'Twenty-Eigth Sunday in Ordinary Time',
          date: new Date(2018, 10, 14)
        }
      ]
    },
    getSongs () {
      return [
        {
          title: 'Mack The Knife',
          by: 'Bobby Darin',
          firstLines: 'Oh, the shark, babe, has such teeth, dear'
        },
        {
          title: 'How Do I Live',
          by: 'LeAnn Rimes',
          mass: 'How do I live without you?'
        }
      ]
    }
  }
}
</script>

<style scoped>
</style>
          createdOn: new Date(),
