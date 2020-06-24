import React from 'react';
import { Provider } from 'react-redux';
import { Route, Router } from 'react-router-dom';
import { AlertContainer } from './components/alert';
import { Friends } from './components/friends';
import { Home } from './components/home';
import { Login } from './components/login';
import { Messages } from './components/messages';
import { Navbar } from './components/navbar';
import history from './history';
import { store } from './Store';
import './style.css';

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <div id='container'>
          <div id='inner-container'>
            <Navbar />
            <AlertContainer />
            <Route exact path={'/'} component={Home} />
            <Route path={'/login'} component={Login} />
            <Route path={'/messages'} component={Messages} />
            <Route exact path={'/friends'} component={Friends} />
          </div>
        </div>
      </Router>
    </Provider>
  );
}

export default App;