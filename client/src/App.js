import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import './assets/fomantic/dist/semantic.css';
import { Home } from './components/Home';
import { Login } from './components/Login';
import history from './history';
import { store } from './Store';
import { Navbar } from './components/Navbar'
import './style.css';


class App extends Component {

  
  render() {
    return (
      <Provider store={store}>
        <Router history={history}>
          <div id='container'>
            <Navbar />
            <Route exact path={'/'} component={Home}/>
            <Route path={'/login'} component={Login}/>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;