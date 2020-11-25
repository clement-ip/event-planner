import React, {useEffect, useState} from "react";



function SingleEvent(props){

    console.log(props);

    return(
        <div>Single Event Comp for: {props.location.state.eventName}</div>
    )

}



export default SingleEvent;