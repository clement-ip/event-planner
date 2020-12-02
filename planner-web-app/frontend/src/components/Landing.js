import React from "react";
import Carousel from "./Carousel/Carousel";

import Footer from './Footer';
import FileUpload from "./Uploader/FileUpload";

const Landing = () => {

  return ( 
    <div>
      Landing
      <Carousel/>
      <FileUpload/>
      <Footer />
    </div>
  );
}
 
export default Landing;