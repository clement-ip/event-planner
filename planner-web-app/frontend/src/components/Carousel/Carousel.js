import React, { useState, useEffect, useLayoutEffect } from 'react';
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";

import EventServices from '../../Services/EventServices';
import CarouselTestData from './CarouselTestData.json';


function Carousel(props) {
  const [data, setData] = useState({
    carouselData:[]
  });



  useEffect(() => {
    // EventServices.getAllEvents().then(({ message, eventsData }) => {
    //   if(message.msgError)
    //       console.log(message.msgBody);
    //   else {
    //       const carouselData = eventsData;
    //       setData({carouselData : carouselData});
    //       console.log("stuff", carouselData);
    //       console.log("events", data.carouselData);
    //   }
    // });

    bulmaCarousel.attach('#carousel-items', {
      slidesToScroll: 1,
      slidesToShow: 5,
      pagination: false
      // infinite: true
    });
  },[]);


    return(
      <section className="section">
          <div className="carousel-container">
            <div id="carousel-items" className="carousel" >
              {
                // data.carouselData.map((CarouselItem, index) =>{
                CarouselTestData.items.map((CarouselItem, index) =>{
                  return(
                  <div className="card" key={index}>
                    <div className="card-image">
                      <figure className="image is-16by9 is-covered">
                        <img
                          src={CarouselItem.image}
                          alt="" />
                      </figure>
                    </div>
                    <div className="card-content">
                      <div className="item__title">
                        {CarouselItem.name}
                      </div>
                      <div className="item__description">
                        {CarouselItem.description}
                      </div>
                    </div>
                  </div>
                  );
                })
              }
            </div> 
        </div>
      </section>
    );
}

export default Carousel;
