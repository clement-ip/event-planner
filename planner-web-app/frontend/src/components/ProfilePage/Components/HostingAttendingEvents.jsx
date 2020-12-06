import React from 'react';

const HostingAttendingEvents = (props) => {

    function returnEvents(events){
        console.log(events.length)
        var retString = ""
        for(var x=0; x<events.length;x++){
            console.log(events[x])
            retString+="<link>THE EVENT: " +events[x]+ "</link><br/>"
        }
        console.log(retString);
        return retString;
    }


    return (
        <div className="Profile_Events_Card">
            <h1><strong>Events</strong>: </h1>
            {/* NOTE: Not working b/c need to populate fields */}
            {/* <p>{props.events_data.hostingEvents}</p> */}
             <div>{returnEvents(props.events_data.attendingEvents)}</div>
        </div>

    )
}

export default HostingAttendingEvents;