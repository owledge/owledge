import React, { Component } from 'react';
import '../styles/App.css';

class Home extends Component {
  render() {
    return (
      <div className="row welcomePage">
        <div className="col-12">
          <h1>Bienvenido a Owledge</h1>
          <p> Texto que incluira Owledge </p>
          <a href="/comunidad" className="btn btn-primary">Ve lo que estudia la comunidad</a>
        </div>
      </div>
    )
  }
}

export default Home;