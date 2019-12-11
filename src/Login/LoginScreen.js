import React from "react";
import Login from "./LoginForm"
import { Row, Col } from 'antd';

class LoginScreen extends React.Component {
    render() {
        return (
            <div className="general">                  
                    <Row align="middle" justify="space-around" type="flex" className="full">
                    <Col xs={16} sm={16} md={12} lg={8} xl={8} className="window">
                    <div className="welcome"><h2>¡Bienvenido a EncuestasUAPA!</h2></div>  
                        <Login/>
                    </Col>
                    </Row>
            </div>
        );
    }
}

export default LoginScreen;