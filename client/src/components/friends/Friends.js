import React from 'react'
import { Header, Icon } from 'semantic-ui-react'
import { FriendsSearch } from './FriendsSearch'
import { FriendList } from './FriendList'



export const Friends = () => {

    
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