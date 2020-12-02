import React, { useState, useEffect } from 'react';
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";

import CarouselTestData from './CarouselTestData.json';

function Carousel(props) {
  const [carouselData, setCarouselData] = useState(null);

  // let data = props.data["items"]
  // constructor(props) {
  //     super(props)
  //     this.state = {
  //         CarouselTestData: [],
  //     }
  // }

  useEffect(() => {
    // let path = './CarouselTestData.json';
    // fetch(path)
    //   .then(res => res.json())
    //   .then(carouselData => setCarouselData(carouselData))


    bulmaCarousel.attach('#carousel-items', {
      slidesToScroll: 1,
      slidesToShow: 6,
      pagination: false,
      infinite: true
    });

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
              // carouselData && carouselData.items.map((CarouselItem, index) =>{
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
