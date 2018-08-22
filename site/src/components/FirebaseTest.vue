<template>
    <div class="firebasetest">
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>
import db from './FirebaseInit'
console.log('db:' + db)

// write data
// db.collection('users').add({
//   first: 'Ada',
//   last: 'Lovelace',
//   born: 1815
// })
//   .then(function (docRef) {
//     console.log('Document written with ID: ', docRef.id)
//   })
//   .catch(function (error) {
//     console.error('Error adding document: ', error)
//   })

// read data
db.collection('users').get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} => ${doc.data().first} ${doc.data().last} born in ${doc.data().born}`)
  })
})

export default {
  name: 'FirebaseTest',
  data () {
    return {
      msg: 'Welcome to Firebase'
    }
  }
}

</script>

<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #31d48b;
}
</style>
