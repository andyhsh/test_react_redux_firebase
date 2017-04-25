import firebase from './firebase';

const firebaseDB = firebase.database();
//const messageRef = firebaseDB.ref(`/Rooms/${roomId}`);

// export function fetchMessages() {
//   return dispatch => {
//     messageRef.once('value', snapshot => {
//       const fetchedMessages = snapshot.val();
//       dispatch(fetchMessagesSuccess(fetchedMessages))
//     })
//   };
// }
//
// function fetchMessagesSuccess(fetchedMessages) {
//   return {
//     type: 'FETCH_MESSAGES_SUCCESS',
//     payload: fetchedMessages
//   }
// }

export function subscribeToMessages(toggle, roomId) {
  return dispatch => {
  const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    if (toggle === true) {
      console.log('subscribing to messages');
      messageRef.on('child_added', snapshot => {
        // flatten firebase object for redux state
        const message = {
          id: snapshot.key,
          text: snapshot.val().text,
          author: snapshot.val().author,
          stars: snapshot.val().stars,
          starCount: snapshot.val().starCount,
        }
        dispatch(addMessageSuccess(message));
      })

      messageRef.on('child_removed', snapshot => {
        dispatch(removeMessageSuccess(snapshot.key));
      })
    } else if (toggle === false) {
      console.log('unsubscribing to messages');
      // reset state and turn off all firebase event listeners
      messageRef.off('child_added');
      messageRef.off('child_removed');
      dispatch(resetState());
    }
  };
}
// middleware to update firebase database first
export function addMessage(message, roomId) {
  return dispatch => {
  const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.push({
      text: message,
      author: 'anonymous',
      // stars: { userId: null/true, userId: null/true ...}
      stars: { user: 'bool' },
      starCount: 0,
    })
    .catch(error => {
    console.log(error);
    dispatch(addMessageError());
    });
  }
}

// update individual user redux state
function addMessageSuccess(message) {
  return {
    type: 'ADD_MESSAGE_SUCCESS',
    payload: message
  };
}

function addMessageError() {
  return {
    type: 'ADD_MESSAGE_ERROR'
  };
}

// middleware to update firebase database first
export function removeMessage(id, roomId) {
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.child(id).remove();
  };
}

// update individual user redux state
function removeMessageSuccess(id) {
  return {
    type: 'REMOVE_MESSAGE_SUCCESS',
    payload: id
  };
}

function removeMessageError() {
  return {
    type: 'REMOVE_MESSAGE_ERROR'
  };
}

// Star by users. Each individual user can only star a song ONCE.
// Keep track of total stars a song has received through message.stars
export function starMessage(user, id, roomId){
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    debugger;
    messageRef.child(id).transaction(message => {
      if (message) {
        // check whether user has starred the message already
        // If the user has starred it already, "unstar" it
        if (message.stars[user]) {
          message.starCount--;
          message.stars[user] = null;
        } else {
          message.starCount++;
          message.stars[user] = true;
        }
      }
      return message;
    });
  };
}

// update individual user redux state
function resetState() {
  return {
    type: 'RESET_STATE'
  };
}

/* ACTIONS FOR ROOM REDUCER */
export function joinRoom(roomId) {
  return {
    type: 'JOIN_ROOM',
    payload: roomId
  };
}

export function exitRoom() {
  return {
    type: 'EXIT_ROOM'
  };
}
