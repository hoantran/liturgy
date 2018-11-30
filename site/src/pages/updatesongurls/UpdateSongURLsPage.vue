<template>
  <section class="container">
    <div class="uploadsongurls">
        <h1 class="title is-4">Update Song URLs to Download URLs</h1>
        <p class="log-msg" v-for="(text, index) in area_texts" :key="index"> {{ text }} </p>
    </div>
  </section>
</template>

<script>
import { songsCollection, storage } from '../../firebase/FirebaseInit'

export default {
  name: 'UpdateSongURLsPage',
  data () {
    return {
      area_texts: []
    }
  },
  created () {
    // console.log(utils.mediumType('vocal'))
    try {
      this.update()
    } catch (err) {
      console.log('Error getting documents', err)
    }
  },
  methods: {
    isLink (url) {
      const httpPattern = /^https?:\/\//
      if (httpPattern.test(url)) {
        return true
      } else {
        return false
      }
    },
    async update () {
      try {
        let songsRef = await songsCollection.get()
        let docs = songsRef.docs
        docs.forEach(async songDoc => {
          let song = songDoc.data()
          let title = song.title
          if (!title) {
            title = 'NO TITLE'
          }
          title = title.slice(0, 31).padEnd(31, '.')
          let media = song.media
          let dirty = false
          if (media) {
            for (const [index, medium] of media.entries()) {
              let url = medium.url
              if (url && !this.isLink(url)) {
                try {
                  const pathReference = storage.ref(url)
                  let newURL = await pathReference.getDownloadURL()
                  if (newURL) {
                    media[index].url = newURL
                    dirty = true
                    this.area_texts.push('---   ' + `[${title}][QUEUED UP] [${medium.type.padEnd(7, '.')}] ${newURL.slice(70, 145)}`)
                  }
                } catch (error) {
                  //   // A full list of error codes is available at
                  //   // https://firebase.google.com/docs/storage/web/handle-errors
                  this.area_texts.push('---   ' + `[${title}][ CAN NOT GENERATE URL ] [${error.code.slice(0, 25)}] ${url.slice(71, 115)}`)
                }
              }
            }
            if (dirty) {
              // [1] https://firebase.google.com/docs/reference/js/firebase.firestore.QueryDocumentSnapshot
              // [2] https://cloud.google.com/nodejs/docs/reference/firestore/0.17.x/QueryDocumentSnapshot#ref
              // why [1] is incomplete, not mentioning about ref and other attributes of QueryDocumentSnapshot ?
              // console.log('REF: ', songDoc.ref)
              // console.log('PATH: ', songDoc.ref.path)
              await songDoc.ref.update({media: media})
              this.area_texts.push('---   ' + `[${title}][UPDATED .]`)
            } else {
              this.area_texts.push('---   ' + `[${title}][NOTHING TO UPDATE]`)
            }
          } else {
            this.area_texts.push('---' + `   [${title}][NO MEDIA ]`)
          }
        })
      } catch (error) {
        console.error('Encountered problem while updating song URLs', error)
      }
    }
  }

}
</script>

<style scoped>
.uploadsongurls {
  padding-top: 70px;
  background-color: rgb(249, 248, 227);
}
.status {
  width: 100%;
  border: none;
  margin: 5px 0;
  padding: 3px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  font-family: 'Arial', Arial, sans-serif;
  font-size: 18px;
}
.log-msg {
  font-family: monospace;
}
</style>
