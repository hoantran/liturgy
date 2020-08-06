import React, { Component } from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Table from '../components/Table'
import Form from '../components/Form'
import NavBar from '../components/NavBar'
import 'bulma/css/bulma.css'
import jj1 from '../assets/jj1.jpg'
import jj2 from '../assets/jj2.jpg'
import jj3 from '../assets/jj3.jpg'
import { firestore, auth, provider } from '../firebase.js'
import { checkUserRoleHasAccessToRoute } from '../firebase.js'
import "../index.css"
import { insufficientAccessWarning } from '../components/insufficient_access_warning'

//why don't I need let here??
class JaqJaqList extends Component {
    state = {
        role: localStorage.getItem('userRole'),
        firebaseToken: localStorage.getItem('firebaseToken'),
        hasAccess: null
    }

    data = {
        'img1': jj1,
        'img2': jj2,
        'img3': jj3,
    }

    componentDidMount() {
        checkUserRoleHasAccessToRoute(this.state.role, 'jaqjaq').then(hasAccess => {
            this.setState({
                hasAccess: hasAccess
            })
        })
    }
    render() {
        let contents = this.state.hasAccess === true ? <div>            <ul><img className="photo" src={this.data['img1']} /></ul>
        <ul><img className="photo" src={this.data['img2']} /></ul>
        <ul><img className="photo" src={this.data['img3']} /></ul></div> : this.state.hasAccess === false ? insufficientAccessWarning() 
        : <div>Loading</div>
        return <div className="container">
            {/* <NavBar /> */}
            {/* <sizedImage image={jj1}/> */}
            {contents}
        </div>
    }
}

function showContents() {
    return this.state.hasAccess === true ? pageContents() 
        : this.state.hasAccess === false ? insufficientAccessWarning()
        : <div>Loading</div>
}

function pageContents() {
    return (
        <div>
            <ul><img className="photo" src={this.data['img1']} /></ul>
            <ul><img className="photo" src={this.data['img2']} /></ul>
            <ul><img className="photo" src={this.data['img3']} /></ul>
        </div>       
    )
}

function sizedImage(props) {
    return <img src={props.image} />
}

export default JaqJaqList

