import React from "react";
import "./App.css";
import { BrowserRouter, Route, Link } from "react-router-dom";
import Login from "./Login/Login.js";
import Form from "./Form/Form.js";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/login" component={Login} />
      <Route exact path="/form" component={Form} />
    </BrowserRouter>
  );
}

export default App;
