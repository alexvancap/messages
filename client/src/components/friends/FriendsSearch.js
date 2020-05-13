import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux' // to handle state change
import { Dropdown, Search, Icon } from 'semantic-ui-react' // imports components from semantic ui
import { SearchResultRenderer } from './SearchResultRenderer' // this is a single search result
import { useSocket } from './../../hooks/useSocket'
import history from '../../history'

export const FriendsSearch = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends) // the friends state
    const user = useSelector(state => state.user) // the user state
    const socket = useSocket()

    useEffect(() => {
        if (!socket) return history.push('/login')
            // waits for the server to send a response
            socket.on('search', (foundFriends) => {
                // filters out the logged in user and changes the data so we can user it in the result renderer
                const friends = foundFriends.filter( foundFriends => 
                    foundFriends.username === user.username ? false : true
                ).map(friend => {
                    return {
                        key: friend.id,
                        image: friend.avatar ? friend.avatar : 'null',
                        title: friend.username || friend.title,
                        fullName: friend.fullName || `${friend.first_name} ${friend.last_name}`,
                        friendId: friend.id,
                        friendshipstatus: friend.friendship_status
                    }
                })
                let userIds =  []
                // removes all the duplicate users
                const distinctUsers = friends.filter(friend => {
                    if( userIds.includes(friend.friendId)) return false
                    else userIds.push(friend.friendId)
                    return true
                })
                dispatch({type: 'SEARCH_USER_CHANGE', object: {'results': distinctUsers, 'isLoading': false}})
            })
            // waits for the server to say that a friend has been added
            .on('add-friend', (friend) => {
                if(user.id){
                    dispatch({type: 'ADD_FRIEND', newFriend: friend})
                    // generates an alert
                    console.log(user.id)
                    console.log(user.id)
                    console.log(user.id)
                    console.log(user.id)
                    console.log(friend.friendId)
                    console.log(friend.friendId)
                    console.log(friend.friendId)
                    socket
                        .emit('add-alert', {userId: user.id, header: `Sent request`, body: `A friend request has been send to: ${friend.username}`})
                        .emit('add-alert', {userId: friend.friendId, header: `Received request`, body: `A friend request has been received from: ${user.username}`})
                }
            })
            // when the component dismounts the search input gets cleared
            return function unMount() {
                dispatch({type: 'CLEAR_SEARCH_STATE'})
            };
    }, [user, socket])

    // runs when you type new data in the search component
    const handleSearchChange = (searchInput) => {
        if(searchInput !== friends.search.value || searchInput === false){
            if(searchInput !== ''){
                socket.emit('search', {value: searchInput, filter: friends.search.filter})
            }else
                dispatch({type: 'SEARCH_USER_CHANGE', object: {results: []}})
        }
    }

    // runs when the add friend button gets pressed
    const addFriend = (friend) => socket.emit('add-friend', friend)

    // runs when a result gets pressed
    const handleResultSelect = (e, {result}) => {
        const clickedFriend = result
        // if the pressed item is the add friend button: adds a friend
        if(e.target.id === 'addFriendBtn'){
            addFriend({...clickedFriend, id: clickedFriend.key})
            dispatch({type: 'CLEAR_SEARCH_STATE'})
        }else{
            // else logs the friend to the console
            console.log(result)
        }
    }

    // the filter options
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
                resultRenderer={(friend) => <SearchResultRenderer friend={friend} friendList={friends.friendList}/>}
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