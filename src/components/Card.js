import React, { Component } from 'react';
import '../styles/App.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

class Card extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);

        this.state = {
            show: false,
        };
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
    }

    render() {
        return (
            <>
                <Button variant="danger" className="Basic-button" onClick={this.handleShow}>
                    Abrir modal
        </Button>

                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>¿Por qué ella no me ama?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Sabes por qué, pero no quieres admitirlo, hermano. Oremos.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Cerrar
            </Button>
                        <Button variant="danger" className="Basic-button"onClick={this.handleClose}>
                            Guardar
            </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    }
}


export default Card;
