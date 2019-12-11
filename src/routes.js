import React from 'react'
import { Switch } from 'react-router-dom'

import Form from "./Form/Form";

import LoginScreen from "./Login2/LoginScreen"

import { ProtectedRoute } from './ProtectedRoute'
import { LoginRoute } from './LoginRoute'

export default props => (
    <Switch>
        <LoginScreen exact path="/" component={LoginScreen} />
        <ProtectedRoute exact path="/form" component={Form} />
    </Switch>
)