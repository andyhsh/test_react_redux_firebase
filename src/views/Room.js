import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddMessage from '../components/AddMessage'
import MessageList from '../components/MessageList';

class Room extends Component {
  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <AddMessage roomId={this.props.match.params.room}/>
        <MessageList roomId={this.props.match.params.room}/>
      </div>
    );
  }
}

export default Room;
