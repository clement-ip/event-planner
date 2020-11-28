import React, { useContext } from "react";
import { Redirect } from "react-router-dom";

import { AuthContext } from '../Context/AuthContext';

import Footer from './Footer';
import CommentBox from './comments-system/client/src/components/Box';


const Hero = (props) => {

    const { isAuthenticated, setIsAuthenticated, user} = useContext(AuthContext);

    if(!isAuthenticated)
        return <Redirect to='/' />

    return (
    <div>
        Welcome to Hero page
        {/* <CommentBox data={"5fc2297afc929f0f78eb5436"} user={user}></CommentBox> */}
        <Footer />
    </div>
  );
}
 
export default Hero;