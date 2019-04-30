import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Header />
        <div class="row welcomePage">
          <div class="col-12">
            <h1>Bienvenido a Owledge</h1>
            <p> Texto que incluira Owledge </p>
            <button class="btn btn-primary">Ve lo que estudia la comunidad</button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
