import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props);
    this.handleStar = this.handleStar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    e.preventDefault();
    this.props.removeMessage(this.props.id, this.props.roomId);
  }

  handleStar(e) {
    e.preventDefault();
    this.props.starMessage('anonymous', this.props.id, this.props.roomId);
  }

  render() {
    return (
      <div>
        <p>
          author: {this.props.author}, text: {this.props.text}
          <button type='submit' onClick={this.handleDelete}>Delete</button>
          <button type='submit' onClick={this.handleStar}>Star</button>
        </p>
      </div>
    );
  }
}


export default Message;
