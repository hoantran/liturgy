import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import 'bulma/css/bulma.css'
import chopper from '../assets/chopper.jpg'

const homeUrl = 'http://localhost:3000'

export default class NavBar extends Component {
    render () {
        return  <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
            <div class="navbar-brand">
                <a class="navbar-item">
                    <img src={ chopper } width="112" height="28" />
                </a>

                <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                </a>
            </div>
            <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
            <a class="navbar-item" href={homeUrl + '/main'}>
                Home
            </a>
            <a class="navbar-item">
                <link to="/main"></link>
            </a>

            {/* <a class="navbar-item" href={homeUrl + '/cloy'}>
                CLOY
            </a> */}

            <a class="navbar-item" href={homeUrl + '/jaqjaq'}>
                JaqJaq
            </a>

            <a class="navbar-item" href={homeUrl + '/engagement'}>
                Engagement
            </a>
            </div>

            <div class="navbar-end">
            <div class="navbar-item">
            </div>
            </div>
        </div>
        </nav>
    }

}