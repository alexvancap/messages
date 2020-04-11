import React, { useEffect } from 'react'
import { Header, Icon } from 'semantic-ui-react'
import constants from './../../constants'
import { FriendList } from './FriendList'
import { FriendsSearch } from './FriendsSearch'
import { useDispatch } from 'react-redux' 

export const Friends = () => {
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetch(`${constants.backendUrl}/get-friends`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`,
                'Accept': 'application/json'
            }
        }).then(res => res.json())
        .then(res => {
            dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})})
    }, [])

    return(
        <div id="friends-container">
            <Header id="main-header" as='h2' icon textAlign='center'>
                <Icon name='users' circular />
                <Header.Content>Friends</Header.Content>
            </Header>
            <FriendsSearch />
            <FriendList />
        </div>
    )
}