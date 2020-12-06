import React, { useContext } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";

import { AuthContext } from '../Context/AuthContext';
import Carousel from "./Carousel/Carousel";
import ImageUpload from "./Uploader/ImageUpload"

import Footer from './Footer';
import CreateEvent from "./CreateEvent/CreateEvent";

const Hero = (props) => {

    return (
    <div>
        <h1 className="title">Welcome to Hero page</h1>
        <Carousel/>
        {/* <ImageUpload/> */}
        <Footer />
    </div>
  );
}

export default withRouter(Hero);