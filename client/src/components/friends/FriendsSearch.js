import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dropdown, Search, Divider } from 'semantic-ui-react'
// import { clearState } from './../../helperFunctions'
import constants from './../../constants'


export const FriendsSearch = () => {
    const dispatch = useDispatch()
    const friendsSearch = useSelector(state => state.friends.search)
    const user = useSelector(state => state.user)

    useEffect(() => {
        return function unMount() {
            dispatch({type: 'CLEAR_SEARCH_STATE'})
        }
    }, [])

    const handleSearchChange = (searchInput) => {
        
        if(searchInput !== friendsSearch.value || searchInput === false){
            if(searchInput !== ''){
                fetch(`${constants.backendUrl}/search?value=${searchInput}${friendsSearch.filter}`, {
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
    const options = 
      [{text: 'username', value: 'username'}, {text: 'full name', value: "fullName"}]

    return (
        <div id="friends-search-cont">
            <Search 
                id='friends-search-bar'
                loading={friendsSearch.value === ''  ? false : friendsSearch.isLoading}
                onResultSelect={handleResultSelect}
                onSearchChange={(e) => {
                    dispatch({type: 'SEARCH_USER_CHANGE', object: {'value': e.target.value, 'isLoading': true}})
                    handleSearchChange(e.target.value)
                }
                }
                results={friendsSearch.results}
                value={friendsSearch.value}
                fluid
                resultRenderer={resultRenderer}
            />  
            
            <Dropdown id="friend-search-dropdown"
                clearable 
                placeholder='Filter' 
                searchQuery="&&filter="
                
                onChange = {(e, res) => dispatch({type: 'SEARCH_USER_CHANGE', object:{filter: res.searchQuery + res.value}})}  
                options={options} 
                selection 
                />
     
        </div>
    )
}