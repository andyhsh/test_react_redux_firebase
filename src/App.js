import React, { Component } from 'react';
import { Provider } from 'react-redux';
import AddMessage from './components/AddMessage';
import MessageList from './components/MessageList';
import initStore from './store';

// Initiate Store
const store = initStore();

// Subscribe to state changes in redux
store.subscribe(() => {
  store.getState();
});

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <div>
          <AddMessage />
          <MessageList />
        </div>
      </Provider>
    );
  }
}

export default App;
