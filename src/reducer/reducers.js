// state structure

// firebase.ref(/room + roomId)

// state = {
//   room: [
//     exampleRoom123: [
//       {title: '', videoId: '', user: '', starCount: number},
//       {title: '', videoId: '', user: '', starCount: number},
//       {title: '', videoId: '', user: '', starCount: number},
//     ],
//     exampleRoom234: [
//       {title: '', videoId: '', user: '', starCount: number},
//       {title: '', videoId: '', user: '', starCount: number},
//       {title: '', videoId: '', user: '', starCount: number},
//     ],
//     exampleRoom345: [
//       {title: '', videoId: '', user: '', starCount: number},
//       {title: '', videoId: '', user: '', starCount: number},
//       {title: '', videoId: '', user: '', starCount: number},
//     ],
//   ],
//    user: {
//      displayName: 'Anonymous',
//      uid: '',
//      isUserSignedIn: false,
//      hasError: false,
//      errorMessage: '',
//    },
//    room: ''
// }

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE_SUCCESS':
      return [
        ...state, action.payload
      ];

    case 'REMOVE_MESSAGE_SUCCESS':
      const newState = [...state];
      // find the index message that matches the unique id object to delete
      const indexToDelete = newState.findIndex(message => {
        return action.payload === message.id;
      });
      newState.splice(indexToDelete, 1);
      return newState;

    // receive an updated starCount, to apply that property by matching with the correct Unique ID
    case 'SORT_MESSAGE_SUCCESS':
      let sortState = [...state];
      if (action.payload) {
        // find the index message that matches the updated unique id object
        const indexToUpdate = sortState.findIndex(message => {
          return action.payload.id === message.id;
        });
        // update the unique id object with the new starCount
        sortState[indexToUpdate].starCount = action.payload.starCount
      }
      // sort the list of objects by the value of starCount
      sortState.sort((a, b) => {
        return b.starCount - a.starCount;
      });
      return sortState;

    case 'RESET_STATE':
      return [];

    default:
      return state;
  }
};

// data structure = {id: '' name: ''}
export const roomReducer = (state = '', action) => {
  switch (action.type) {
    case 'JOIN_ROOM':
      return action.payload;
    case 'EXIT_ROOM':
      return '';
    default:
      return state;
  }
};

// USER REDUCER
const userInitialState = {
  displayName: 'Anonymous',
  uid: '',
  isUserSignedIn: false,
  hasError: false,
  errorMessage: '',
}

export const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case 'SIGN_IN_SUCCESS':
      return {
        ...state,
        isUserSignedIn: true,
        displayName: action.payload.displayName,
        uid: action.payload.uid
      }
    case 'SIGN_IN_ERROR':
      return {
        ...state,
        hasError: true,
        errorMessage: action.payload,
      }
    case 'SIGN_OUT_SUCCESS':
      return {
        ...state,
        isUserSignedIn: false,
        displayName: 'Anonymous',
      }
      case 'SIGN_OUT_ERROR':
        return {
          ...state,
          hasError: true,
          errorMessage: action.payload,
        }
    default:
      return state;
  }
};
