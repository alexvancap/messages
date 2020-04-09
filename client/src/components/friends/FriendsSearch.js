import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Search, Dropdown, Menu } from 'semantic-ui-react'
import constants from './../../constants'

export const FriendsSearch = () => {

    const dispatch = useDispatch()
    const friendsSearch = useSelector(state => state.friends.search)
    const user = useSelector(state => state.user)

    const handleSearchChange = (searchInput) => {
        dispatch({type: 'SEARCH_USER_CHANGE', key: 'isLoading', value: true})
        dispatch({type: 'SEARCH_USER_CHANGE', key: 'value', value: searchInput})
    }

    const handleResultSelect = (e, {result}) => {
        console.log(result)
    }
    const resultRenderer = (user) => {
        return(
            <div className='search-result-container'>
                <img className="search-result-img" alt="user avatar" src={user.image} />
                <div className="search-result-username" >{user.title}</div>
                <div className="search-result-name">{user.fullname}</div>
            </div>

        )
    }
    useEffect(() => {
        if(friendsSearch.value){
                fetch(`${constants.backendUrl}/search?value=${friendsSearch.value}`, {
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

                    dispatch({type: 'SEARCH_USER_CHANGE', key: 'results', value: response})
                    dispatch({type: 'SEARCH_USER_CHANGE', key: 'isLoading', value: false})
                })
        }
    }, [friendsSearch.value, dispatch, user.username])
    const options = 
      [{text: 'username', value: 'username'}, {text: 'full name', value: 'full_name'}]

    return (
        <div id="friends-search-cont">
            <Search 
                id='friends-search-bar'
                loading={friendsSearch.value.length === 0  ? false : friendsSearch.isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={e => handleSearchChange(e.target.value)}
                results={friendsSearch.results}
                value={friendsSearch.value}
                fluid
                resultRenderer={resultRenderer}
            />  
            
            <Dropdown id="friend-search-dropdown"
                clearable 
                placeholder='Filter' 
                searchQuery='true'
                
                onChange = {(e, res) => console.log({ res })}  
                options={options} 
                selection 
                />
     
        </div>
    )
}