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
    const message = {
      text: this.state.message,
      author: 'anonymous',
    }
    this.props.addMessage(message);
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
    addMessage: (message) => { dispatch(addMessage(message)); },
  };
};

export default connect(null, mapDispatchToProps)(AddMessage);
