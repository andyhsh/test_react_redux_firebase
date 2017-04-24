// state structure

// firebase.ref(/room + roomId)

// state = {
//   room: [
//     exampleRoom123: [
//       {title: '', videoId: '', user: '', priority: number},
//       {title: '', videoId: '', user: '', priority: number},
//       {title: '', videoId: '', user: '', priority: number},
//     ],
//     exampleRoom234: [
//       {title: '', videoId: '', user: '', priority: number},
//       {title: '', videoId: '', user: '', priority: number},
//       {title: '', videoId: '', user: '', priority: number},
//     ],
//     exampleRoom345: [
//       {title: '', videoId: '', user: '', priority: number},
//       {title: '', videoId: '', user: '', priority: number},
//       {title: '', videoId: '', user: '', priority: number},
//     ],
//   ]
// }

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE_SUCCESS':
      return [
        ...state, action.payload
      ];

    case 'REMOVE_MESSAGE_SUCCESS':
      const newState = [...state];
      const indexToDelete = newState.findIndex(message => {
        return action.payload === message.id;
      })
      newState.splice(indexToDelete, 1);
      return newState;

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
      return action.payload
    case 'EXIT_ROOM':
      return '';
    default:
      return state;
  }
};
