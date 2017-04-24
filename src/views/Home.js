import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom';
import RoomSearch from '../components/RoomSearch';

class Home extends Component {

  render() {
    return (
      <div>
        <Link to='/room'>Room</Link>
        <RoomSearch />
      </div>
    );
  }
}

export default Home;
