import React from "react";
import LoginForm from "./LoginForm.js";
import { LoginCardS } from "./LoginStyles";

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
