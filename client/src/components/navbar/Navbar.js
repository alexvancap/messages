import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'
import history from './../../history'


export const Navbar = (props) => {
    const dispatch = useDispatch()
    let activePage = useSelector(state => state.currentPage)
    console.log(activePage)

    const handleItemClick = (event) => {
        let currentPage = event.target.innerText

        if(event.target.innerText === 'Logout'){
            sessionStorage.clear()
            currentPage = 'Login'
            history.push('/login')
        }
        dispatch({
            type: 'UPDATE_STATE', 
            state: {
                currentPage: currentPage
            }
        })
    }
    if(activePage === 'Login') return <div></div>
    return(
        <div id="navbar">
            <Menu size='large' pointing color='teal' secondary>
            <Menu.Item
                name='home'
                color='teal'
                as={Link}
                active={activePage === 'Home'}
                to='/'
                onClick={handleItemClick}
            /> 

            <Menu.Item
                name='messages'
                color='teal'
                as={Link}
                to='/messages'
                active={activePage === 'Messages'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='friends'
                color='teal'
                as={Link}
                to='/friends'
                active={activePage === 'Friends'}
                onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                name='logout'
                color='teal'
                active={activePage === 'Logout'}
                onClick={handleItemClick}
                />
            </Menu.Menu>
            </Menu>
        </div>
    )
}