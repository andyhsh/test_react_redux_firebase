import React, { Component } from 'react';
import AddMessage from '../components/AddMessage'
import MessageList from '../components/MessageList';

class Room extends Component {

  render() {
    return (
      <div>
        <AddMessage />
        <MessageList />
      </div>
    );
  }
}

export default Room;
