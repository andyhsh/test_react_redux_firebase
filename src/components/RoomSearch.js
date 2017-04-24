import React, { Component } from 'react';
import { connect } from 'react-redux';
import { joinRoom } from '../actions/actions';

class RoomSearch extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      name: ''
    };
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
    this.props.joinRoom(this.state.name);
  }

  render() {
    return (
      <form>
        <input type='text' name='room' onChange={this.handleChange} />
        <button type='submit' onClick={this.handleSubmit}>Create/Join Room</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    joinRoom: (name) => { dispatch(joinRoom(name)); },
  };
};

export default connect(null, mapDispatchToProps)(RoomSearch);
