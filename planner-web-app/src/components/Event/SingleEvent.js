import React, {useEffect, useState} from "react";
import "./Event.css"


function SingleEvent(props){

    console.log(props);

    return(

        <div>
            <h1 className="title is-1">Single Event Comp for: {props.location.state.eventName}</h1>
            <p>
                <strong>Event Description</strong>: {props.location.state.eventDes} <br></br>
                <strong>Start Time</strong>: {props.location.state.eventS_datetime} <br></br>
                <strong>End Time</strong>: {props.location.state.eventE_datetime}
            </p>
        </div>

    )

}



export default SingleEvent;