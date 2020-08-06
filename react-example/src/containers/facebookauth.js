import React, { Component } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import config from '../config.json'
import { 
    firestore, 
    auth, 
    provider,
    checkUserRoleHasAccessToRoute,
    logout } from '../firebase.js'

class FacebookAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            token: null,
            isNewUser: null,
            authenticated: false,
            role: null
        }
        //Bind functions to this
        this.login = this.login.bind(this);
        // this.logout = this.logout.bind(this);
        this.isNewUser = this.isNewUser.bind(this);
        // this.enterSite = this.enterSite.bind(this);
        this.getUserRole = this.getUserRole.bind(this);
    }

    isNewUser(uid) {
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

    getUserRole(uid) {
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
    
    login() {
        let userData = null;
        let tokenId = null;
        let isNew = null;
        let userRole = null;
        let firebaseToken = null;

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
            isNew = await this.isNewUser(userData.uid)
            userRole = await this.getUserRole(userData.uid)
            localStorage.setItem('userRole', userRole);
            localStorage.setItem('authenticated', true);
            

          this.setState({
              user: result.user,
              token: tokenId,
              isNewUser: isNew,
              authenticated: true,
              role: userRole
          })
        })
    } 

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
          if (user) {
            this.setState({
                user: user
            })
            console.log('3 from componenetDidMount')
            console.log(user)
          }
        })
      }    

    // enterSite() {
    //     if (this.state.authenticated && this.state.isNewUser == false) {
    //         console.log('role is ' + this.state.role)
    //         return (
    //             <div>
    //                 <button>
    //                     {/* inline style is uses double curly braces, outer braces for javascript, inner brace denotes object */}
    //                     <Link style={{color:"white"}} 
    //                         to={{
    //                             pathname: "/main",
    //                             props: {
    //                                 role: this.state.role
    //                             }
    //                         }}>
    //                         Enter Site
    //                     </Link>
    //                 </button>
    //             </div>
    //             // <div>
    //             //     <button>Enter</button>
    //             // </div>
    //         )
    //     }
    // }

    render() {       
        let controlButton = this.state.user && this.state.authenticated ? <button className="button" onClick={ this.logout }>Logout</button>
          : <button className="button" onClick={ this.login }>Login With Facebook Authentication</button>
        let displayName = this.state.user ? <p>{this.state.user.displayName}</p> : null
        let token = this.state.user ? <p>{this.state.token}</p> : null
        let contents = <div>{controlButton}
        </div>

        if (localStorage.getItem("authenticated") === "true") {
            console.log('auth true')
            return <Redirect to='/' />
        } else {
            console.log('auth false')
            return <div>
                <h1>Please login</h1>
                {controlButton}
            </div>
        }
        // return <div>
        //     <Contents user={this.state.user} token={this.state.token} isNewUser={this.state.isNewUser}/>
        //     {controlButton}
        //     {/* <button onClick={this.isNewUser}>Enter</button> */}
        //     {/* {this.enterSite()} */}
        // </div>

    }
}

class Contents extends React.Component {
    render() {
        console.log(this.props.isNewUser)
        if (this.props.isNewUser) {
            return <div><h1>Seems you don't have access. Please request access.</h1></div>
        }

        else if (this.props.isNewUser == false && this.props.user) {
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