import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Search, Button, Icon } from 'semantic-ui-react'
import constants from './../../constants'
import socket from './../../socket.config'

export const FriendsSearch = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const user = useSelector(state => state.user)

    useEffect(() => {
        socket.on('search', (foundFriends) => {
            console.log(foundFriends)
            const friends = foundFriends.filter( foundFriends => 
                foundFriends.username === user.username ? false : true
            ).map(friend => {
                return {
                    key: friend.id,
                    image: friend.avatar ? friend.avatar : 'null',
                    title: friend.username,
                    fullname: `${friend.first_name} ${friend.last_name}`,
                }
            })
            dispatch({type: 'SEARCH_USER_CHANGE', object: {'results': friends, 'isLoading': false}})
        })
        .on('add-friend', (res) => {
            //
        })
        return function unMount() {
            dispatch({type: 'CLEAR_SEARCH_STATE'})
        };
    }, [])
    
    const addFriend = (friendId) => socket.emit('add-friend', friendId)

    const handleSearchChange = (searchInput) => {
        
        if(searchInput !== friends.search.value || searchInput === false){
            if(searchInput !== ''){
                socket.emit('search', {value: searchInput, filter: friends.search.filter})
            }else
                dispatch({type: 'SEARCH_USER_CHANGE', object: {results: []}})
        }
    }

    // const categorizeResult = () => {
    //     return {
    //         results: {
    //             users: {
    //                 name: 'users',
    //                 results: {
    //                     ...friends.search.results.filter(friend => {
    //                         Object.values(friends.friendList).includes(friend.id)
    //                     })
    //                 }
    //             },
    //             friends: {
    //                 name: 'friends',
    //                 results: {

    //                 }
    //             }
    //         }
    //     }
    // }

    const handleResultSelect = (e, {result}) => {
        console.log('result', result)
    }
    const resultRenderer = (user) => {
        return(
            <div className='search-result-container'>
                {/* <img className="search-result-img" alt="user avatar" src={user.image} /> */}
                <div className="search-result-username" >{user.username}</div>
                <div className="search-result-name">{user.fullname}</div>
                <div id='add-friend-btn-cont'>
                    <Button 
                        compact fluid 
                        size='medium' 
                        color='teal' 
                        className="add-friend-btn" 
                        icon='add user'
                        onClick={() => addFriend(user.title)}
                    />
                </div>
            </div>
        )
    }
    const options = 
      [{text: 'username', value: 'username'}, {text: 'full name', value: "fullName"}]

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
                resultRenderer={resultRenderer}
                icon={ <Icon name='search' color='teal'/> }
            />  
            
            <Dropdown 
                id="friend-search-dropdown"
                onChange = {(e, res) => dispatch({type: 'SEARCH_USER_CHANGE', object:{filter: res.value}})}  
                options={options} 
                selection 
                icon={<Icon style={{position: 'absolute', right: 5}} name='caret down' color='teal'/>}
                defaultValue='username'
                color='teal'
            />
     
        </div>
    )
}