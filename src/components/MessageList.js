import React, { Component } from 'react';
import { connect } from 'react-redux';
import Message from './Message';
import { subscribeToMessages, fetchMessages } from '../actions/actions';

class MessageList extends Component {

  componentDidMount() {
    // this.props.fetchMessages();
    this.props.subscribeToMessages();
  }

  renderMessages() {
    return this.props.messages.map((message, index) => {
      return <Message key={index} text={message.text} author={message.author} />
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
    subscribeToMessages: () => { dispatch(subscribeToMessages()); },
    fetchMessages: () => { dispatch(fetchMessages()); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageList);
