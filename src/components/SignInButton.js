import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions/actions';

class SignInButton extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    if (this.props.user.isUserSignedIn) {
      console.log('sign out!');
      this.props.signOut();
    } else {
      console.log('sign in!');
      this.props.signIn();
    }
  }

  render(){
    return (
      <button onClick={this.handleClick}>
        {this.props.user.isUserSignedIn ? 'Log out' : 'Log in'}
      </button>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    signIn: () => { dispatch(signIn()); },
    signOut: () => { dispatch(signOut()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInButton);
