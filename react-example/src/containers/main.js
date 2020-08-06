import React, { Component } from 'react'
import Table from '../components/Table'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import 'bulma/css/bulma.css'
import  { insufficientAccessWarning } from '../components/insufficient_access_warning.js'
import { checkUserRoleHasAccessToRoute } from '../firebase.js'

class Main extends Component {
    state = {
        characters: [],
        role: localStorage.getItem('userRole'),
        firebaseToken: localStorage.getItem('firebaseToken'),
        hasAccess: null

    }
    removeCharacter = (index) => {
        const { characters } = this.state

        this.setState({
            characters: characters.filter((character, i) => {
                return i !== index
            })
        })
    }

    //How does this spread operator work?
    handleSubmit = (character) => {
        this.setState({ characters: [...this.state.characters, character] })
    }

  //   componentDidMount() {
  //     console.log('1')
  //     checkUserRoleHasAccessToRoute(this.state.role, 'main').then(hasAccess => {
  //       this.setState({
  //         hasAccess: hasAccess
  //       })
  //     })//.catch(err) => {
  //      // this.setState({
  //      //   hasAccess: err
  //      // })
  //  //   }
  //     // console.log(this.state.hasAccess)
  //     // console.log('2')
  //   }

    //const { characters } = this.state === const characters = this.state.characters
    render() {
        console.log('rendering')
        const { characters } = this.state
        let contents = this.state.hasAccess === true ? <div><Table characterData={characters} removeCharacter={this.removeCharacter}/>
        <Form handleSubmit={this.handleSubmit}/> </div> : this.state.hasAccess === false ? insufficientAccessWarning() : <div>loading</div>

      return (
        <div className="container">
          {/* <NavBar /> */}
          <Table characterData={characters} removeCharacter={this.removeCharacter}/>
          <Form handleSubmit={this.handleSubmit}/>
          {/* <button onClick={() => console.log(this.state.role)}>Test</button> */}
        </div>
      )
    }

//filter does not mutate but rather creates a new array, preferred method for modifying arrays in javascript
//Note that in javascript, == does type coercion while === does not    
  }

export default Main