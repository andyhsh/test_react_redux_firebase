import React, { Component } from 'react';

class Message extends Component {

  render() {
    return (
      <div>
        author: {this.props.author}, text: {this.props.text}
      </div>
    );
  }
}


export default Message;
