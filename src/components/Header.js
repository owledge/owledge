import React, { Component } from 'react';
import '../styles/App.css';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';

import Logo from '../components/Logo';

class Header extends Component {
  render() {
    return (
      <header className="Header">
        <Navbar expand="lg">
          <Navbar.Brand href="#home"><Logo /></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">  
              <Nav.Link href="#home">Iniciar sesión</Nav.Link>
              <Nav.Link href="#link">Crear cuenta</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </header>
    )
  }
}

export default Header;