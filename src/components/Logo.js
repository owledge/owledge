import React, { Component } from 'react';
import '../styles/App.css';

class Logo extends Component {
    render() {
        return (
            <div className="Logo">
                <img src={require("../res/logo.png")} alt="Owledge Logo" className="img-responsive" />
            </div>
        );
    }
}

export default Logo;
