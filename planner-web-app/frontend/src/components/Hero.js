import React, { useContext } from "react";
import { Redirect, withRouter } from "react-router-dom";

import { AuthContext } from '../Context/AuthContext';
import Carousel from "./Carousel/Carousel";
import ImageUpload from "./Uploader/ImageUpload"

import Footer from './Footer';


const Hero = (props) => {

    const { user, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    if(!isAuthenticated)
        return <Redirect to='/' />

    return (
    <div>
        <h1 class = "title">Welcome to Hero page</h1>
        <Carousel/>
        {/* <ImageUpload/> */}
        <Footer />
    </div>
  );
}

export default withRouter(Hero);