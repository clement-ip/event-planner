import React from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Footer from './Footer';

const About = (props) => {

    return (
    <div>
        <h1 className="title">About Us</h1>
        <Carousel/>
        {/* <ImageUpload/> */}
        <Footer />
    </div>
  );
}

export default withRouter(About);