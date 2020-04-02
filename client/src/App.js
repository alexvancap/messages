import React, { Component } from 'react';
import {Router, Route} from 'react-router'
import {Home} from './components/Home'
import history from './components/history'
import {Provider} from 'react-redux'
import store from './Store'
import './style.css'

class App extends Component {
state = {
    data: null
  };
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