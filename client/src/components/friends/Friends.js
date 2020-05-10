import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux' // to handle state
import { Header, Icon } from 'semantic-ui-react' // imports semantic ui components
import socket from './../../socket.config' // gets the active websocket
import { FriendsGrid } from './FriendsGrid' // the tabs (blocked, friends, pending)
import { FriendsSearch } from './FriendsSearch' // the searchBar component

export const Friends = () => {
    const dispatch = useDispatch()
    const fetchedFriends = useSelector(state => state.friends.fetchedFriends)

    useEffect(() => {
        // gets friends if they are not in state
        if(!fetchedFriends)
            socket.emit('get-friends')
        // puts fetched friends in state
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