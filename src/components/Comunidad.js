import React, { Component } from 'react';
import '../styles/App.css';

class Comunidad extends Component {

  constructor() {
    super();
    this.state = {
      comunidad: [],
      username: "admin",
      password: "123"
    };
  }

  componentDidMount(){
    fetch('https://owledge2.herokuapp.com/api/flashcard', { credentials: 'include' })
    .then(results => {
      return results.json();
    }).then(data => {
      let flashcards = data.results.map((flashcard) => {
        return(
          <div key={flashcard.results}>
            <div>{flashcard.question}</div>
          </div>
        )
      })
      this.setState({flashcards: flashcards});
      console.log("state", this.state.comunidad);
    })
  }

  render() {
    return (
      <div className="row">
        <h3> {this.state.comunidad} </h3>
      </div>
    )
  }
}

export default Comunidad;