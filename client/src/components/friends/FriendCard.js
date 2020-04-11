import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'

export const FriendCard = (props) => {
    console.log(props.friend)

    return (
        <Card>
            <Image src={props.friend.avatar} wrapped ui={false} />
            <Card.Content>
            <Card.Header>{props.friend.userName}</Card.Header>
            <Card.Meta>Joined in 2016</Card.Meta>
            <Card.Description>
                {props.friend.first_name + ' ' + props.friend.last_name}
            </Card.Description>
            </Card.Content>
            <Card.Content extra>
            <a>
                <Icon name='user' />
                10 Friends
            </a>
            </Card.Content>
        </Card>
    )
}