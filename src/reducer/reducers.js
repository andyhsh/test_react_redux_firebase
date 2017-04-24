// state structure
// state = {
//   room: {
//     currentRoom: {},
//     rooms: [ example123, example123, example123 ]
//   },
//   messages: [
//     { message: 123, prop: 123, prop: 123, room: example123 },
//     { message: 123, prop: 123, prop: 123, room: example123 },
//     { message: 123, prop: 123, prop: 123, room: example123 },
//   ]
// }
//
// state = {
//   room: {}
// }

export const messagesReducer = (state = [], action) => {
  switch (action.type) {
    case 'ADD_MESSAGE_SUCCESS':
      return [
        ...state, action.payload
      ];

    // case 'FETCH_MESSAGES_SUCCESS':
    //   return [action.payload];

    case 'REMOVE_MESSAGE_SUCCESS':
      const newState = [...state];
      const indexToDelete = newState.findIndex(message => {
        return action.payload === message.id;
      })
      newState.splice(indexToDelete, 1);
      return newState;

    default:
      return state;
  }
};
