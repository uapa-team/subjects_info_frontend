import React from "react";
import { Switch } from "react-router-dom";

import Form from "./Form/Form";
import Schedule from "./Schedule/Schedule";
import LoginScreen from "./Login/LoginScreen";

import { ProtectedRoute } from "./ProtectedRoute";

export default props => (
  <Switch>
    <LoginScreen exact path="/" component={LoginScreen} />
    <ProtectedRoute exact path="/form" component={Form} />
    <ProtectedRoute exact path="/schedule" component={Schedule} />
  </Switch>
);
