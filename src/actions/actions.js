import firebase from './firebase';

const firebaseDB = firebase.database();
const messageRef = firebaseDB.ref('/messages');

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

export function subscribeToMessages() {
  return dispatch => {
    console.log('subscribing to messages');
    messageRef.on('child_added', snapshot => {
      // flatten firebase object for redux state
      const message = {
        id: snapshot.key,
        text: snapshot.val().text,
        author: snapshot.val().author,
      }
      dispatch(addMessageSuccess(message));
    })
    // .catch((error) => {
    //   console.log(error);
    //   dispatch(addMessageError());
    // });

    messageRef.on('child_removed', snapshot => {
      dispatch(removeMessageSuccess(snapshot.key));
    })
    // .catch((error) => {
    //   console.log(error);
    //   dispatch(removeMessageError());
    // });
  };
}
export function addMessage(message) {
  return dispatch => {
    messageRef.push({
      text: message,
      author: 'anonymous'
    })
    .catch(error => {
    console.log(error);
    dispatch(addMessageError());
    });
  }
}

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

export function removeMessage(id) {
  return dispatch => {
    messageRef.child(id).remove();
  };
}

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
