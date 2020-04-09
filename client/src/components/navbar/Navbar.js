import React, { useEffect } from 'react'
import history from './../../history'
import { Link } from 'react-router-dom'

export const Navbar = (currentPath) => {
    useEffect(() =>{
        console.log(currentPath)
    }, [currentPath])

    return(
        <div id="navbar" className="ui secondary pointing big menu">
            <Link to="/" className={`narvbar item ${currentPath === '/' ? 'active' : ''}`}>
                Home
            </Link>

            <Link to="/messages" className={`narvbar item ${currentPath === '/messages' ? 'active' : ''}`}>
                Messages
            </Link>

            <Link to="/friends" className={`narvbar item ${currentPath === '/friends' ? 'active' : ''}`}>
                Friends
            </Link>

            <div className="right menu"
                onClick={() => {
                    localStorage.clear()
                    history.push('/login')
                }}
            >
                <Link to="/login" className="ui navbar item">
                    Logout
                </Link>
            </div>
        </div>
    )
}