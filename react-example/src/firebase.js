import firebase from 'firebase'
import config from './config.json'

let firebase = require("firebase/app")
let firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

let provider = new firebase.auth.FacebookAuthProvider();