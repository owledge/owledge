import React, { Component } from 'react';
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Logo from '../components/Logo';


class Login extends Component {
    render() {
        return (
            <div className="Login">
                <div className="container ">                
                <div className="row justify-content-md-center"> 
                    <Form className="col col-lg-6">
                    <Logo/>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Control type="email" placeholder="Ingrese correo electrónico" />
                        </Form.Group>
                        <Form.Group controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Contraseña" />
                        </Form.Group>
                        
                            <Button variant="danger" type="submit" className="Basic-button btn-lg">
                            Enviar
                    </Button>
                    <br></br>
                    <p className="logtext">¿No tienes cuenta? <a href={"/Register"}>Registrate aquí</a></p>
                    </Form>
                </div>
                </div>
            </div>
        );
    }
}

export default Login;
