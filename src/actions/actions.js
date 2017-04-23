import firebase from './firebase';

const firebaseDB = firebase.database();
const messageRef = firebaseDB.ref('/messages');

export function fetchMessages() {
  return dispatch => {
    messageRef.once('value', snapshot => {
      const fetchedMessages = snapshot.val();
      dispatch(fetchMessagesSuccess(fetchedMessages))
    })
  };
}

function fetchMessagesSuccess(fetchedMessages) {
  return {
    type: 'FETCH_MESSAGES_SUCCESS',
    payload: fetchedMessages
  }
}

export function subscribeToMessages() {
  return dispatch => {
    messageRef.on('child_added', snapshot => {
      dispatch(addMessageSuccess(snapshot.val()));
    })
    // .catch(error => {
    //   console.log(error);
    //   dispatch(addMessageError());
    // });

    messageRef.on('child_removed', snapshot => {
      dispatch(removeMessageSuccess(snapshot.val()));
    })
    // .catch(error => {
    //   console.log(error);
    //   dispatch(removeMessageError());
    // });
  };
}
// message object = { text: '', author: 'anonymous'}
export function addMessage(message) {
  return dispatch => {
    messageRef.push(message);
  }
}

function addMessageSuccess(message) {
  return {
    type: 'ADD_MESSAGE_SUCCESS',
    payload: message
  };
}

// function addMessageError() {
//   return {
//     type: 'ADD_MESSAGE_ERROR'
//   };
// }

function removeMessageSuccess(message) {
  return {
    type: 'ADD_MESSAGE_SUCCESS',
    payload: message
  };
}

// function removeMessageError() {
//   return {
//     type: 'ADD_MESSAGE_ERROR'
//   };
// }
