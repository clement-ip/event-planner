import React, { useState, useEffect } from 'react';
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";

import EventServices from '../../Services/EventServices';
import CarouselTestData from './CarouselTestData.json';

function Carousel() {
  const [data, setData] = useState({
    carouselData: []
  });

  useEffect(() => {
    bulmaCarousel.attach('#carousel-items', {
      slidesToScroll: 1,
      slidesToShow: 5,
      pagination: false,
      infinite: true
    });


  // EventServices.getAllEvents().then(({ message, eventsData }) => {
  //   if(message.msgError)
  //       console.log(message.msgBody);
  //   else {
  //       const carouselData = eventsData;
  //       setData({ carouselData : carouselData });
  //       console.log("events", carouselData);
  //   }
  // })

    // fetch('/getAllEvents')
    //   .then(response => response.json())
    //   .then(carouselData => {
    //     const data = carouselData
    //     setCarouselData({carousel_data : data});
    //     console.log("events", data);
    //   })
    //   .catch(error => console.error(error));

  },[]); 

    return(
      <section className="section">
        <div className="carousel-container">
          <div id="carousel-items" className="carousel">
            {
              // data.carouselData.map((CarouselItem, index) =>{
              CarouselTestData.items.map((CarouselItem, index) =>{
                return (
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
