import firebase from 'firebase'
import config from './config.json'

// let firebase = require("firebase/app")
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebaseApp.firestore();

export const provider = new firebase.auth.FacebookAuthProvider();

//Should firebase functions be stored here or in a separate file?
// export const checkUserRoleHasAccessToRoute = (uid, route) => {

// }