import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'; // to handle state
import { Container, Header, Icon, Segment } from 'semantic-ui-react'; // imports the semantic components
import history from '../../history';
import { useSocket } from './../../hooks/useSocket';
import { Bio } from './Bio';
import { EditModals } from './EditModals';
import { Interests } from './Interests';
import { Statistics } from './Statistics'; // statistics component

export const Home = () => {
    const dispatch = useDispatch();
    // getting all of your friends from state
    const fetchedFriends = useSelector(state => state.friends.fetchedFriends);
    const socket = useSocket();


    
    useEffect(() => {
        if(socket === false)
            return history.push('/login')
        // makes sure the friends aren't fetched already
        if(!fetchedFriends){
            // sends a request to get all the friends and waits for the server to send a response
            socket
            .emit('get-friends')
            .on('get-friends', (data) => {
                // saves the fetched friends to the state
                dispatch({type: 'UPDATE_FRIEND_LIST', friends: data})
            })    
        }
    }, [ socket ]);

    return (
        <div id="home-container">
            <Header as='h2' icon textAlign='center'>
            <Icon color='teal' name='user' circular />
                <Header.Content>Profile</Header.Content>
            </Header>
            <Container id='home-bio-cont'>
                <Bio />
                <Interests />
            </Container>
            <Segment id="stats-container">
                <Statistics />
            </Segment>
            <EditModals />
        </div>
    );
};