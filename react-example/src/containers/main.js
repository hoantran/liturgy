import React, { Component } from 'react'
import Table from '../components/Table'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import 'bulma/css/bulma.css'

class Main extends Component {
    state = {
        characters: [],
        role: this.props.location.role,
        firebaseToken: localStorage.getItem('firebaseToken')
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

    componentDidMount() {
      console.log('did mount')
      console.log(this.props.location)
    }

    //const { characters } = this.state === const characters = this.state.characters
    render() {
        console.log('rendering')
        console.log(this.props.location.props.role)
        const { characters } = this.state
      return (
        <div className="container">
          <NavBar />
          <Table characterData={characters} removeCharacter={this.removeCharacter}/>
          <Form handleSubmit={this.handleSubmit}/>
          <button onClick={() => console.log(this.state.role)}>Test</button>
          <div>From state {this.state.role}</div>
          <div>From props.location {this.props.location.props.role}</div>
          <div>FirebaseToken {this.state.firebaseToken}</div>
        </div>
      )
    }

//filter does not mutate but rather creates a new array, preferred method for modifying arrays in javascript
//Note that in javascript, == does type coercion while === does not    
  }

export default Main