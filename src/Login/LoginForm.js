import React from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { UserFormSD } from "./LoginStyles";
import auth from '../auth'
import { withRouter } from "react-router-dom"

import axios from 'axios'

class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.logIn = this.logIn.bind(this);
  }

  handleSubmit = () => {
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
      console.log(this.props)
      this.props.history.push('/form');
    })
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Row><Col span={20}>
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
                type="submit"
                onClick={this.handleSubmit}
                className="login-form-button"
              >
                Acceder
            </Button>
            </Form.Item>
          </UserFormSD>
        </Form>
      </Col></Row>
    );
  }
}

const WrappedLoginForm = Form.create({ name: "normal_login" })(LoginForm);

export default withRouter(WrappedLoginForm);
