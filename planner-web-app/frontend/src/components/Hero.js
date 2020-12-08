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
        <section className="hero is-primary">
        <div className="hero-body">
            <div className="container">
            <h1 className="title">
                Timinar <br></br>
            </h1>
            </div>
        </div>
        <Carousel/>
        </section>
        {/* <ImageUpload/> */}
        <Footer />
    </div>
  );
}

export default withRouter(Hero);