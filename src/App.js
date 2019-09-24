import React from "react";
import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Login from "./Login/Login.js";
import Form from "./Form/Form.js";

import { ProtectedRoute } from './ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/form" component={Form} />
    </BrowserRouter>
  );
}

export default App;
