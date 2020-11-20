import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from '../Context/AuthContext';


const Hero = (props) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    if(!isAuthenticated)
        return <Redirect to='/' />

    return (
    <div>
        Welcome to Hero page
    </div>
  );
}
 
export default Hero;