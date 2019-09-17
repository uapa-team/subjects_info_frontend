import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login/Login.js';

function App() {
  return (
    <Router>
      <Route exact path="/login" component={Login} />
    </Router>
  );
}

export default App;
