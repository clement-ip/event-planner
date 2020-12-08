import React from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Footer from './Footer';

const About = (props) => {

    return (
    <div>
        <h1 className="title">About Us</h1>
        <section>
            Timinar is a leading global communications platform that is dedicated to connecting people in times of need.
            We offer event hosting services for any individual(s) or entities that want to organize events online for individuals.

            Our Founders Clement Ip, Corey See, Edison Suen, Eric Lam, & Hassan Ali (The CCEEH Conglomerate) have dedicated their time to 
            creating this platform to provide individuals the ability and opportunity to reconnect again through the online means.
        </section>
        <Footer />
    </div>
  );
}

export default withRouter(About);