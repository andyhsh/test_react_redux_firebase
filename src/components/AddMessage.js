import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/actions';

class AddMessage extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      message: ''
    };
  }

  handleChange(e) {
    this.setState({
      message: e.target.value
    });
  }

  handleSubmit(e) {
    e.nativeEvent.preventDefault();
    this.props.addMessage(this.state.message, this.props.roomId);
  }


  render() {
    return (
      <form>
        <input type='text' name='message' onChange={this.handleChange} />
        <button type='submit' onClick={this.handleSubmit}>Add</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message, roomId) => { dispatch(addMessage(message, roomId)); },
  };
};

export default connect(null, mapDispatchToProps)(AddMessage);
