import history from './../history'
import { useSocket } from './../../hooks/useSocket'

const authentcateToken = () => {
    const socket = useSocket()
    
    if(token !== null && socket !== false)
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