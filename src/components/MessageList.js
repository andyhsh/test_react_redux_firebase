import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { subscribeToMessages, removeMessage, joinRoom, exitRoom } from '../actions/actions';

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
        <Message key={index} id={message.id} text={message.text} author={message.author} removeMessage={this.props.removeMessage}/>
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
    messages: state.messages
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    subscribeToMessages: (toggle, roomId) => { dispatch(subscribeToMessages(toggle, roomId)); },
    removeMessage: (id) => { dispatch(removeMessage(id)); },
    joinRoom: (roomId) => { dispatch(joinRoom(roomId)); },
    exitRoom: () => { dispatch(exitRoom()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
