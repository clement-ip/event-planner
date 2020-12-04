import React from "react";
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";

class Carousel extends React.Component {
  componentDidMount() {
    bulmaCarousel.attach('#carousel-items', {
			slidesToScroll: 1,
            slidesToShow: 2,
            infinite: true
	});
  }
  render() {
    return (
      <section className="section">
			<div className="container">
				<div id="carousel-items" className="carousel">
					<div className="item-1">
                        <img className="is-background" src="https://bulma.io/images/placeholders/800x480.png" alt="" width="640" height="310" />
                        <div className="title">
                            Placeholder Imgae
                        </div>
					</div>
					<div className="item-2">
                        <img className="is-background" src="https://wikiki.github.io/images/singer.jpg" alt="" width="640" height="300" />
                        <div className="title">
                            Original Gift: Offer a song with 
                            <a href="https://lasongbox.com" target="_blank">
                                La Song Box
                            </a>
                        </div>
					</div>
					<div className="item-3">
                        <img className="is-background" src="https://wikiki.github.io/images/sushi.jpg" alt="" width="640" height="300" />
                        <div className="title">
                            Sushi time
                        </div>
					</div>
				</div>
			</div>
		</section>
    );
  }
}

export default Carousel;
