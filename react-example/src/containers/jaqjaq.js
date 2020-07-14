import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Table from '../components/Table'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import 'bulma/css/bulma.css'
import jj1 from '../assets/jj1.jpg'
import jj2 from '../assets/jj2.jpg'
import jj3 from '../assets/jj3.jpg'

import "../index.css"

//why don't I need let here??
class JaqJaqList extends Component {
    data = {
        'img1': jj1,
        'img2': jj2,
        'img3': jj3,
    }

    render() {
        return <div className="container">
            <NavBar />
            {/* <sizedImage image={jj1}/> */}
            <ul><img className="photo" src={this.data['img1']} /></ul>
            <ul><img className="photo" src={this.data['img2']} /></ul>
            <ul><img className="photo" src={this.data['img3']} /></ul>
        </div>
    }
}

function sizedImage(props) {
    return <img src={props.image} />
}

export default JaqJaqList

