import firebase from 'firebase/app'
import 'firebase/firestore'
import firebaseConfig from './FirebaseConfig'
console.log('config: ' + firebaseConfig)
console.log('projectid = ' + firebaseConfig.projectId)
const firebaseApp = firebase.initializeApp(firebaseConfig)
console.log('app: ' + firebaseApp)
console.log(firebaseApp.name)

const firestore = firebaseApp.firestore()
const settings = {timestampsInSnapshots: true}
firestore.settings(settings)
export default firestore
