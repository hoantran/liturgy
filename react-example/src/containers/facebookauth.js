import React, { Component } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import config from '../config.json'
import { 
    firestore, 
    auth, 
    provider,
    checkUserRoleHasAccessToRoute,
    isNewUser,
    getUserRole,
    login,
    logout } from '../firebase.js'

class FacebookAuth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authenticated: this.props.authenticated,
            role: null
        }
    }

    render() {    
        console.log('render fb auth')
        console.log(`auth is ${this.props.authenticated}`)
        let isAuthenticated = (this.props.authenticated || this.props.authenticated === "true") ? true : false   
        let controlButton = /*this.state.user &&*/ isAuthenticated ? <button className="button" onClick={ logout }>Logout</button>
          : <button className="button" onClick={ () => login(this.props.setAuthenticated, this.props.setRole) }>Login With Facebook Authentication</button>
        let contents = <div>{controlButton}
        </div>

        if (isAuthenticated) {
            console.log('auth true')
            return <Redirect to='/' />
        } else {
            console.log('auth false')
            return <div>
                <h1>Please login</h1>
                {controlButton}
            </div>
        }
    }
}

export default FacebookAuth