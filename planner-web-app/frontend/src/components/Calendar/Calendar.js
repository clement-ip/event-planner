import axios from "axios";
import React, {useEffect, useState} from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";




function formatEventData(eventList){
    const list = [];
    console.log("hi",eventList);
    eventList.forEach(function(entry){
        console.log("entry",entry);
        list.push({title: entry.name, "start":entry.start_date_time, "end":entry.end_date_time})

    });
    //data.dataBaseEventsFormatted = list
    console.log("formatted",list);
    return list;
}



function Calendar(props){

    console.log("the props",props.calendarProp);
    var data = formatEventData(props.calendarProp);

    return(
        <FullCalendar plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
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
            //eventColor='#378006'
                      timeZone="local"
                      eventTextColor='#fff'
                      events={data}
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
    )

}


export default Calendar;