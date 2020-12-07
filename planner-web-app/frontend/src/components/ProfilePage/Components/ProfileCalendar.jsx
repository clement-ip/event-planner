import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import EventServices from '../../../Services/EventServices'
import Calendar from '../../Calendar/Calendar'

const ProfileCalendar = (props) => {
    const [Events, setData] = useState([]);

    const combinedEvents = (data) => {
        var attendingEvents = data.attendingEvents;
        var hostingEvents = data.hostingEvents;
        // if (attendingEvents.length != 0) {
        //     attendingEvents = attendingEvents.map((event) => {
        //         return {eventID: event, host_or_not: 0}
        //     })
        // }
        // if (hostingEvents.length != 0) {
        //     hostingEvents = hostingEvents.map((event) => {
        //         return {eventID: event, host_or_not: 1}
        //     })
        // }
        return attendingEvents.concat(hostingEvents);
    };

    // const getEventsData = (events) => {
    //     var event_data = 

    //     return event_data;
    // };

    useEffect(() => {
        const concat_data = combinedEvents(props.events_data);

        concat_data.map((event) => { // event is ID -> find by ID
            // return EventServices.getSingleEvent(event.eventID)
            return EventServices.getSingleEvent(event)
                .then(({ message, eventData}) => {
                    if(message.msgError)
                        console.log(message.msgBody);
                    else {
                        setData([... Events, eventData])
                    }
                })
        });


        // setData( getEventsData(concat_data) );

        // console.log('ALL EVENTS:', allEvents[0]);

    },[props.events_data])


    // console.log('ALL EVENTS:',combinedEvents(props.events_data));

    return (
        <div className="ProfileCalendar">
            <Calendar calendarProp={Events}></Calendar>
        </div>


    )
}

export default ProfileCalendar;