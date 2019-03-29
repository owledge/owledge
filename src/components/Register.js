import React, { Component } from 'react';
import '../styles/App.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'

class Register extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = { validated: false };
    }

    handleSubmit(event) {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.setState({ validated: true });
    }

    render() {
        const { validated } = this.state;
        return (
            <div className="container">
                <div className="row justify-content-md-center">
            <Form
                noValidate
                validated={validated}
                onSubmit={e => this.handleSubmit(e)}
            >
                <Form.Row className="col-md-12">
                    <Form.Group as={Col} md="6" controlId="validationCustom01">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="First name"
                            defaultValue="Juan"
                        />
                        <Form.Control.Feedback>¡Luce bien!</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} md="6" controlId="validationCustom02">
                        <Form.Label>Apellido</Form.Label>
                        <Form.Control
                            required
                            type="text"
                            placeholder="Apellido"
                            defaultValue="Almaraz"
                        />
                        <Form.Control.Feedback>¡Luce bien!</Form.Control.Feedback>
                    </Form.Group>
                </Form.Row>
                <Form.Row className="col-md-12">
                    <Form.Group as={Col} md="6" controlId="formBasicEmail">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" placeholder="Correo electrónico" />
                    </Form.Group>
                   
                    <Form.Group as={Col} md="6">
                        <Form.Label>País</Form.Label>
                        <Form.Control type="text" placeholder="País" required />
                    </Form.Group>
                </Form.Row>
                <Form.Group>
                    <Form.Check
                        required
                        label="Aceptar términos y condiciones"
                        feedback="Necesitas estar de acuerdo antes de enviar."
                    />
                </Form.Group>
                <Button type="submit" variant="danger" className="Basic-button" >Enviar</Button>
            </Form>
                </div>
            </div>
        );
    }
}


export default Register;

