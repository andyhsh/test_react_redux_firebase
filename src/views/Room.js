import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import AddMessage from '../components/AddMessage'
import MessageList from '../components/MessageList';
import SignInButton from '../components/SignInButton';

class Room extends Component {
  render() {
    return (
      <div>
        <SignInButton />
        <Link to='/'>Home</Link>
        <AddMessage roomId={this.props.match.params.room}/>
        <MessageList roomId={this.props.match.params.room}/>
      </div>
    );
  }
}

export default Room;
