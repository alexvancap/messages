import React, { useState } from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import { FriendActionModal } from './FriendActionModal'

export const FriendCard = (props) => {
    let friendsSince = new Date(props.friend.friends_since)
    const [openModal, setOpenModal] = useState(false)
    friendsSince = `${friendsSince.getDay()}/${friendsSince.getMonth()}/${friendsSince.getFullYear()}`

    // const removeFriend = () => {
    //     fetch(`${constants.backendUrl}/remove-friend/${props.friend.id}`, {
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${localStorage['authToken']}`
    //         }
    //     }).then(res => res.json())
    //     .then(res => {
    //         if(res.success){
    //             dispatch({type: 'UPDATE_FRIEND_LIST', 
    //                 friends: friendList.filter(friend => 
    //                     friend.id !== props.friend.id
    //                 )
    //             })
    //         }

    //     })
    // }

    return (
        <div className='friend-card-container'>
            <Card fluid>
                <Image src={props.friend.avatar} wrapped ui={false} />
                <Card.Content>
                <Card.Header>{props.friend.username}</Card.Header>
                <Card.Description>
                    {props.friend.fullName || props.friend.first_name + ' ' + props.friend.last_name}
                </Card.Description>
                <Card.Meta>Since {friendsSince}</Card.Meta>
                </Card.Content>
                <Card.Content extra>
                <div className='ui two buttons'>
                    <Button basic color='teal'>
                        Profile
                    </Button>
                    <Button basic color='red'
                        onClick={() => {
                            setOpenModal(true)
                        }}
                    >
                        Actions
                    </Button>
                    <FriendActionModal 
                        friend={props.friend} 
                        openModal={openModal} 
                        setOpenModal={setOpenModal}
                    />
                </div>
                </Card.Content>
            </Card>
        </div>
    )
}