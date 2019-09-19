import React, { Component } from "react";
import { Form,Input} from "antd";


class Validation extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator("username", {
              rules: [
                {
                    type: 'email',
                    message: 'El input no es un número',
                },
                {
                  required: true,
                  message: "Ingrese una cantidad de horas"
                }
              ]
            })(<Input/>)
            }
          </Form.Item>
      </Form>
    );
  }
}

const WrappedValidation = Form.create({ name: "validation" })(Validation);

export default WrappedValidation;
