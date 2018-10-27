import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import config from './FirebaseConfig'
const firebaseApp = firebase.initializeApp(config)

const firestore = firebaseApp.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)
const usersCollection = firestore.collection('users')
const publishersCollection = firestore.collection('publishers')
const choirsCollection = firestore.collection('choirs')
const liturgiesCollection = firestore.collection('liturgies')
const songsCollection = firestore.collection('songs')

const auth = firebase.auth()
const currentUser = auth.currentUser
const storage = firebase.storage()

export {
  firestore,
  auth,
  currentUser,
  usersCollection,
  publishersCollection,
  choirsCollection,
  liturgiesCollection,
  songsCollection,
  storage
}
