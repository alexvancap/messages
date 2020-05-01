import constants from './constants'
import io from 'socket.io-client'
import history from './history'

let socket;
  socket = io.connect(constants.backendUrl);

export default socket;