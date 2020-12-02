import React, {useEffect, useState} from "react";
import axios from "axios";

import Calendar from '../Calendar/Calendar'
import './EventForm.css';
import './EventFormBulma.sass';
import EventForm from "./EventForm";

import EventServices from '../../Services/EventServices';

function EventCalendar(){

    const [data, setData] = useState({
        dataBaseEvents:[]
    });

    useEffect(()=> {
        console.log('okay');

        EventServices.getAllEvents().then(({ message, eventsData }) => {
            if(message.msgError)
                console.log(message.msgBody);
            else {
                const dataBaseEvents = eventsData;
                setData({ dataBaseEvents : dataBaseEvents });
            }
        })

        // fetch('/getAllEvents')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("Get response: ", data);
        //         const dataBaseEvents = data
        //         setData({dataBaseEvents : dataBaseEvents});
        //         console.log("Calendar data has been populated")
        //         console.log("events",dataBaseEvents);
        //     })
        //     .catch(error => console.error(error));

    }, []);


    return(
        <div className="columns2">
            <div className="column1">
                <EventForm></EventForm>
            </div>
            <div className="column2">
                <Calendar calendarProp={data.dataBaseEvents}></Calendar>
            </div>
        </div>
    );
}

export default EventCalendar;