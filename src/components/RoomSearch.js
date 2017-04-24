import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Link
} from 'react-router-dom';
import { joinRoom } from '../actions/actions';

class RoomSearch extends Component {
  constructor(props){
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      name: ''
    };
  }

  handleChange(e) {
    this.setState({
      name: e.target.value
    });
  }

  handleClick(e) {
    e.preventDefault();
    console.log('click');
  }

  render() {
    return (
      <form>
        <input type='text' name='room' onChange={this.handleChange} />
        <button type='submit' onClick={this.handleClick}><Link to={`/${this.state.name}`}>Create/Join Room</Link></button>
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
