import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Search, Icon } from 'semantic-ui-react'
import socket from './../../socket.config'
import { SearchResultRenderer } from './SearchResultRenderer'

export const FriendsSearch = () => {
    const friendList = useSelector(state => state.friends.friendList)
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const user = useSelector(state => state.user)

    useEffect(() => {
        socket.on('search', (foundFriends) => {
            const friends = foundFriends.filter( foundFriends => 
                foundFriends.username === user.username ? false : true
            ).map(friend => {
                return {
                    key: friend.id,
                    image: friend.avatar ? friend.avatar : 'null',
                    title: friend.username || friend.title,
                    fullName: friend.fullName || `${friend.first_name} ${friend.last_name}`,
                    friendId: friend.id,
                    friendshipStatus: friend.friendship_status
                }
            })
            let userIds =  []
            const distinctUsers = friends.filter(friend => {
                if( userIds.includes(friend.friendId)) return false
                else userIds.push(friend.friendId)
                return true
            })
            dispatch({type: 'SEARCH_USER_CHANGE', object: {'results': distinctUsers, 'isLoading': false}})
        })
        .on('add-friend', (friend) => {
            dispatch({type: 'ADD_FRIEND', newFriend: friend})
        })
        return function unMount() {
            dispatch({type: 'CLEAR_SEARCH_STATE'})
        };
    }, [])

    const handleSearchChange = (searchInput) => {
        if(searchInput !== friends.search.value || searchInput === false){
            if(searchInput !== ''){
                socket.emit('search', {value: searchInput, filter: friends.search.filter})
            }else
                dispatch({type: 'SEARCH_USER_CHANGE', object: {results: []}})
        }
    }

    const addFriend = (friend) => socket.emit('add-friend', friend)

    const handleResultSelect = (e, {result}) => {
        const clickedFriend = result
        if(e.target.id === 'addFriendBtn'){
            addFriend({...clickedFriend, id: clickedFriend.key})
            dispatch({type: 'CLEAR_SEARCH_STATE'})
        }else{
            console.log(result)
        }
    }

    const options = [{text: 'username', value: 'username'}, {text: 'full name', value: "fullName"}]

    return (
        <div id="friends-search-cont">
            <Search 
                id='friends-search-bar'
                loading={friends.search.value === ''  ? false : friends.search.isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={(e) => {
                    dispatch({type: 'SEARCH_USER_CHANGE', object: {'value': e.target.value, 'isLoading': true}})
                    handleSearchChange(e.target.value)
                }
                }
                results={friends.search.results}
                value={friends.search.value}
                fluid
                resultRenderer={(friend) => <SearchResultRenderer friend={friend} friendList={friendList}/>}
                icon={ <Icon name='search' color='teal'/> }
            />  
            
            <Dropdown 
                id="friend-search-dropdown"
                onChange = {(e, res) => dispatch({type: 'SEARCH_USER_CHANGE', object:{filter: res.value}})}  
                options={options} 
                selection 
                icon={
                    <Icon style={{position: 'absolute', right: 5}} name='caret down' color='teal'/>
                }
                defaultValue='username'
                color='teal'
            />
     
        </div>
    )
}