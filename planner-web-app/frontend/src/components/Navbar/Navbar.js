import React, { useContext } from "react";

import { AuthContext } from '../../Context/AuthContext';
import LoggedOutDropdown from './LoggedOutDropdown';
import LoggedInDropdown from './LoggedInDropdown';

const Navbar = () => {
    const {isAuthenticated } = useContext(AuthContext);

    return ( 
      <nav className="navbar has-shadow has-background-dark" role="navigation" aria-label="main navigation" style={{maxHeight: "60px"}}>
        <div className="navbar-brand">
          <a className="navbar-item">
            <img src="https://bulma.io/images/bulma-logo.png" style={{maxHeight: "50px"}} className="py-2 px-2"/>
          </a>
          <a className="navbar-burger" id="burger">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>

        { isAuthenticated ? <LoggedInDropdown /> : <LoggedOutDropdown />}
      </nav>
    );
}
export default Navbar;