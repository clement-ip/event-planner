import React, { useState, useEffect } from 'react';
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";

import CarouselTestData from './CarouselTestData.json';

function Carousel() {
  const [carouselData, setCarouselData] = useState({
    carousel_data: []
  });

  // let data = props.data["items"]
  // constructor(props) {
  //     super(props)
  //     this.state = {
  //         CarouselTestData: [],
  //     }
  // }

  useEffect(() => {
    bulmaCarousel.attach('#carousel-items', {
      slidesToScroll: 1,
      slidesToShow: 6,
      pagination: false,
      infinite: true
    });

    // let path = '/getAllEvents';
    // fetch('/getAllEvents')
    //   .then(response => response.json())
    //   .then(carouselData => {
    //     const data = carouselData
    //     setCarouselData({carousel_data : data});
    //     console.log("events", data);
    //   })
    //   .catch(error => console.error(error));

  },[]); 

  // const componentDidMount = () => {
  //   bulmaCarousel.attach('#carousel-items', {
  //     slidesToScroll: 1,
  //     slidesToShow: 4,
  //     pagination: false,
  //     infinite: true
  //   });
  // }

  // render() {
    return(
      <section className="section">
        <div className="carousel-container">
          <div id="carousel-items" className="carousel">
            {
              // carouselData.carousel_data.map((CarouselItem, index) =>{
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
                        {CarouselItem.title}
                        {/* {CarouselItem.name} */}
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
  // }
}

export default Carousel;
