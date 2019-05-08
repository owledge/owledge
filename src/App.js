import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Comunidad from './components/Comunidad';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Header />
        <BrowserRouter>
          <Route path="/home" component={Home}/>
          <Route path="/Login" component={Login}/>
          <Route path="/comunidad" component={Comunidad}/>
          <Route path="/Register" component={Register}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
