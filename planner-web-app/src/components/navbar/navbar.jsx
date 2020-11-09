// import React,{useContext,useRef,useEffect,useState} from 'react'
import React from 'react'
import {Link} from 'react-router-dom'
import './navbar.css';

const NavBar = ()=>{
    return(
        <nav className="navbar">
            {/* WILL FINISH THIS LATER */}
            <div>
                <h1><Link to="/">Home</Link></h1>
            </div>
            <div>
                <h1><Link to="/profile">Profile</Link></h1>
            </div>

        </nav>
    );
}


export default NavBar

