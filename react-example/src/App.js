import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from 'react-router-dom'
import firebase from 'firebase'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import Table from './components/Table'
import Form from './components/Form'
import Main from './containers/main'
// import Login from './containers/login'
import JaqJaqList from './containers/jaqjaq'
import EngagementPhotos from './containers/engagement'
import FacebookAuth from './containers/facebookauth'
import UserDetails from './containers/userdetails'
import 'bulma/css/bulma.css'
import NavBar from './components/NavBar'

//Abstract components into their own files
//Note that below is JSX, which is indicative by className
//JSX is camelcase for methods and properties, so onclick will be onClick

function Application() {
  const user = false;

  return (
      // user ?
      <Router>
        <NavBar />
        {/* <Routes> */}
        <Switch>
          {/* <Route path="/main" 
            render={props => (<Main {...props} role={this.state.role}/>)
            } /> */}
          <Route exact path="/" component={Main} />
          <Route path="/jaqjaq" component={JaqJaqList}/>
          <Route path="/engagement" component={EngagementPhotos} />
          <Route path="/login" component={FacebookAuth} />
          <Route path="/user-details" component={UserDetails} />
        </Switch>
        {/* </Routes> */}
      </Router>
    // : <FacebookAuth />
  )
}


export default Application

