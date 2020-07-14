import React, { Component } from 'react'
import firebase from 'firebase'
// import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import 'bulma/css/bulma.css'

firebase.initializeApp({
    apiKey: "AIzaSyC5aPWQBNHfqDyjCErWi5emHKynTmRbSOA",
    authDomain: "tonypham-97baf.firebaseapp.com"
})

class Login extends Component {
    state={isSignedIn: false}
 
    uiConfig = {
        // Popup signin flow rather than redirect flow.
        signInFlow: 'popup',
        // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
        signInSuccessUrl: '/main',
        // We will display Google and Facebook as auth providers.
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ]
    };
    
    componentDidMount = () => {
        firebase.auth().onAuthStateChanged(user => {
            this.setState({isSignedIn: !!user})
        })
    }

    render() {
        return <div className="container">
            {this.state.isSignedIn ? ( 
            <div>Signed In! </div> 
            ) :
            ( <StyledFirebaseAuth
                uiConfig={this.uiConfig}
                firebaseAuth={firebase.auth()}
                />
            )}
        </div>
    }
}

export default Login