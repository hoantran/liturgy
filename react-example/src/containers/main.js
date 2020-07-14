import React, { Component } from 'react'
// import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Table from '../components/Table'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import 'bulma/css/bulma.css'

class Main extends Component {
    state = {
        characters: []
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

    //Ask Anh Hoan about { characters } and this.removeCharacter
    //const { characters } = this.state === const characters = this.state.characters
    render() {
        const { characters } = this.state

      return (
        <div className="container">
          <NavBar />
          <Table characterData={characters} removeCharacter={this.removeCharacter}/>
          <Form handleSubmit={this.handleSubmit}/>
        </div>
      )
    }

//filter does not mutate but rather creates a new array, preferred method for modifying arrays in javascript
//Note that in javascript, == does type coercion while === does not    
  }

export default Main