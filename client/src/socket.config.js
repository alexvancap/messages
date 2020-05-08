import io from 'socket.io-client';
import constants from './constants';

let socket;

  socket = io.connect(constants.backendUrl, {
    'query': 'token=' + sessionStorage['authToken']
  });

export default socket;