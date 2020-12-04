import React, { useState, useEffect } from 'react';
import bulmaCarousel from "bulma-carousel/dist/js/bulma-carousel.min.js";
import "bulma-carousel/src/sass/index.sass";

import EventServices from '../../Services/EventServices';
import CarouselTestData from './CarouselTestData.json';

// function formatEventData(eventList){
//   const list = [];
//   // console.log("hi",eventList);
//   eventList.forEach(function(entry){
//       // console.log("entry",entry);
//       list.push({"name": entry.name, "description":entry.description})

//   });
//   //data.dataBaseEventsFormatted = list
//   // console.log("formatted",list);
//   return list;
// }

function Carousel(props) {
  const [data, setData] = useState({
    carouselData:[]
  });

  useEffect(() => {
    bulmaCarousel.attach('#carousel-items', {
      slidesToScroll: 1,
      slidesToShow: 5,
      pagination: false,
      infinite: true
    });


  EventServices.getAllEvents().then(({ message, eventsData }) => {
    if(message.msgError)
        console.log(message.msgBody);
    else {
        const carouselData = eventsData;
        setData({carouselData : carouselData});
        console.log("stuff", carouselData);
        console.log("events", data.carouselData);
    }
  })

  // fetch('/getAllEvents')
  //   .then(response => response.json())
  //   .then(carouselData => {
  //     const data = carouselData
  //     setCarouselData({carousel_data : data});
  //     console.log("events", data);
  //   })
  //   .catch(error => console.error(error));

  },[]); 

  // console.log("stuff2", data.carouselData);

  // const EventData = data.carouselData;
  // console.log(EventData);
    console.log("HELLO", data.carouselData);
    return(
      <section className="section">
        <div className="carousel-container">
          <div id="carousel-items" className="carousel">
            { data.carouselData ? (
              // EventData.map((CarouselItem, index) =>{
              data.carouselData.map((CarouselItem, index) =>{
              // CarouselTestData.items.map((CarouselItem, index) =>{
                return (
                  <div className="card" key={index}>
                    {/* <div className="card-image">
                      <figure className="image is-16by9 is-covered">
                        <img
                          src={CarouselItem.image}
                          alt="" />
                      </figure>
                    </div> */}
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
              })) : null
            }
          </div>
        </div>
      </section>
    );
}

export default Carousel;
