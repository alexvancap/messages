import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import constants from './../../constants'
import { Statistics } from './Statistics'
import { Header, Icon, Segment} from 'semantic-ui-react'


export const Home = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    
    useEffect(() => {
        if(!state.friends.fetchedFriends){
            fetch(`${constants.backendUrl}/get-friends`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage['authToken']}`,
                    'Accept': 'application/json'
                }
            }).then(res => res.json())
            .then(res => {
                dispatch({type: 'UPDATE_FRIEND_LIST', friends: res})
            })
        }
    }, [])

    if(state.friends.fetchedFriends)
        return (
            <div id="home-container">
                <Header as='h2' icon textAlign='center'>
                <Icon color='teal' name='user' circular />
                    <Header.Content>Profile</Header.Content>
                </Header>
                <Segment id="stats-container">
                    <Statistics user={state}/>
                </Segment>
            </div>
        )
    
    return <div className="ui active red elastic large loader"></div>

    
}