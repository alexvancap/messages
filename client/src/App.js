import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { Home } from './components/home';
import { Login } from './components/login';
import { Navbar } from './components/navbar';
import { Register } from './components/register';
import { Friends } from './components/friends'
import history from './history';
import { store } from './Store';
import './style.css';
import socketIO from 'socket.io-client'

const socket = socketIO('http://localhost:4000')

class App extends Component {
  
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div id='container'>
            <div id='inner-container'>
              <Navbar />
              <Route exact path={'/'} component={Home}/>
              <Route path={'/login'} component={Login}/>
              <Route path={'/register'} component={Register}/>
              <Route exact path={'/friends'} component={Friends}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;