import React, { useState, useContext, useEffect, } from 'react';

const HostingAttendingEvents = (props) => {
    const [data, setData] = useState({
        HostingEvents:[],
        AttendingEvents:[],
    });

    useEffect(()=> {
        const about_info = props.About;
        setData({ about:about_info });

    })
    return (
        <div className="Profile_Events_Card">
            <h1>Events</h1>
            <p>{data.about}</p>
        </div>

    )
}

export default HostingAttendingEvents;