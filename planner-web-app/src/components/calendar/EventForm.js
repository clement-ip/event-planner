import React, {useEffect, useState} from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import './EventForm.css'

function EventCalendar(){

    const [data, setData] = useState({
        dataBaseEvents:[],
        dataBaseEventsFormatted:[],
        name:'',
        description:'',
        start_date:'',
        end_date:'',
    });

    useEffect(()=> {
        fetch('/getAllCalEvents')
            .then(response => response.json())
            .then(data => {
                console.log("Get response: ", data);
                //setData(data);
                const dataBaseEvents = data
                setData({dataBaseEvents : dataBaseEvents});
                console.log("Calendar data has been populated")
                console.log("events",dataBaseEvents);
                const formatted = formatEventData(dataBaseEvents);
                setData({dataBaseEventsFormatted : formatted});
            })
            .catch(error => console.error(error));

    }, []);

    function fetchCalEventData(){
        fetch('/getAllCalEvents')
            .then(response => response.json())
            .then(data => {
                console.log("Get response: ", data);
                //setData(data);
                const dataBaseEvents = data
                setData({dataBaseEvents : dataBaseEvents});
                console.log("Calendar data has been populated")
                console.log("events",dataBaseEvents);
                const formatted = formatEventData(dataBaseEvents);
                setData({dataBaseEventsFormatted : formatted});
            })
    }


    function formatEventData(eventList){
        const list = [];
        console.log("hi",eventList);
        eventList.forEach(function(entry){
            console.log("entry",entry);
            list.push({title: entry.name, "start":entry.start_date, "end":entry.end_date})

        });
        //data.dataBaseEventsFormatted = list
        console.log("formatted",list);
        return list;
    }


    function handleSubmit(e){
        e.preventDefault();
        console.log(e.target[0].value)

        var name = e.target[0].value;
        var description = e.target[1].value;
        var s_date = e.target[2].value;
        var e_date = e.target[3].value;

        var event = {
            name: name,
            description: description,
            start_date: s_date,
            end_date: e_date
        }
        console.log("event", event)

        axios({
            url: '/saveCalEvent',
            method: 'POST',
            data: event
        })
            .then(() =>{
                console.log("data has been sent to the server");
                //resetUserInputs();
                //this.getEventData();
                e.target[0].value = '';
                e.target[1].value = '';
                e.target[2].value = '';
                e.target[3].value = '';
                fetchCalEventData();
        })
            .catch((error) =>{
                console.log(error);
                console.log("Server Error");
        });

    }


    return(
        <div className="container">
            <div className="col1">
                <form onSubmit={handleSubmit}>
                    <label htmlFor='event_name'>Name of Event:</label>
                    <input type="text"
                           name="name"
                           className="flexInput"

                    />
                    <br></br>
                    <label htmlFor='event_description'>Description of event:</label>
                    <input type="text"
                           name="description"
                           className="flexInput"

                    />
                    <br></br>
                    <label htmlFor='event_start_date'>Start date:</label>
                    <input type="date"
                           className="flexInput"
                           name="start_date"

                    />
                    <br></br>
                    <label htmlFor='event_end_date'>End date:</label>
                    <input type="date"
                           className="flexInput"
                           name="end_date"

                    />
                    <br></br>
                    <input type="submit" value="Submit" className="flexInput"/>
                </form>
            </div>
            <div className="col2">
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    headerToolbar={{
                        left: 'prev,next today',
                        center: 'title',
                        right: 'dayGridMonth,timeGridWeek,timeGridDay'
                    }}
                    contentHeight='auto'
                    initialView='dayGridMonth'
                    editable={true}
                    selectable={true}
                    selectMirror={true}
                    dayMaxEvents={true}
                    events={data.dataBaseEventsFormatted}
                    //weekends={this.state.weekendsVisible}
                    //initialEvents={INITIAL_EVENTS} // alternatively, use the `events` setting to fetch from a feed
                    //select={this.handleDateSelect}
                    //eventContent={renderEventContent} // custom render function
                    //eventClick={this.handleEventClick}
                    //eventsSet={this.handleEvents} // called after events are initialized/added/changed/removed
                    /* you can update a remote database when these fire:
                    eventAdd={function(){}}
                    eventChange={function(){}}
                    eventRemove={function(){}}
                    */
                />
            </div>
        </div>
    );
}

export default EventCalendar;