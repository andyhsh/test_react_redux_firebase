import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { subscribeToMessages, removeMessage, starMessage, joinRoom, exitRoom } from '../actions/actions';

class MessageList extends Component {

  // Toggle on and off subscription, second parameter coming from URL 'this.props.match.params.id'
  componentDidMount() {
    this.props.subscribeToMessages(true, this.props.roomId);
    this.props.joinRoom(this.props.roomId);
  }

  componentWillUnmount() {
    this.props.subscribeToMessages(false, this.props.roomId);
    this.props.exitRoom();
  }

  renderMessages() {
    return this.props.messages.map((message, index) => {
      return (
        <Message
          key={index}
          roomId={this.props.roomId}
          id={message.id}
          text={message.text}
          user={message.user}
          userId={this.props.user.uid}
          currentUser={this.props.user.displayName}
          removeMessage={this.props.removeMessage}
          starMessage={this.props.starMessage}
        />
      )
    })
  }

  render() {
    return (
      <div>
        {this.renderMessages()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    messages: state.messages,
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToMessages: (toggle, roomId) => { dispatch(subscribeToMessages(toggle, roomId)); },
    removeMessage: (id, roomId) => { dispatch(removeMessage(id, roomId)); },
    starMessage: (id, roomId, userId) => { dispatch(starMessage(id, roomId, userId)); },
    joinRoom: (roomId) => { dispatch(joinRoom(roomId)); },
    exitRoom: () => { dispatch(exitRoom()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
