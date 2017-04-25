import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RoomSearch from '../components/RoomSearch';
import SignInButton from '../components/SignInButton';

class Home extends Component {

  render() {
    return (
      <div>
        <SignInButton />
        <Link to='/room'>Room</Link>
        <RoomSearch />
      </div>
    );
  }
}

export default Home;
