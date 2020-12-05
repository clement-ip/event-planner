import React from 'react';

const HostingAttendingEvents = (props) => {

    return (
        <div className="Profile_Events_Card">
            <h1><strong>Events</strong>: </h1>
            {/* NOTE: Not working b/c need to populate fields */}
            {/* <p>{props.events_data.hostingEvents}</p> */}
            {/* <p>{props.events_data.attendingEvents}</p> */}
        </div>

    )
}

export default HostingAttendingEvents;