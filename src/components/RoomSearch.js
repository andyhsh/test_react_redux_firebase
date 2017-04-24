import React, { Component } from 'react';
import { connect } from 'react-redux';

class RoomSearch extends Component {
  constructor(props){
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log('submit');
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

export default connect()(RoomSearch);
