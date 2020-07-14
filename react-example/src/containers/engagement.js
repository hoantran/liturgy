import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Table from '../components/Table'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import 'bulma/css/bulma.css'
import beach1 from '../assets/beach1.jpg'
import beach2 from '../assets/beach2.jpg'
import hall1 from '../assets/hall1.jpg'
import hall2 from '../assets/hall2.jpg'
import hall3 from '../assets/hall3.jpg'
import trees1 from '../assets/trees1.jpg'

class EngagementPhotos extends Component {
    render() {
        return <div className="container">
            <NavBar />
            <div class="columns padding-top">
                <div class="column">
                    <ul><img className="photo" src={beach1} /></ul>
                    <ul><img className="photo" src={beach2} /></ul>
                </div>
                <div class="column">
                    <ul><img className="photo" src={hall1} /></ul>
                    <ul><img className="photo" src={hall2} /></ul>
                    <ul><img className="photo" src={hall3} /></ul>
                </div>
                <div class="column">
                    <ul><img className="photo" src={trees1} /></ul>
                </div>
            </div>
        </div>
    }
}

export default EngagementPhotos