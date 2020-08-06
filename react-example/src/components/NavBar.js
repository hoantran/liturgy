import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import chopper from '../assets/chopper.jpg'
import { logout } from '../firebase.js'

const homeUrl = 'http://localhost:3000'

export default class NavBar extends Component {
    render () {
        const navStyle = {
            color:"white"
        }
        if (localStorage.getItem("authenticated") === "true") {
            console.log('1')
            return  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <img src={ chopper } width="112" height="28" />
                    </a>

                    <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                        <span aria-hidden="true"></span>
                    </a>
                </div>
                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="navbar-item">
                            <Link style={navStyle} to="/">
                                Home
                            </Link>
                        </div>
                        <div className="navbar-item">
                            <Link style={navStyle} to="/jaqjaq">
                                Jaqjaq
                            </Link>
                        </div>
                        <div className="navbar-item">
                            <Link style={navStyle} to="/engagement">
                                Engagement
                            </Link>
                        </div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <Link to="/login">
                                <button className="buttons" onClick={logout}>
                                    Logout
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        } else {
            console.log('2')
            return  <nav className="navbar is-primary" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <a className="navbar-item">
                    <img src={ chopper } width="112" height="28" />
                </a>

                <a role="button" className="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" className="navbar-menu">
                <div className="navbar-start">
                    <div className="navbar-item">
                        <Link style={navStyle} to="/">
                            Home
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link style={navStyle} to="/jaqjaq">
                            Jaqjaq
                        </Link>
                    </div>
                    <div className="navbar-item">
                        <Link style={navStyle} to="/engagement">
                            Engagement
                        </Link>
                    </div>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <Link to='/login'>
                            <button className="buttons is-light">
                                Login
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
        }
    }
}