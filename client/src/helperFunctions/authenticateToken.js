import socket from './../socket.config'
import history from './../history'

const authentcateToken = () => {
    const token = sessionStorage['authToken']
    if(token)
        socket
        .emit('authenticate', { token: sessionStorage['authToken'] })
        .on('unauthorized', (msg) => {
            console.log('unauthorized')
            throw new Error(msg.data.type);
          })
    else
        history.push('/login')
        console.log('not authenticated')
}
export default authentcateToken