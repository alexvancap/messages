import React, { useEffect } from 'react'
import history from './../../history'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'
import { useSelector, useDispatch } from 'react-redux'


export const Navbar = (props) => {
    const dispatch = useDispatch()
    let activeItem = useSelector(state => state.currentPage)
    useEffect(() => {
        let currentPage = ''
        switch (history.location.pathname) {
            case '/':
                currentPage = 'Home'
                break;
            case '/friends':
                currentPage = 'Friends'
                break;
            case '/messages':
                currentPage = 'Messages'
            default:
                break;
        }
        dispatch({type: 'UPDATE_STATE', state: {
            currentPage: currentPage
        }})
    }, [])
    

    const handleItemClick = (event) => dispatch({type: 'UPDATE_STATE', state: {
        currentPage: event.target.innerText
    }})
    

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
                active={activeItem === 'logout'}
                onClick={handleItemClick}
                />
            </Menu.Menu>
            </Menu>
        </div>
    )
}