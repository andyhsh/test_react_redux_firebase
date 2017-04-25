import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import initStore from './store';
import Home from './views/Home';
import Room from './views/Room';
import NotFound from './views/NotFound';

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
        <Router>
          <div>
            <Switch>
              <Route path='/:room/:error' component={NotFound} />
              <Route exact path='/' component={Home} />
              <Route path='/:room' component={Room} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
