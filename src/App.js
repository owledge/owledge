import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import Header from './components/Header';
import Home from './components/Home';
import Comunidad from './components/Comunidad';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Header />
        <BrowserRouter>
          <Route path="/home" component={Home}/>
          <Route path="/comunidad" component={Comunidad}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
