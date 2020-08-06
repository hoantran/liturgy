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

export const logout = () => {
    auth.signOut().then(() => {
        // this.setState({
        //     user: null,
        //     token: null,
        //     isNewUser: null,
        //     authenticated: false
        // })
    }).catch((error) => {
        console.log(error);
    })
    localStorage.setItem('authenticated', false);
    localStorage.setItem('firebaseToken', null);
    localStorage.setItem('userRole', null);
    console.log('logged out1')
}
