import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const ProtectedRoute = ({ component: Component, ...rest}) => (
    <Route {...rest} render={(props) => {
        if (localStorage.getItem('authenticated') === 'true') {
            return <Component {...props}/>
        } else {
            return <Redirect to='/login' />
        }
    }}></Route>
)


