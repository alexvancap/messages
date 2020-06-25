import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' // to handle state
import { Header, Icon, Segment, Container, PlaceholderParagraph, Button } from 'semantic-ui-react' // imports the semantic components
import { Statistics } from './Statistics' // statistics component
import { useSocket } from './../../hooks/useSocket'
import { EditModals } from './EditModals'
import history from '../../history'

export const Home = () => {
    const dispatch = useDispatch()
    // getting all of your friends from state
    const fetchedFriends = useSelector(state => state.friends.fetchedFriends)
    const bio = useSelector(state => state.user.bio)
    const socket = useSocket()

    const openEditModal = (modalType) => {
        dispatch({type: 'UPDATE_NESTED_STATE', state: 'home', nestedState: 'openModal', value: modalType})
    }
    
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
    }, [socket])

    return (
        <div id="home-container">
            <Header as='h2' icon textAlign='center'>
            <Icon color='teal' name='user' circular />
                <Header.Content>Profile</Header.Content>
            </Header>
            <Container id='home-bio-cont'>
                <Segment id='home-bio-segment'>
                    <Header className='home-bio-header'>About me</Header>
                    <PlaceholderParagraph>
                        {bio}
                    </PlaceholderParagraph>
                    <Button 
                        className='home-bio-edit-button' 
                        size='mini'
                        onClick={() => openEditModal('bio')} >
                            <Icon name='edit' />
                            Edit
                    </Button>
                </Segment>
                <Segment id='home-interests-segment'>
                    <Header className='home-bio-header'>Interests</Header>
                    <Button 
                        className='home-bio-edit-button' 
                        size='mini'
                        onClick={() => openEditModal('interests')}>
                            <Icon name='edit' />
                            Edit
                    </Button>
                </Segment>
            </Container>
            <Segment id="stats-container">
                <Statistics />
            </Segment>
            <EditModals />
        </div>
    )
}