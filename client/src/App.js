import React, { Component } from 'react';
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router-dom'
import { store } from './Store'
import { Home } from './components/Home'
import history  from './history'
import './style.css';

class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div id='container'>
            <Route exact path={'/'} component={Home}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;