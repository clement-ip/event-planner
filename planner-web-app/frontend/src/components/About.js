import React from "react";
import { withRouter } from "react-router-dom";
import Carousel from "./Carousel/Carousel";
import Footer from './Footer';

const About = (props) => {

    return (
    <div>
        <section class="hero is-medium is-primary is-bold">
            <div class="hero-body">
                <div class="container">
                <h1 class="title">
                    Timinar
                </h1>
                <section class="subtitle">
                    About Us
                </section>
                </div>
            </div>
        </section>
        <h1 className="title"></h1>
        <article class="message is-large">
  <div class="message-body">
  Timinar is a leading global communications platform <br></br>
            that is dedicated to connecting people in times of need.<br></br>
            We offer event hosting services for any individual(s) <br></br>
            or entities that want to organize events online for individuals.<br></br>
            <br></br>
            Our Founders Clement Ip, Corey See, Edison Suen, <br></br>
            Eric Lam, & Hassan Ali (The CCEEH Conglomerate) have dedicated their time to <br></br>
            creating this platform to provide individuals the ability<br></br>
            and opportunity to reconnect again through the online means.<br></br>
  </div>
</article>

        <Footer />
    </div>
  );
}

export default withRouter(About);