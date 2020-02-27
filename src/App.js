import React from "react";
import "./App.css";
import { Switch } from "react-router-dom";

import Form from "./Form/Form";
import LoginScreen from "./Login/LoginScreen";

import { LoginRoute } from "./Routes/LoginRoute";
import { ProtectedRoute } from "./Routes/ProtectedRoute";


function App() {
  return (
    <Switch>
      <LoginRoute exact path="/" component={LoginScreen} />
      <ProtectedRoute exact path="/form" component={Form} />
    </Switch>
  );
}

export default App;
