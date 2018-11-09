<template>
  <section class="container">
    <div class="uploadsongurls">
        <h1 class="title is-4">Update Song URLs to Download URLs</h1>
        <p v-for="(text, index) in area_texts" :key="index"> {{ text }} </p>

        <!-- <textarea class="status" name="status"
                  rows="20" readonly
                  wrap="hard">
        </textarea>
         -->
    </div>
  </section>
</template>

<script>
import { songsCollection, storage } from '../../firebase/FirebaseInit'

// const pathReference = storage.ref('ps 126 the lord has done/ps 126 the lord has done great things for us.vocal.1.pdf')
// console.log('PDF', pathReference)
// pathReference.getDownloadURL().then((url) => {
//   console.log('URL', url)
// }).catch((error) => {
//   // A full list of error codes is available at
//   // https://firebase.google.com/docs/storage/web/handle-errors
//   switch (error.code) {
//     case 'storage/object-not-found':
//       // File doesn't exist
//       console.log('storage/object-not-found')
//       break

//     case 'storage/unauthorized':
//       // User doesn't have permission to access the object
//       console.log('storage/unauthorized')
//       break

//     case 'storage/canceled':
//       // User canceled the upload
//       console.log('storage/canceled')
//       break

//     case 'storage/unknown':
//       // Unknown error occurred, inspect the server response
//       console.log('storage/unknown')
//       break
//   }
// })

export default {
  name: 'UpdateSongURLsPage',
  data () {
    return {
      area_texts: []
    }
  },
  created () {
    this.area_texts.push('Getting a song list ...')
    // this.getX()
    try {
      this.getSongs()
    } catch (err) {
      console.log('Error getting documents', err)
    }
  },
  methods: {
    getX () {
      songsCollection
        .get()
        .then(docs => {
          if (docs.size === 0) {
            console.log('server came back empty.')
          } else {
            docs.forEach(doc => {
              let myID = doc.id
              console.log('got my ID: ' + myID)
            })
          }
        })
        .catch(function (error) {
          console.error(error)
          console.log('Can NOT acquire myID')
        })
    },
    isLink (url) {
      const httpPattern = /^https?:\/\//
      if (httpPattern.test(url)) {
        return true
      } else {
        return false
      }
    },
    async getSongs () {
      try {
        let songsRef = await songsCollection.get()
        let docs = songsRef.docs
        docs.forEach(async songDoc => {
          let song = songDoc.data()
          let status = 'UNDETECTED '
          // let status = 'UPDATED    '
          // let status = 'DONE       '
          let paths = song.urls
          if (paths) {
            let urls = []
            let msgs = []
            for (let urlProperty of paths) {
              if (this.isLink(urlProperty)) {
                status = 'DONE       '
                urls.push(urlProperty)
              } else {
                try {
                  const pathReference = storage.ref(urlProperty)
                  let url = await pathReference.getDownloadURL()
                  urls.push(url)
                  // console.log(url)
                  // await songDoc.ref.update({url: url})
                  status = 'UPDATED    '
                  // [1] https://firebase.google.com/docs/reference/js/firebase.firestore.QueryDocumentSnapshot
                  // [2] https://cloud.google.com/nodejs/docs/reference/firestore/0.17.x/QueryDocumentSnapshot#ref
                  // why [1] is incomplete, not mentioning about ref and other attributes of QueryDocumentSnapshot ?
                  // console.log('REF: ', songDoc.ref)
                  // console.log('PATH: ', songDoc.ref.path)
                } catch (urlError) {
                  status = 'UNDETECTED '
                  urls.push(urlProperty)
                }
              }
              // this.area_texts.push('---' + `   [${status}] ${song.title} [${urlProperty}]`)
              msgs.push('---' + `   [${status}] ${song.title} [...${urlProperty.slice(-50, -1)}]`)
            }
            await songDoc.ref.update({urls: urls})
            // Array.prototype.push.apply(this.area_texts, msgs)
            for (let msg of msgs) {
              this.area_texts.push(msg)
            }
          } else {
            this.area_texts.push('---' + `   [${status}] ${song.title} [${paths}]`)
          }
        })
        this.area_texts.push('END')
      } catch (error) {
        console.error('Encountered problem while updating song URLs', error)
      }
      // for (let doc in songsRef.docs) {
      //   console.log(doc)
      // }
      // for (QueryDocumentSnapshot of songsRef.docs) {
      //   console.log(song)
      // //   // let tasksRef = await campaignsRef.doc(campaign.id).collection('tasks').get()
      // //   // for(task of tasksRef.docs) {
      // //   //     console.log(task.id, task.data())
      // //   // }
      // }
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
</style>
