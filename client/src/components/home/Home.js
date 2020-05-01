import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Statistics } from './Statistics'
import { Header, Icon, Segment} from 'semantic-ui-react'
import socket from './../../socket.config'
import history from './../../history'


export const Home = (props) => {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    const token = sessionStorage.token
    
    useEffect(() => {
        if(!state.friends.fetchedFriends){
            if (token){
                socket.emit('get-friends', sessionStorage.token)
            }else
                history.push('/login')
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