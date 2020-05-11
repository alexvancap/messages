import React from 'react'
import { useSelector, useDispatch } from 'react-redux' // to handle state
import { TabContent } from './TabContent' // loads what is inside the tabse
import { Grid, Menu, Segment } from 'semantic-ui-react' // imports semantic-ui components

export const FriendsGrid = () => {
    const dispatch = useDispatch()
    const activeTab = useSelector(state => state.friends.activeTab) // to remember the current tab
    const friendList = useSelector(state => state.friends.friendList) // holds all the (accepted) friends
    const pendingFriends = friendList.filter(friend => friend.status === 0) // holds all pending friend requests
    const confirmedFriends = friendList.filter(friend => friend.status === 1) // holds all confirmed friend requests
    const loggedInUserID = useSelector(state => state.user.id) // the current loged in user
    const blockedFriends = friendList.filter(friend => friend.status === 2 && friend.action_user_id === loggedInUserID) // holds all blocked friend requests
    
    // runs when the user clicks on a new tab
    const handleTabClick = (e, { name }) => {
        dispatch({type: 'ACTIVE_FRIENDS_TAB', state: name})
    }

    return (
        <Grid style={{marginTop: 30}}>
            <Grid.Column width={3}>
                <Menu fluid vertical tabular >
                    <Menu.Item
                        name='Friends'
                        active={activeTab === 'Friends'}
                        onClick={handleTabClick}
                        color={activeTab === 'Friends' ? 'teal' : 'grey'}
                    />
                    <Menu.Item
                        name='Pending'
                        active={activeTab === 'Pending'}
                        onClick={handleTabClick}
                        color={activeTab === 'Pending' ? 'teal' : 'grey'}
                    />
                    <Menu.Item
                        name='Blocked'
                        active={activeTab === 'Blocked'}
                        onClick={handleTabClick}
                        color={activeTab === 'Blocked' ? 'teal' : 'grey'}
                    />
                </Menu>
            </Grid.Column>

            <Grid.Column stretched width={12}>
                <Segment id='friends-list-container'>
                    <TabContent 
                        pendingFriends={pendingFriends} 
                        confirmedFriends={confirmedFriends} 
                        blockedFriends={blockedFriends}
                    />
                </Segment>
            </Grid.Column>
        </Grid>

        
    )
}