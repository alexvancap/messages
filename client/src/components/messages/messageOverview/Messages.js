import React, { useEffect } from 'react'
import { Container } from 'semantic-ui-react'
import { MessageBox } from '..'
import { MessageOverview } from './MessageOverview'
import { useSelector, useDispatch} from 'react-redux'
import { useSocket } from '../../../hooks/useSocket'
import history from '../../../history'

export const Messages = () => {
    const socket = useSocket()
    const friends = useSelector(state => state.friends.friendList)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if(socket === false)
            return history.push('/login')
        else if(!friends.fetchedFriends){
            socket
            .emit('get-friends')
            .on('get-friends', (res) => {
                dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})
            })
        }
    }, [])

    return (
        <Container id='messages-container'>
            <MessageBox />
            <MessageOverview />
        </Container>
    )
}