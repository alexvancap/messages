import React from 'react'
import { useSelector } from 'react-redux' // to get the state
import { Statistic } from 'semantic-ui-react' // allows us to use the statistic component

export const Statistics = () => {
    const friends = useSelector(state => state.friends)
    // calculates how many friends you have
    // returns a digit
    const amountOfFriends = () => {
        if (friends.fetchedFriends)
            return friends.friendList.filter(
                friend => friend.status === 1
            ).length
        return 0
    }

    return (
        <Statistic.Group size={'large'}>
            <Statistic color='teal'>
                <Statistic.Value>{amountOfFriends()}</Statistic.Value>
                <Statistic.Label>{amountOfFriends() === 1 ? 'friend' : 'friends'}</Statistic.Label>
            </Statistic>
            <Statistic color='teal'>
                <Statistic.Value>200</Statistic.Value>
                <Statistic.Label>Points</Statistic.Label>
            </Statistic>
            <Statistic color='teal'>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Sent Messages</Statistic.Label>
            </Statistic>
            <Statistic color='teal'>
                <Statistic.Value>22</Statistic.Value>
                <Statistic.Label>Received Messages</Statistic.Label>
            </Statistic>
        </Statistic.Group>
    )
}