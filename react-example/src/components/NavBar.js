import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import chopper from '../assets/chopper.jpg'
import { logout, checkAccessableRoutes } from '../firebase.js'

// const homeUrl = 'http://localhost:3000'

export default class NavBar extends Component {

    render () {
        console.log('rendering navbar')
        console.log(`auth is ${this.props.authenticated}`)
        const navStyle = {
            color:"white"
        }
        console.log('2.5')
        console.log(this.props.authenticated)

        let isAuthenticated = (this.props.authenticated === true || this.props.authenticated === "true") ? true : false
        let logoutButton = <button className="buttons" onClick={ () => logout(this.props.setAuthenticated, this.props.setRole) }>Logout</button>
        let loginButton = <button className="buttons is-light">Login</button>
        let controlButton = isAuthenticated ? logoutButton : loginButton
        
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
                        {navItem('Home', '/', navStyle)}
                        {isAuthenticated && checkAccessableRoutes('jaqjaq') && navItem('Jaqjaq', '/jaqjaq', navStyle)}
                        {isAuthenticated && checkAccessableRoutes('engagement') && navItem('Engagement', '/engagement', navStyle)}
                        <div className="navbar-item">{this.props.authenticated}</div>
                    </div>
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <Link style={navStyle} to="/login">
                                {controlButton}
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
    }
}

const navItem = (name, route, style) => {
    return (
        <div className="navbar-item">
            <Link style={style} to={route}>
                {name}
            </Link>
        </div>
    )
}