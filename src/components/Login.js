import React, { Component } from 'react';
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'



class Login extends Component {
    render() {
        return (
            <div className="Login">
                <br/>
                <Form className="col-md-12">
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" placeholder="Ingrese correo electrónico" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" placeholder="Contraseña" />
                    </Form.Group>
                    <Button variant="danger" type="submit" className="Basic-button">
                        Enviar
                    </Button>
                </Form>
            </div>
        );
    }
}

export default Login;
