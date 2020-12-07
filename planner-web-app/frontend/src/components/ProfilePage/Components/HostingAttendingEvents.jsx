import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import EventServices from '../../../Services/EventServices';
import Calendar from '../../Calendar/Calendar'
import EventCard from './EventCard'


const HostingAttendingEvents = (props) => {
    const [Events, setData] = useState([]);
    const [lengths, setLength] = useState([]);

    const combinedEvents = (data) => data.attendingEvents.concat(data.hostingEvents);

    const checkPastEvents = (events) => {
        const today = ((new Date()).getDate() - 1);
        for (let i = 0; i < events.length; i++) {
            const compare_date = new Date(events[i].start_date_time).getTime();
            if (compare_date < today) {
                return true;
            }
        }
        return false;
    }

    const PastEvents = (events) => {
        return events.map((event, index) => {
                    const compare_date = new Date(event.start_date_time).getTime();
                    const today = ((new Date()).getDate() - 1);
                    if (compare_date < today) {
                        return (
                            <EventCard data={event} key={index}></EventCard>
                        )
                    }
        })
    };

    const AttendingEvents = (events) => {
        return events.map((event, index) => {
            const compare_date = new Date(event.start_date_time).getTime();
            const today = ((new Date()).getDate() - 1);
            if (compare_date >= today) {
                if (props.events_data.attendingEvents.includes(event._id)) {
                    return (
                        <EventCard data={event} key={event._id}/>
                    );
                }
            }
        })
    };

    const HostingEvents = (events) => {
        return events.map((event, index) => {
            const compare_date = new Date(event.start_date_time).getTime();
            const today = ((new Date()).getDate() - 1);
            if (compare_date >= today) {
                if (props.events_data.hostingEvents.includes(event._id)) {
                    return (
                        <EventCard data={event} key={index}/>
                    );
                }
            }
        })
    };
    const today = ((new Date()).getDate() - 1);

    
    useEffect(() => {
        const concat_data = combinedEvents(props.events_data);
        console.log('hosting events length',props.events_data.hostingEvents.length)
        console.log('attending events length',props.events_data.attendingEvents.length)
        setLength([props.events_data.hostingEvents.length, props.events_data.attendingEvents.length])
        concat_data.map((event) => { // event is ID -> find by ID
            return EventServices.getSingleEvent(event)
                .then(({ message, eventData}) => {
                    if(message.msgError)
                        console.log(message.msgBody);
                    else {
                        // console.log(eventData)
                        setData(Events => [... Events,eventData])
                    }
                })
        });
    },[props.events_data])

{/* <p className="is-size-7"><a href={`/viewProfile/${user.userID}`} className="has-text-grey">`${events[x]}` </a></p> */}
    // console.log('ATTENDING EVENTS:',props.events_data.attendingEvents);
    // console.log('ATTENDING EVENTS:',returnEventsRender(props.events_data.attendingEvents));
    return (
        <div className="ProfileEventsDisplay">
            { props.events_data.hostingEvents.length > 0 &&
                (<h1><strong>Hosting Events</strong>: </h1>)
            }
            {HostingEvents(Events)}

            { props.events_data.attendingEvents.length > 0 &&
                (<h1><strong>Attending Events</strong>: </h1>)
            }
            {/* <EventCard data={Events} key={Events}/> */}
            {AttendingEvents(Events)}

            { checkPastEvents(Events) === true &&
                (<h1><strong>Past Events</strong>: </h1>)
            }
            {PastEvents(Events)}

            <div className="ProfileCalendar">
                <Calendar calendarProp={Events}></Calendar>
            </div>
        </div>
    )
}

export default HostingAttendingEvents;