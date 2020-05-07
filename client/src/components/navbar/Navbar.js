import React, { useEffect } from 'react'
import history from './../../history'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'


export const Navbar = (props) => {
    const dispatch = useDispatch()
    let activeItem = useSelector(state => state.currentPage)

    const handleItemClick = (event) => {
        if(event.target.innerText === 'Logout'){
            sessionStorage.clear()
            history.push('/login')
        }
        dispatch({
            type: 'UPDATE_STATE', 
            state: {
                currentPage: event.target.innerText
            }
        })
    }
    

    return(
        <div id="navbar">
            <Menu pointing color='teal' secondary>
            <Menu.Item
                name='home'
                color='teal'
                as={Link}
                active={activeItem === 'Home'}
                to='/'
                onClick={handleItemClick}
            /> 

            <Menu.Item
                name='messages'
                color='teal'
                as={Link}
                to='/messages'
                active={activeItem === 'Messages'}
                onClick={handleItemClick}
            />
            <Menu.Item
                name='friends'
                color='teal'
                as={Link}
                to='/friends'
                active={activeItem === 'Friends'}
                onClick={handleItemClick}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                name='logout'
                color='teal'
                active={activeItem === 'Logout'}
                onClick={handleItemClick}
                />
            </Menu.Menu>
            </Menu>
        </div>
    )
}