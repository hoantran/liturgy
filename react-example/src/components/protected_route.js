import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { checkAccessableRoutes } from '../firebase.js'

export const ProtectedRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        //TODO Instead of retrieving from localStorage, call firebase.auth.currentUser which will return authenticated user token
        let isAuthenticated = localStorage.getItem('authenticated') === 'true' || localStorage.getItem("authenticated") === true ? true : false
        let { path } = { ...rest }
        path = path.slice(1,)
        let hasAccess = checkAccessableRoutes(path)
        
        if (isAuthenticated && hasAccess) {
            return <Component {...props}/>
        } else if (isAuthenticated && !hasAccess){
            return <Redirect to='/403' />
        } else {
            return <Redirect to='/login' />
        }

    }}></Route>
)


