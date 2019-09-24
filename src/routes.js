import React from 'react'
import { Switch } from 'react-router-dom'

import Login from "./Login/Login";
import Form from "./Form/Form";

import { ProtectedRoute } from './ProtectedRoute'
import { LoginRoute } from './LoginRoute'

export default props => (
    <Switch>
        <LoginRoute exact path="/login" component={Login} />
        <ProtectedRoute exact path="/form" component={Form} />
    </Switch>
)