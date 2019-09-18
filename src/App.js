import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from "./Login/Login.js";
import Form from "./Form/Form.js";

function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
      <Route exact path="/form" component={Form} />
    </Router>
  );
}

export default App;
