import React, { useContext } from "react";

import AuthServices from '../../Services/AuthServices';
import { AuthContext } from '../../Context/AuthContext';

const LoggedOutDropdown = () => {
    const { setIsAuthenticated } = useContext(AuthContext);

    const logOutHandler = () => {
        AuthServices.logout();
        setIsAuthenticated(false);
    }

    return (
        <div className="navbar-end">
        {/* Signup/Login Dropdown */}
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
                    <a className="dropdown-item">
                        Profile
                    </a>
                    <hr className="navbar-divider"></hr>
                    <a onClick={logOutHandler} className="dropdown-item">
                        Log Out
                    </a>
                </div>
            </div>
        </div>
     );
}

export default LoggedOutDropdown;