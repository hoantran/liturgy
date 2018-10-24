<template>
  <section class="section">
      <div class="container top-spacer">
      </div>
      <div class="container has-text-left">
        <div v-if="liturgyProfile" class="lineup-liturgy-title">{{liturgyProfile.title}}</div>
        <div v-if="liturgyProfile" class="lineup-liturgy-date">{{liturgyProfile.date}}</div>
      </div>
      <div v-if="parts.length" class="container">
        <div class="lineup-panel">Order of Music</div>
        <div class="la-full-width section-border">
          <br>
          <div v-for="(part, index) in parts" :key="index">
            <div id="parentRow" class="highlight-hover columns lineup-part-row" @click.stop.prevent="songClicked">
              <div class="column is-two-fifths lineup-column">{{part.title}}</div>
              <div class="column is-three-fifths lineup-column">
                <span class="lineup-song-title">{{part.song.name}}</span>
                <span class="lineup-song-composer">composer</span>
              </div>
            </div>
            <div class="columns media-hidden media">
              <div class="column is-three-fifths is-offset-two-fifths">
                <div v-if="part.media">
                  <mediapane
                    v-for="(medium, index) in part.media"
                    v-bind:key="index"
                    v-bind:medium="medium"
                  ></mediapane>
                </div>
              </div>
            </div>
          </div>
          <br>
        </div>
      </div>
  </section>
</template>

<script>
import { liturgiesCollection } from '../../firebase/FirebaseInit'
import Medium from '@/pages/liturgy/Medium'

export default {
  name: 'LiturgyPage',
  components: {
    mediapane: Medium
  },
  data () {
    return {
      id: 0,
      liturgyProfile: null,
      parts: []
    }
  },
  methods: {
    songClicked (event) {
      if (event) {
        let mediaEl = event.currentTarget.nextElementSibling
        console.log(mediaEl)
        if (mediaEl.classList.contains('media-shown')) {
          mediaEl.classList.remove('media-shown')
          mediaEl.classList.add('media-hidden')
        } else {
          mediaEl.classList.remove('media-hidden')
          mediaEl.classList.add('media-shown')
        }
      }
    },
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
          },
          media: [
            { id: 1, type: 'guitar', url: 'http://google.com' },
            { id: 2, type: 'piano', url: 'http://google.com' },
            { id: 3, type: 'sound', url: 'http://google.com' },
            { id: 4, type: 'vocal', url: 'http://google.com' },
            { id: 5, type: 'link', url: 'http://google.com' }
          ]
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
.la-fullwidth {
    flex: none;
    width: 100%;
}

.table-borderless tbody tr td,
.table-borderless tbody tr th {
    border: 0;
}

.calendar-lineup {
    font-size: medium;
}

.lineup-liturgy-title {
    font-size: xx-large;
    padding: 20px 0;
    background: #b7b7b7;
    color: white;
}

.lineup-liturgy-date {
    font-size: small;
    font-weight: bold;
    padding: 7px 0;
}

.lineup-panel {
    padding: 5px 0;
    border-bottom: thin solid black;
}
.lineup-song-title {
    font-size: large;
}

.lineup-song-composer {
    font-size: small;
    color: #9e9e9e;
    padding: 0 10px;
}
.lineup-part-row {
  /* margin-top: 0rem; */
  margin-bottom: 0rem;
}
.lineup-column {
  padding: 8px;
}

.section-border {
    border-bottom: thin solid #d6d6d6;
    margin-bottom: 5px;
}

.highlight-hover:hover {
    background-color: #efefef;
    cursor: pointer;
}

.top-spacer {
    height: 10px;
}

.media-hidden {
  display: none;
}

.media-shown {
  display: '';
}

.media {
  height: 60px;
  vertical-align: top;
  margin-right: 0px;
  margin-left: -15px;
}
</style>
