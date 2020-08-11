import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from 'react-router-dom'
import Main from './containers/main'
import JaqJaqList from './containers/jaqjaq'
import EngagementPhotos from './containers/engagement'
import FacebookAuth from './containers/facebookauth'
import UserDetails from './containers/userdetails'
import 'bulma/css/bulma.css'
import NavBar from './components/NavBar'
import { ProtectedRoute } from './components/protected_route'

//Abstract components into their own files
//Note that below is JSX, which is indicative by className
//JSX is camelcase for methods and properties, so onclick will be onClick

function Application() {
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
          <ProtectedRoute path="/jaqjaq" component={JaqJaqList}/>
          <ProtectedRoute path="/engagement" component={EngagementPhotos} />
          <Route path="/login" component={FacebookAuth} />
          <Route path="/user-details" component={UserDetails} />
        </Switch>
        {/* </Routes> */}
      </Router>
    // : <FacebookAuth />
  )
}

export default Application

