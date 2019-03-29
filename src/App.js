import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Título</h1>
          <h2>Subítulo</h2>
          <p>Parráfo</p>
        </header>
      </div>
    );
  }
}

export default App;
