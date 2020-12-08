import React, { useContext, useRef } from "react";

import { AuthContext } from '../../Context/AuthContext';
import LoggedOutLeftMenu from './LoggedOutLeftMenu';
import LoggedInLeftMenu from './LoggedInLeftMenu';
import SearchBar from './SearchBar';

const Navbar = () => {
    const {isAuthenticated } = useContext(AuthContext);

    // Toggle the burger menu icon in mobile
    const navbarMenuRef = useRef(null);
    const burgermenuHandler = () => {
      navbarMenuRef.current.classList.toggle('is-active');
    }

    return (
      <nav className="navbar is-dark" role="navigation" aria-label="main navigation" style={{maxHeight: "60px"}}>
          {/* Need to replace icon with one of our own */}
          <div className="navbar-brand">
            <a className="navbar-item" href = "/">
              <img src="https://i.ibb.co/QJTYytx/newlogo7.png" style={{maxHeight: "50px"}} className="py-2 px-2"/>
            </a>
            {/* Burger menu shown during mobile */}
            <a onClick={burgermenuHandler} className="navbar-burger">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>
          {/* Menu changes depending on authentication */}
          <div className="navbar-menu" ref={navbarMenuRef}>
            <div className="navbar-start">
              <SearchBar />
            </div>
            { isAuthenticated ? <LoggedInLeftMenu /> : <LoggedOutLeftMenu />}
          </div>
      </nav>
    );
}
export default Navbar;