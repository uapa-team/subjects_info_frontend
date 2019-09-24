import React from "react";
import { Form, Icon, Input, Button } from "antd";
import { UserFormSD } from "./LoginStyles";


import axios from 'axios';

class LoginForm extends React.Component {
  handleSubmit = e => {

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        axios.post('http://localhost:8000/subjects_hours/login', {
          params: {
            username: values.username,
            password: values.password
          }
        }).then((response) => {
          console.log(response)
          //Re-direct to form.

        }).catch((error) => {
          console.log(error);
        });

      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
        <UserFormSD>
          <b>Usuario:</b>
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: "Ingrese su usuario del SIA"
                }
              ]
            })(
              <Input
                prefix={
                  <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                }
              />
            )}
          </Form.Item>
          <b>Contraseña:</b>
          <Form.Item>
            {getFieldDecorator("password", {
              rules: [
                { required: true, message: "Ingrese la contraseña del SIA" }
              ]
            })(
              <Input
                prefix={
                  <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                type="password"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              onClick={this.handleSubmit}
              className="login-form-button"

            >
              Acceder
            </Button>
          </Form.Item>
        </UserFormSD>
      </Form>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default WrappedLoginForm;
