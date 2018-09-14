import firebase from 'firebase/app'
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

const auth = firebase.auth()
const currentUser = auth.currentUser

export {
  firestore,
  auth,
  currentUser,
  usersCollection,
  publishersCollection,
  choirsCollection
}
