import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Switch, Redirect } from 'react-router-dom'
import Main from './containers/main'
import JaqJaqList from './containers/jaqjaq'
import EngagementPhotos from './containers/engagement'
import FacebookAuth from './containers/facebookauth'
import UserDetails from './containers/userdetails'
import { Forbidden403 } from './components/forbidden_403'
import 'bulma/css/bulma.css'
import NavBar from './components/NavBar'
import { ProtectedRoute } from './components/protected_route'

function Application() {
  let [ authenticated, setAuthenticated ] = useState(localStorage.getItem("authenticated") ==="true" ? true : false);
  let [ role, setRole ] = useState(localStorage.getItem("role") ? localStorage.getItem("role") : "anonymous");

  function updateRole(newValue) {
    setRole(newValue);
  }
  const updateAuthentication = (newValue) => {
    setAuthenticated(newValue);
  }

  console.log('render Application')
  console.log(`auth is ${authenticated}`)

  return (
      <Router>
        <NavBar 
          authenticated={authenticated} 
          setAuthenticated={setAuthenticated} 
          setRole={setRole}/>
        {/* <Routes> */}
        <Switch>
          {/* <Route path="/main" 
            render={props => (<Main {...props} role={this.state.role}/>)
            } /> */}
          <Route exact path="/" component={Main} />
          <ProtectedRoute path="/jaqjaq" component={JaqJaqList}/>
          <ProtectedRoute path="/engagement" component={EngagementPhotos} />
          {/* <Route path="/login" component={FacebookAuth} /> */}
          <Route path="/login" render={(props) => <FacebookAuth 
            {...props} 
            setAuthenticated={setAuthenticated} 
            authenticated={authenticated} 
            setRole={setRole}/>}></Route>
          <Route path="/user-details" component={UserDetails} />
          <Route path="/403" component={Forbidden403} />
        </Switch>
        {/* </Routes> */}
      </Router>
    // : <FacebookAuth />
  )
}

export default Application

