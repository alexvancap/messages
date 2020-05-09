import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Header, Icon } from 'semantic-ui-react'
import socket from './../../socket.config'
import { FriendsGrid } from './FriendsGrid'
import { FriendsSearch } from './FriendsSearch'

export const Friends = () => {
    const dispatch = useDispatch()
    const fetchedFriends = useSelector(state => state.friends.fetchedFriends)

    useEffect(() => {
        if(!fetchedFriends)
            socket.emit('get-friends')
        socket.on('get-friends', (res) => {
            dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})
        })

        // listens for the incomming change-friend-status request and puts it in state
        // We call it here because else it would run for every friend card
        socket.on('change-friend-status', (res) => {
            console.log(res)
            if(res.success){
                console.log(res)
                dispatch({type: 'CHANGE_FRIEND_STATUS', friendID : res.friendId, status: res.status})
            }
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