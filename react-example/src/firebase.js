import firebase from 'firebase';
import config from './config.json';

// let firebase = require("firebase/app")
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebaseApp.firestore();

export const provider = new firebase.auth.FacebookAuthProvider();

//Should firebase functions be stored here or in a separate file?
export const checkUserRoleHasAccessToRoute = (role, route) => {
    return new Promise((resolve, reject) => {
        console.log(role)
        firestore.collection('roles').doc(role).get().then( snapshot => {
            let { routes } = snapshot.data()
            // console.log(typeof routes)
            // console.log(routes)
            if (routes.includes(route)) {
                console.log('true')
                resolve(true)
            }
            else {
                console.log('false')
                resolve(false)
            }
        })
    })
}
