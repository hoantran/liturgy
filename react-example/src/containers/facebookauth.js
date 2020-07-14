import React, { Component } from 'react'
import config from '../config.json'

let firebase = require("firebase/app")
let firebaseConfig = config.firebaseConfig;

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

let provider = new firebase.auth.FacebookAuthProvider();
// firebase.auth().signInWithRedirect(provider);

class FacebookAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            token: null,
            isNewUser: null,
        }
        //Bind functions to this
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.isNewUser = this.isNewUser.bind(this);
    }

    isNewUser(uid) {
        return new Promise((resolve, reject) => {
            console.log(uid)

            db.collection('users').where('uid', '==', uid).get().then( snapshot => {
                if (snapshot.docs[0]) {
                    console.log(snapshot.docs[0])
                    console.log(snapshot)
                    resolve(false)
                } else {
                    console.log(snapshot.docs[0])
                    console.log(snapshot)
                    resolve(true)
                }
            })
            
        })
    }
    
    login() {
        let userData = null;
        let tokenId = null;
        let isNew = null;

        firebase.auth().signInWithPopup(provider).then( async (result) => {
            console.log(result)
            console.log(result.credential);
            userData = result.user;
            tokenId = result.credential.accessToken;
            //need to wait for isNewUser results before setState is executed
            console.log('uid is ' + userData.uid)
            isNew = await this.isNewUser(userData.uid)
          this.setState({
              user: result.user,
              token: result.credential.accessToken,
              isNewUser: isNew
          })
        })
        this.setState({
            user: userData,
            token: tokenId,
            isNewUser: isNew
        })
    } 

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            this.setState({
                user: user
            })
            console.log('3 from componenetDidMount')
            console.log(user)
          }
        })
      }    

    logout() {
        firebase.auth().signOut().then(() => {
            console.log('20')
            this.setState({
                user: null,
                token: null,
                isNewUser: null,
            })
        }).catch((error) => {
            console.log(error);
        })
    }

    render() {
        console.log('22')
        firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
              // This gives you a Facebook Access Token. You can use it to access the Facebook API.
              var token = result.credential.accessToken;
              // ...
            }
            // The signed-in user info.
            var user = result.user;
            console.log(user)
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
          });
        
        let controlButton = this.state.user ? <button className="button" onClick={ this.logout }>Logout</button>
          : <button className="button" onClick={ this.login }>Login</button>

        let displayName = this.state.user ? <p>{this.state.user.displayName}</p> : null
        let token = this.state.user ? <p>{this.state.token}</p> : null
        console.log('2')
        console.log(this.state.token)

        let contents = <div>{controlButton}
        </div>

        return <div>
            {controlButton}
            <Contents user={this.state.user} token={this.state.token} isNewUser={this.state.isNewUser}/>
            <button onClick={this.isNewUser}>test</button>
        </div>

    }
}

class Contents extends React.Component {
    render() {
        console.log('1')
        console.log(this.props.isNewUser)
        if (this.props.isNewUser) {
            return <div><h1>Seems you don't have access. Please request access.</h1></div>
        }

        else if (!this.props.isNewUser && this.props.user) {
            return <div>
                <h1>{this.props.isNewUser}</h1>
                <h1>Welcome, {this.props.user.displayName}!</h1>
                <p>Your token is {this.props.token}</p>
                <p>Your uid is {this.props.user.uid}</p>
            </div>
        }

        else {
            return (
                <div><h1>Please login</h1></div>
            )
        }
    }
}
export default FacebookAuth