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

//Abstract components into their own files
//Note that below is JSX, which is indicative by className
//JSX is camelcase for methods and properties, so onclick will be onClick
class App extends Component {
  render() {
    return <Router>
    {/* <Routes> */}
    <Switch>
      {/* <Route path="/main" 
        render={props => (<Main {...props} role={this.state.role}/>)
        } /> */}
      <Route path="/main" component={Main} />
      <Route path="/jaqjaq" render={props => (
        <JaqJaqList role={this.state.role}/>)
        }/>
      <Route path="/engagement" component={EngagementPhotos} />
      <Route exact path="/" component={FacebookAuth} />
      <Route path="/user-details" component={UserDetails} />
    </Switch>
    {/* </Routes> */}
  </Router>
  }

}

export default App

