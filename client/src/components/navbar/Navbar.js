import React, { useEffect } from 'react'
import history from './../../history'
import { Link } from 'react-router-dom'
import { Menu, Segment } from 'semantic-ui-react'

export const Navbar = (currentPath) => {
    useEffect(() =>{
        console.log(currentPath)
    }, [currentPath])

    let activeItem = 'home'

    return(
        // <div id="navbar" className="ui secondary pointing big menu">
        //     <Link to="/" className={`narvbar item ${currentPath === '/' ? 'active' : ''}`}>
        //         Home
        //     </Link>

        //     <Link to="/messages" className={`narvbar item ${currentPath === '/messages' ? 'active' : ''}`}>
        //         Messages
        //     </Link>

        //     <Link to="/friends" className={`narvbar item ${currentPath === '/friends' ? 'active' : ''}`}>
        //         Friends
        //     </Link>

        //     <div className="right menu"
        //         onClick={() => {
        //             localStorage.clear()
        //             history.push('/login')
        //         }}
        //     >
        //         <Link to="/login" className="ui navbar item">
        //             Logout
        //         </Link>
        //     </div>
        // </div>

        <div id="navbar">
            <Menu pointing secondary>
            <Menu.Item
                as={Link}
                name='home'
                active={activeItem === 'home'}
                to='/'
                // onClick={this.handleItemClick}
            /> 

            <Menu.Item
                name='messages'
                as={Link}
                to='/messages'
                active={activeItem === 'messages'}
                // onClick={this.handleItemClick}
            />
            <Menu.Item
                name='friends'
                as={Link}
                to='/friends'
                active={activeItem === 'friends'}
                onClick={() => activeItem = 'friends'}
            />
            <Menu.Menu position='right'>
                <Menu.Item
                name='logout'
                active={activeItem === 'logout'}
                // onClick={this.handleItemClick}
                />
            </Menu.Menu>
            </Menu>
        </div>
    )
}