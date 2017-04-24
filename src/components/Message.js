import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.nativeEvent.preventDefault();
    this.props.removeMessage(this.props.id);
  }

  render() {
    return (
      <div>
        <p>
          author: {this.props.author}, text: {this.props.text}
          <button type='submit' onClick={this.handleSubmit}>Delete</button>
        </p>
      </div>
    );
  }
}


export default Message;
