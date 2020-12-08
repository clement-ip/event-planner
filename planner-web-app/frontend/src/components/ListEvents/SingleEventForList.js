import React from "react";
import {Link} from "react-router-dom";
import './ListEvents.css';
import axios from "axios";

import EventServices from '../../Services/EventServices';
import ProfileServices from "../../Services/ProfileServices";

function goToEvent(){
    console.log('okay');
}

//var toDelete;
const logDelete = e =>{
    console.log(e)//
    //GO DELETE e WHICH IS THE ID TO DELETE;
    //AXIOS
    var eventID = {
        id: e
    }
    console.log(eventID.id);

    EventServices.deleteEvent(eventID)
        .then(({ message }) => {
            if(message.msgError)
                console.log(message.msgBody);
            else {
                console.log(message.msgBody);
                window.location.reload(true);
            }
        });
    //delete from each profile that has this event in attending event.
    ProfileServices.deleteEventFromAttendeesHost(eventID)
        .then(({ message }) => {
            if(message.msgError)
                console.log(message.msgBody);
            else {
                console.log(message.msgBody);
                window.location.reload(true);
            }
        });
}

function convertTime(date){
    var time = new Date(date);
    console.log(time.toString())
    var string = time.toLocaleDateString()+' '+time.toLocaleTimeString()
    return string;
}

const SingleEventForList = props => (
    <div>
        { props.eventsProp.map((event) => {
            console.log("pewpew",props);
            return (
                <div key ={event._id} id= "containerForEvent" className="container">
                    <div className="notification is-primary">
                        <h1>ID: {event._id}</h1>
                        <p>
                            <strong>Event Name</strong>: {event.name}
                            <strong>Event Description</strong>: {event.description}
                            <strong>Start Time</strong>: {convertTime(event.start_date_time)}
                            <strong>End Time</strong>: {convertTime(event.end_date_time)}
                        </p>
                        <button className="button is-info is-light" id= "goToEventButton" onClick={goToEvent}>
                            <Link to= {{
                                pathname:`/SingleEvent/${event._id}`,
                                state:{eventName: event.name,
                                    eventDes: event.description,
                                    eventS_datetime: event.start_date,
                                    eventE_datetime: event.end_date,
                                    event_id: event._id
                                },
                            }} >See More</Link>
                        </button>
                        <button className="button is-danger is-light" id= "goToEventButton" onClick={()=>logDelete(event._id)} >
                            Delete
                        </button>
                    </div>
                </div>
            )
        }) }
    </div>
);

export default SingleEventForList;