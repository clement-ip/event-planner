import React from "react";
import Carousel from "./Carousel/Carousel";
import ImageUpload from "./Uploader/ImageUpload"

import Footer from './Footer';

const Landing = () => {

    return (
        <div>
        <section className="hero is-dark is-bold is-large">
          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <p className="title is-1">Timinar</p>
                  <p className="subtitle is-4">Connecting people in times of need</p>
                </div>
                <div className="column">
                  <figure className="image">
                      <img src="https://i.ibb.co/QJTYytx/newlogo7.png"/>
                  </figure>
                </div>
              </div>
            </div>
          </div>
        </section>
          <Footer />
        </div>
      );
}

export default Landing;