import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signIn } from '../actions/actions';

class SignInButton extends Component {
  constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('sign in!');
    this.props.signIn()
  }

  render(){
    return (
      <button onClick={this.handleClick}>
        {this.props.user.isUserSignedInSign ? 'Log out' : 'Log in'}
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
    signIn: () => { dispatch(signIn()); }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInButton);
