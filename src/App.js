import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router,
  Link,
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
            <ul>
              <li><Link to='/'>Home</Link></li>
              <li><Link to='/room'>Room</Link></li>
            </ul>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/room' component={Room} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
