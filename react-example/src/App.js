import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom'
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

// var firebase = require("firease/app")
// require("firebase/auth")
// require("firebase/firestore")



// var firebaseConfig = {
//   apiKey: "AIzaSyC5aPWQBNHfqDyjCErWi5emHKynTmRbSOA",
//   authDomain: "tonypham-97baf.firebaseapp.com",
//   databaseURL: "https://tonypham-97baf.firebaseio.com",
//   projectId: "tonypham-97baf",
//   storageBucket: "tonypham-97baf.appspot.com",
//   messagingSenderId: "618558281718",
//   appId: "1:618558281718:web:828aaf044021ef447c19d7"
// };

//Abstract components into their own files
//Note that below is JSX, which is indicative by className
//JSX is camelcase for methods and properties, so onclick will be onClick
export default function App() {
  return <Router>
    {/* <Routes> */}
      {/* <Route path="/login" component={Login} /> */}
      <Route path="/main" component={Main} />
      {/* <Route path="/cloy" component={CloyList} /> */}
      <Route path="/jaqjaq" component={JaqJaqList} />
      <Route path="/engagement" component={EngagementPhotos} />
      <Route path="/facebookAuth" component={FacebookAuth} />
      <Route path="/user-details" component={UserDetails} />
    {/* </Routes> */}
  </Router>
}

