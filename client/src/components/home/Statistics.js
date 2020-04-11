import React from 'react'
import {Statistic} from 'semantic-ui-react'
import { useSelector } from 'react-redux'

export const Statistics = () => {
    const friends = useSelector(state => state.friends)
    const amountOfFriends = () => {
        if (friends.fetchedFriends)
            return friends.friendList.length()
        else
            return 0
    }

    return (
        <Statistic.Group size={'large'}>
                <Statistic>
                    <Statistic.Value>{amountOfFriends()}</Statistic.Value>
                    <Statistic.Label>Friends</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>200</Statistic.Value>
                    <Statistic.Label>Points</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>22</Statistic.Value>
                    <Statistic.Label>Sent Messages</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>22</Statistic.Value>
                    <Statistic.Label>Received Messages</Statistic.Label>
                </Statistic>
                </Statistic.Group>
    )
}