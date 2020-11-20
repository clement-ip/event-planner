import React, { useRef } from "react";
import { Link } from "react-router-dom";


import Signup from "./Signup";
import Login from "./Login";

const Navbar = () => {
    const signupRef = useRef(null);
    const loginRef = useRef(null);

    const signupHandler = () => {
        signupRef.current.classList.add('is-active');
    };

    const loginHandler = () => {
        loginRef.current.classList.add('is-active');
    };

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
  
        
        <div className="navbar-menu">
        {/* Signup/Login Dropdown */}
          <div className="navbar-end">
            <div className="navbar-item is-hoverable">
              <button className="button is-rounded is-white mr-4">
                <span className="icon">
                  <i className="fas fa-bars"></i>
                </span>
                <span className="icon">
                  <i className="fas fa-user-circle" style={{width: "2em", height: "2em"}}></i>
                </span>
              </button>
              <div className="navbar-dropdown is-right is-boxed mt-1 mr-5" style={{width: "170px"}}>
                <a onClick={signupHandler} className="dropdown-item">
                  Sign Up
                </a>
                <hr className="navbar-divider"></hr>
                <a onClick={loginHandler} className="dropdown-item">
                  Log in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Registration Modal */}
        <Signup modalRef={signupRef}/>
        <Login modalRef={loginRef} />

      </nav>
    );
}


   
export default Navbar;