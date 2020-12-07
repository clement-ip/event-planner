import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import EventServices from '../../../Services/EventServices';
import ProfileCalendar from './ProfileCalendar';

const HostingAttendingEvents = (props) => {
    const [allEvents, setData] = useState([]);

    // const getEventsData = (events) => {
    //     var event_data = events.map((event) => { // event is ID -> find by ID
    //                             return EventServices.getSingleEvent(event.eventID)
    //                                 .then(({ message, eventData}) => {
    //                                     if(message.msgError)
    //                                         console.log(message.msgBody);
    //                                     else {
    //                                         return {
    //                                             eventID: event.eventID,
    //                                             // host_or_not: event.host_or_not,
    //                                             name: eventData.name,
    //                                             start_date_time: eventData.start_date_time,
    //                                             end_date_time: eventData.end_date_time,
    //                                         }
    //                                     }
    //                                 })
    //                             });
    //     return event_data;
    // };

    // const combinedEvents = (data) => {
    //     var attendingEvents = data.attendingEvents;
    //     var hostingEvents = data.hostingEvents;
    //     // if (attendingEvents.length != 0) {
    //     //     attendingEvents = attendingEvents.map((event) => {
    //     //         return {eventID: event, host_or_not: 0}
    //     //     })
    //     // }
    //     // if (hostingEvents.length != 0) {
    //     //     hostingEvents = hostingEvents.map((event) => {
    //     //         return {eventID: event, host_or_not: 1}
    //     //     })
    //     // }
    //     return attendingEvents.concat(hostingEvents);
    // };

    // const CalendarData

    // useEffect(() => {
    //     const concat_data = combinedEvents(props.events_data);
    //     setData( getEventsData(concat_data) );

    // },[props.events_data])

    // const returnEventsRender = (events) => {
    //     const eventsData = getEventsData(events);
    //     // console.log('Events Data:',eventsData)
        

    //     // DISPLAY EVENT CARD
    //     var retString = ""
    //     // for(var x=0; x<eventsData.length;x++){
    //     //     console.log(events[x])
    //     //     retString+=""
    //     //     retString+="<link>THE EVENT: " +events[x]+ "</link><br/>"
    //     // }
    //     // console.log(retString);
    //     // return retString;
    // }


    function returnEvents(events){
        // console.log(events.length)
        var retString = ""
        for(var x=0; x<events.length;x++){
            // console.log(events[x])
            retString+="<link>THE EVENT: " +events[x]+ "</link><br/>"
        }
        // console.log(retString);
        return retString;
    }




{/* <p className="is-size-7"><a href={`/viewProfile/${user.userID}`} className="has-text-grey">`${events[x]}` </a></p> */}
    // console.log('ATTENDING EVENTS:',props.events_data.attendingEvents);
    // console.log('ATTENDING EVENTS:',returnEventsRender(props.events_data.attendingEvents));
    return (
        <div className="ProfileUserEvents">
            <div className="Profile_Events_Card">
                <h1><strong>Events</strong>: </h1>
                {/* NOTE: Not working b/c need to populate fields */}
                {/* <p>{props.events_data.hostingEvents}</p> */}
                {/* <div>{ returnEventsRender(props.events_data.attendingEvents) }</div> */}
            </div>
            <ProfileCalendar events_data={{ attendingEvents : props.events_data.attendingEvents,
                                            hostingEvents : props.events_data.hostingEvents }}/>
        </div>


    )
}

export default HostingAttendingEvents;