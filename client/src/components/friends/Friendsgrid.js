import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { TabContent } from './TabContent'
import { Grid, Menu, Segment } from 'semantic-ui-react'

export const FriendsGrid = () => {
    const dispatch = useDispatch()
    const friendList = useSelector(state => state.friends.friendList)
    const activeTab = useSelector(state => state.friends.activeTab)
    const loggedInUserID = useSelector(state => state.user.id)
    const pendingFriends = friendList.filter(friend => friend.status === 0)
    const confirmedFriends = friendList.filter(friend => friend.status === 1)
    const blockedFriends = friendList.filter(friend => friend.status === 2 && friend.action_user_id === loggedInUserID)
    
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
                        color={activeTab === 'Friends' ? 'teal' : ''}
                    />
                    <Menu.Item
                        name='Pending'
                        active={activeTab === 'Pending'}
                        onClick={handleTabClick}
                        color={activeTab === 'Pending' ? 'teal' : ''}
                    />
                    <Menu.Item
                        name='Blocked'
                        active={activeTab === 'Blocked'}
                        onClick={handleTabClick}
                        color={activeTab === 'Blocked' ? 'teal' : ''}
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