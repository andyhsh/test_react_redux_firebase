import firebase from './firebase';

const firebaseDB = firebase.database();
//const messageRef = firebaseDB.ref(`/Rooms/${roomId}`);

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
          user: snapshot.val().user,
          stars: snapshot.val().stars,
          starCount: snapshot.val().starCount,
        }
        dispatch(addMessageSuccess(message));
      })

      // listen for delete in message and return the deleted message's unique ID
      messageRef.on('child_removed', snapshot => {
        dispatch(removeMessageSuccess(snapshot.key));
      })

      // listen for changes in starCount and return the updated starCount
      messageRef.on('child_changed', snapshot => {
        const updatedStarCountMessage = {
          id: snapshot.key,
          starCount: snapshot.val().starCount
        };
        dispatch(sortMessageSuccess(updatedStarCountMessage));
      })

      messageRef.once('value', snapshot => {
        dispatch(sortMessageSuccess());
      })

    } else if (toggle === false) {
      console.log('unsubscribing to messages');
      // reset state and turn off all firebase event listeners
      messageRef.off('child_added');
      messageRef.off('child_removed');
      messageRef.off('value');
      dispatch(resetState());
    }
  };
}
// middleware to update firebase database first
export function addMessage(message, roomId, user) {
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.push({
      text: message,
      user: user,
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

function sortMessageSuccess(updatedStarCountMessage) {
  return {
    type: 'SORT_MESSAGE_SUCCESS',
    payload: updatedStarCountMessage,
  };
}

// Star by users. Each individual user can only star a song ONCE.
// Keep track of total stars a song has received through message.stars
export function starMessage(id, roomId, userId){
  return dispatch => {
    const messageRef = firebaseDB.ref(`/rooms/${roomId}`);
    messageRef.child(id).transaction(message => {
      if (message) {
        // check whether user has starred the message already
        // If the user has starred it already, "unstar" it
        if (message.stars[userId]) {
          message.starCount--;
          message.stars[userId] = null;
        } else {
          message.starCount++;
          message.stars[userId] = true;
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

/* ACTIONS FOR USER REDUCER */
export function signIn(){
  return dispatch => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider).then(function(result) {
      const { uid, displayName, email } = result.user;

      // update firebase with signed in user details
      firebaseDB.ref(`users/${uid}`).set({
        displayName,
        email,
        uid
      })
      // update redux state
      dispatch(signInSuccess({displayName, uid}));
    }).catch(error => {
      dispatch(signInError(error.message));
    });
  }
}

function signInError(errorMessage){
  return {
    type: 'SIGN_IN_ERROR',
    payload: errorMessage,
  }
}

function signInSuccess(displayName){
  return {
    type: 'SIGN_IN_SUCCESS',
    payload: displayName,
  }
}

export function signOut(){
  return dispatch => {
    firebase.auth().signOut().then(function() {
      dispatch(signOutSuccess());
    }).catch(error => {
      dispatch(signOutError(error.message));
    });
  }
}

function signOutError(errorMessage){
  return {
    type: 'SIGN_OUT_ERROR',
    payload: errorMessage,
  }
}

function signOutSuccess(displayName){
  return {
    type: 'SIGN_OUT_SUCCESS',
    payload: displayName,
  }
}
