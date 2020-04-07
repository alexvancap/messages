import React from 'react'
import history from './../history'

export const Navbar = () => {
    console.log(history.location)
    return(
        <div id="navbar">
            <div className="ui secondary pointing menu">
                <a className="item active">
                    Home
                </a>
                <a className="item">
                    Messages
                </a>
                <a className="item">
                    Friends
                </a>
                <div className="right menu"
                    onClick={() => {
                        localStorage.clear()
                        history.push('/login')
                    }}
                >
                    <a className="ui item">
                        Logout
                    </a>
                </div>
            </div>
          
        </div>
    )
}