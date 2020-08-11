import firebase from 'firebase';
import config from './config.json';

// let firebase = require("firebase/app")
const firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebaseApp.firestore();

export const provider = new firebase.auth.FacebookAuthProvider();

//should routes be stored as state so to decreaes RTT cost?
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

export const checkAccessableRoutes = (route) => {
    let routes = localStorage.getItem('accessableRoutes')
    if (routes.includes(route)) {
        return true
    } else {
        return false
    }
}

export const getUserRouteAccess = (role) => {
    return new Promise((resolve, reject) => {
        firestore.collection('roles').doc(role).get().then (snapshot => {
            let { routes } = snapshot.data()
            if (routes) {
                resolve(routes)
            } else {
                reject('Could not find role')
            }
        })
    })
}

export const isNewUser = (uid) => {
    return new Promise((resolve, reject) => {
        console.log(uid)

        firestore.collection('users').where('uid', '==', uid).get().then( snapshot => {
            //Ask Anh Hoan is this good approach?
            if (snapshot.docs[0]) {
                console.log('1')
                console.log(snapshot.docs[0].data())
                console.log(snapshot)
                resolve(false)
            } else {
                console.log(snapshot.docs[0])
                console.log(snapshot)
                console.log('sending true')
                resolve(true)
            }
        })
        
    })
}

export const getUserRole = (uid) => {
    return new Promise((resolve, reject) => {
        firestore.collection('users').where('uid', '==', uid).get().then( snapshot => {
            if (snapshot.docs[0]) { //user array destructure here to provie more meaning?
                resolve(snapshot.docs[0].data()['role'])
            } else {
                reject(Error)
            }
        })
    })
}

export const login = (component) => {
    let userData = null;
    let tokenId = null;
    let isNew = null;
    let userRole = null;
    let firebaseToken = null;
    let routes = null;

    auth.signInWithPopup(provider).then( async (result) => {
        console.log(result)
        console.log(result.credential);
        userData = result.user;
        tokenId = result.credential.accessToken;
        localStorage.setItem('firebaseToken', result.credential.accessToken);

        //tokenId is token to use with facebook api
        //firebaseToken is the jwt associated to the current user
        firebaseToken = await auth.currentUser.getIdToken();
        localStorage.setItem('firebaseToken', firebaseToken);
        //need to wait for isNewUser results before setState is executed
        console.log('uid is ' + userData.uid)
        isNew = await isNewUser(userData.uid)
        userRole = await getUserRole(userData.uid)
        localStorage.setItem('userRole', userRole);
        localStorage.setItem('authenticated', true);
        routes = await getUserRouteAccess(userRole)
        localStorage.setItem('accessableRoutes', routes)
        
        component.setState({
            authenticated: "true"
        })
    })
} 

export const logout = (component) => {
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
    localStorage.setItem('routes', null)
    console.log('logged out1')

    component.setState({
        authenticated: localStorage.getItem("authenticated")
    })
}
