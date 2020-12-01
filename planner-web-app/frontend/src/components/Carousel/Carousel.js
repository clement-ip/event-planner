import React from "react";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";
import CarouselTestData from './CarouselTestData.json';

class Carousel extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
          CarouselTestData: [],
      }
  }

  componentDidMount() {
    bulmaCarousel.attach('#carousel-items', {
      slidesToScroll: 1,
      slidesToShow: 4,
      pagination: false,
      infinite: true
    });
  }
  render() {
    return(
        <section className="section">
          <div className="carousel-container">
            <div id="carousel-items" className="carousel">
              {
                CarouselTestData.items.map((CarouselItem, index) =>(
                  <div className="card" key={index}>
                    <div className="card-image">
                      <figure className="image is-16by9 is-covered">
                        <img
                          src={CarouselItem.image}
                          alt="" 
                        />
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
                ))
              }
            </div>
          </div>
        </section>
    );
  }
}

export default Carousel;
