import React, { Component } from "react";
import LoginForm from "./LoginForm.js";
import { LoginCardS, UserFormSD } from "./LoginStyles";

class Login extends React.Component {
  render() {
    return (
      <LoginCardS>
        <LoginForm></LoginForm>
      </LoginCardS>
    );
  }
}

export default Login;
