import React,{useContext,useRef,useEffect,useState} from 'react'
import {Link} from 'react-router-dom'

const NavBar = ()=>{
    return(
        <div>
            {/* WILL FINISH THIS LATER */}
            <h1><Link to="/">Home</Link></h1>
            <h1><Link to="/profile">Profile</Link></h1>
            <h3>HUE HUE HUE! THIS IS THE NAVBAR :D</h3>

        </div>
    );
}


export default NavBar