import React, { Component } from 'react';
import logo from './res/logo.svg';
import './styles/App.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        < Header />
        <BrowserRouter>
          <Route path="/" component={Home}/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
