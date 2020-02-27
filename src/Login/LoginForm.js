import React from "react";
import "antd/dist/antd.css";
import "./Login.css";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom";

import auth from "../Routes/auth";

class LoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        fetch("http://localhost:8000/subjects_hours/login", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: values.username,
            password: values.password
          })
        })
          .then(
            async response => {
              if (response.status === 404) {
                console.log("Contraseña incorrecta.");
              } else if (response.status === 200) {
                console.log("Inicio de sesión exitoso.");
                let res = await response.json();
                localStorage.setItem("name", res["name"]);
                localStorage.setItem("jwt", res["token"]);
                this.logIn();
              } else {
                console.log(
                  "Login Error: Backend HTTP code " + response.status
                );
              }
            },
            response => {
              console.log(response.status);
              console.log("F");
            }
          )
          .catch(error => {
            console.log(error);
          });
      }
    });
  };

  logIn = () => {
    auth.login(() => {
      this.props.history.push("/form");
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item className="item">
          {getFieldDecorator("username", {
            rules: [
              {
                required: true,
                message: "Por favor ingrese su nombre de usuario."
              }
            ]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nombre de usuario SIA"
            />
          )}
        </Form.Item>
        <Form.Item className="item">
          {getFieldDecorator("password", {
            rules: [
              { required: true, message: "Por favor ingrese su contraseña." }
            ]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Contraseña"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="item">
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(Form.create({ name: "normal_login" })(LoginForm));
