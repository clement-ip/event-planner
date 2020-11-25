import React from "react";
import {Link} from "react-router-dom";

function goToEvent(){
    console.log('okay');
}


const SingleEventForList = props => (
    <div>
        { props.eventsProp.map((event) => {
            return (
                <div key ={event._id}>
                    <p>
                        <strong>Event Name</strong>: {event.name} <strong>Event Description</strong>: {event.description} <strong>Start Time</strong>: {event.start_date} <strong>End Time</strong>: {event.end_date}
                    </p>
                    <button className="goToEventButton" onClick={goToEvent}>
                    <Link to= {{
                        pathname:`/SingleEvent/${event._id}`,
                        state:{eventName: event.name}
                    }} >See More</Link>
                    </button>
                </div>
            )
        }) }
    </div>
);

export default SingleEventForList;