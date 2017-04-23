import { createStore, compose, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; // handles async calls in redux
import logger from 'redux-logger'; // useful log messages for redux state changes
import { messagesReducer } from './reducer/reducers'

const initStore = () => {
  // combine all reducers to form initStore
  const rootReducer = combineReducers({
    messages: messagesReducer
  });

  const store = createStore(rootReducer, compose(
    applyMiddleware(
      thunk,
      logger
    ),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  ));

  return store;
};

export default initStore;
