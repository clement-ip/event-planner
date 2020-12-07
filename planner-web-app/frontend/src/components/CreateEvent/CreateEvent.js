import React, {useEffect, useState} from "react";
import axios from "axios";

import Calendar from '../Calendar/Calendar'
import './EventForm.css';
import './EventFormBulma.sass';
import EventForm from "./EventForm";

import EventServices from '../../Services/EventServices';

function EventCalendar(){

    // const [data, setData] = useState({
    //     dataBaseEvents:[]
    // });

    // useEffect(()=> {
    //     console.log('okay');

    //     EventServices.getAllEvents().then(({ message, eventsData }) => {
    //         if(message.msgError)
    //             console.log(message.msgBody);
    //         else {
    //             const dataBaseEvents = eventsData;
    //             setData({ dataBaseEvents : dataBaseEvents });
    //         }
    //     })
    // }, []);


    return(
        <div className="columns" style={{minHeight : "100vh"}}>
            <div className="column is-one-fifth has-background-white-bis">
                <div className="menu px-3">
                    <p className="menu-label my-0 is-size-3">Create Event</p>
                    <ul className="menu-list ml-4">
                        <li><a>Title</a></li>
                        <li><a>Duration</a></li>
                        <li>
                            <a>Details</a>
                            <ul>
                                <li><a>Description</a></li>
                                <li><a>Genres</a></li>
                            </ul>
                        </li>
                        <li><a>Contact</a></li>
                    </ul>
                </div>  
            </div>
            <div className="column card">
                <div className="columns">
                    <div className="column is-5 is-offset-one-quarter">
                        <div className="container is-5">
                            <EventForm></EventForm>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EventCalendar;