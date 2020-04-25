import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Search, Divider, Button, Icon } from 'semantic-ui-react'
import constants from './../../constants'

export const FriendsSearch = () => {
    const dispatch = useDispatch()
    const friends = useSelector(state => state.friends)
    const user = useSelector(state => state.user)

    useEffect(() => {
        return function unMount() {
            dispatch({type: 'CLEAR_SEARCH_STATE'})
        }
    }, [])
    
    const addFriend = (friendId) => {
        fetch(`${constants.backendUrl}/add-friend/${friendId}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage['authToken']}`,
            }
        }).then(res => res.json())
        .then(console.log)
    }

    const handleSearchChange = (searchInput) => {
        
        if(searchInput !== friends.search.value || searchInput === false){
            if(searchInput !== ''){
                fetch(`${constants.backendUrl}/search?value=${searchInput}${friends.search.filter}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage['authToken']}`,
                        'Accept': 'application/json' ,
                    }
                }).then(res => res.json())
                .then(response => {
                    response = response.res.filter( res => 
                        res.username === user.username ? false : true
                    ).map(res => {
                        return {
                            key: res.id,
                            image: res.avatar ? res.avatar : 'https://lh3.googleusercontent.com/proxy/a0_sHjUexkR334NasPUPJnlBDGmJDvp8m2w7U9lxZwNeH7a_YyuQvt9iNRESqGAXRE-u9W42_XjyFEvoBOJDG3ryKSmKLRY5THU3EcK55pqgkjPPtkIirg',
                            title: res.username,
                            fullname: `${res.first_name} ${res.last_name}`,
                        }
                    })      
                    dispatch({type: 'SEARCH_USER_CHANGE', object: {'results': response, 'isLoading': false}})
                })
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
        console.log(result)
    }
    const resultRenderer = (user) => {
        return(
            <div className='search-result-container'>
                <img className="search-result-img" alt="user avatar" src={user.image} />
                <div className="search-result-username" >{user.username}</div>
                <div className="search-result-name">{user.fullname}</div>
                <div id='add-friend-btn-cont'>
                    <Button 
                        compact fluid 
                        size='medium' 
                        color='teal' 
                        className="add-friend-btn" 
                        icon='add user'
                        onClick={() => addFriend(user.        )}
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
            />  
            
            <Dropdown id="friend-search-dropdown"
                clearable 
                placeholder='Filter' 
                searchQuery={'&&filter='}
                
                onChange = {(e, res) => dispatch({type: 'SEARCH_USER_CHANGE', object:{filter: res.searchQuery + res.value}})}  
                options={options} 
                selection 
                />
     
        </div>
    )
}