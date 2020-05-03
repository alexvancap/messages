import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Header, Icon, Segment } from 'semantic-ui-react'
import socket from './../../socket.config'
import { Statistics } from './Statistics'


export const Home = (props) => {
    const dispatch = useDispatch()
    const fetchedFriends = useSelector(state => state.friends.fetchedFriends)
    const token = sessionStorage['authToken']
    
    useEffect(() => {

        if(!fetchedFriends){
            socket
                .emit('get-friends', token)
                .on('get-friends', (data) => {
                    dispatch({type: 'UPDATE_FRIEND_LIST', friends: data})
                })
        }
    }, [])

    if(fetchedFriends)
        return (
            <div id="home-container">
                <Header as='h2' icon textAlign='center'>
                <Icon color='teal' name='user' circular />
                    <Header.Content>Profile</Header.Content>
                </Header>
                <Segment id="stats-container">
                    <Statistics />
                </Segment>
            </div>
        )
    else
        return <div className="ui active red elastic large loader"></div>

    
}