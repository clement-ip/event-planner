import React, { useRef } from "react";

import Signup from "./Signup";
import Login from "./Login";

const LoggedOutDropdown = () => {
    const signupRef = useRef(null);
    const loginRef = useRef(null);

    const signupHandler = () => {
        signupRef.current.classList.add('is-active');
    };

    const loginHandler = () => {
        loginRef.current.classList.add('is-active');
    };

    return (
        <div className="navbar-end">
            <a className="navbar-item">
                Create an Event
            </a>

            {/* Signup/Login Dropdown */}
            <div className="navbar-item is-hoverable">
                <button className="button is-rounded is-white mr-4 is-hidden-touch">
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

            {/* Registration Modal */}
            <Signup modalRef={signupRef}/>
            <Login modalRef={loginRef} />
        </div>
     );
}

export default LoggedOutDropdown;