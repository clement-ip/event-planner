import React, {useEffect, useState} from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"


function SingleEvent(props){

    console.log("HEREEEE: ", props);

    return(

        <div>
            <h1 className="title is-1">Single Event Comp for: {props.location.state.eventName}</h1>
            <p>
                <strong>Event Description</strong>: {props.location.state.eventDes} <br></br>
                <strong>Start Time</strong>: {props.location.state.eventS_datetime} <br></br>
                <strong>End Time</strong>: {props.location.state.eventE_datetime}
                <CommentBox data={props.location.state.event_id}></CommentBox>
            </p>
        </div>

    )

}



export default SingleEvent;