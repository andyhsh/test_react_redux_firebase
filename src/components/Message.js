import React, { Component } from 'react';

class Message extends Component {
  constructor(props){
    super(props);
    this.handleStar = this.handleStar.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e) {
    this.props.removeMessage(this.props.id, this.props.roomId);
  }

  handleStar(e) {
    this.props.starMessage(this.props.id, this.props.roomId, this.props.userId);
  }

  renderStar() {
    if (this.props.currentUser !== 'Anonymous') {
      return <button type='submit' onClick={this.handleStar}>Star</button>
    }
  }

  render() {
    return (
      <div>
        <p>
          user: {this.props.user}, text: {this.props.text}
          <button type='submit' onClick={this.handleDelete}>Delete</button>
          {this.renderStar()}
        </p>
      </div>
    );
  }
}


export default Message;
