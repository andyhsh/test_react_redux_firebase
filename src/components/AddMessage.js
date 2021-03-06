import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addMessage } from '../actions/actions';

class AddMessage extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
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

  handleClick(e) {
    e.preventDefault();
    this.props.addMessage(this.state.message, this.props.roomId, this.props.user.displayName);
  }


  render() {
    return (
      <form>
        <input type='text' name='message' onChange={this.handleChange} />
        <button type='submit' onClick={this.handleClick}>Add</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addMessage: (message, roomId, user) => { dispatch(addMessage(message, roomId, user)); },
  };
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddMessage);
