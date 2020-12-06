import React from "react";
import Carousel from "./Carousel/Carousel";
import ImageUpload from "./Uploader/ImageUpload"

import Footer from './Footer';

const Landing = () => {

  return (
    <div>
      <h1 className = "title">Landing</h1>
      <Carousel/>
      {/* <ImageUpload/> */}
      <Footer />
    </div>
  );
}

export default Landing;