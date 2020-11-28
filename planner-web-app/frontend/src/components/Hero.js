import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from '../Context/AuthContext';

import Footer from './Footer';


const Hero = (props) => {

    const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

    if(!isAuthenticated)
        return <Redirect to='/' />

    return (
    <div>
        Welcome to Hero page
        <Footer />
    </div>
  );
}
 
export default Hero;