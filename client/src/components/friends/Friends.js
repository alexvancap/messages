import React, { useEffect } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import constants from './../../constants'
import { FriendsGrid } from './FriendsGrid'
import { FriendsSearch } from './FriendsSearch'
import { useDispatch } from 'react-redux' 
import socket from './../../socket.config'

export const Friends = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        socket.emit('get-friends')
        socket.on('get-friends', (res) => {
            dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})
        })
    })
    //     fetch(`${constants.backendUrl}/get-friends`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage['authToken']}`,
    //             'Accept': 'application/json'
    //         }
    //     }).then(res => res.json())
    //     .then(res => {
    //         dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})})
    // }, [])

    return(
        <div id="friends-container">
            <Header id="main-header" as='h2' icon textAlign='center'>
                <Icon name='users' color='teal' circular />
                <Header.Content>Friends</Header.Content>
            </Header>
            <FriendsSearch />
            <FriendsGrid />
        </div>
    )
}