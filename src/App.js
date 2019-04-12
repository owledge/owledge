import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import Header from './components/Header';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Header />
      </div>
    );
  }
}

export default App;
