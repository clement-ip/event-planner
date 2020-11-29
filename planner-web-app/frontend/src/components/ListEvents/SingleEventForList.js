import React from "react";
import {Link} from "react-router-dom";
import './ListEvents.css';
import axios from "axios";
function goToEvent(){
    console.log('okay');
}

//var toDelete;
const logDelete = e =>{
    console.log(e)//
    //GO DELETE e WHICH IS THE ID TO DELETE;
    //AXIOS
    var eventToDelete = {
        id: e
    }
    console.log(eventToDelete.id);
    axios({
        url: '/deleteEvent',
        method: 'DELETE',
        data: eventToDelete
    })
        //.then(response => response.json())
        .then(response => {
            console.log('DONE DELETING 1');
            window.location.reload(true);
        })
        .catch(error => console.error(error));
    console.log('DONE DELETING');
    window.location.reload(true);
}

const SingleEventForList = props => (
    <div>
        { props.eventsProp.map((event) => {
            return (
                <div key ={event._id} id= "containerForEvent" className="container">
                    <div className="notification is-primary">
                        <h1>ID: {event._id}</h1>
                        <p>
                            <strong>Event Name</strong>: {event.name} <strong>Event Description</strong>: {event.description} <strong>Start Time</strong>: {event.start_date} <strong>End Time</strong>: {event.end_date}
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