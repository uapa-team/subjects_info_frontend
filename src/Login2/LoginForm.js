import React from "react";
import "antd/dist/antd.css";
import "./Login.css";
import { Form, Icon, Input, Button } from "antd";
import { withRouter } from "react-router-dom"

import axios from 'axios'
import auth from '../auth'

class LoginForm extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
            axios.post('http://168.176.37.49:8000/subjects_hours/login', {
              username: values.username,
              password: values.password
            }).then((response) => { //Add verification (200).
              localStorage.setItem('name', response.data);
              localStorage.setItem('username', values.username);
              this.logIn();
            }).catch((error) => {
              console.log(error);
            });
      }
    });
  };

  logIn = () => {
    auth.login(() => {
      this.props.history.push('/form');
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item className="item">
          {getFieldDecorator("username", {
            rules: [{ required: true, message: "Por favor ingrese su nombre de usuario." }]
          })(
            <Input
              prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
              placeholder="Nombre de usuario SIA"
            />
          )}
        </Form.Item>
        <Form.Item className="item">
          {getFieldDecorator("password", {
            rules: [{ required: true, message: "Por favor ingrese su contraseña." }]
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
              type="password"
              placeholder="Contraseña"
            />
          )}
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Ingresar
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default withRouter(Form.create({ name: "normal_login" })(LoginForm));