import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import axios from 'axios';

export default class EventCalendar extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: [
            { title: 'Meeting 1', date: '2020-11-01' },
            { title: 'Meeting 2', date: '2020-11-02' },
            { title: 'Meeting 3', date: '2020-11-04' },
            { title: 'Meeting 5', "start": '2020-11-06', "end":'2020-11-10'}
        ],
        dataBaseEvents:[],
        dataBaseEventsFormatted:[]
    };



    componentDidMount= () => {
        this.getEventData();
    }

    getEventData = ()=>{
        axios.get('/api')
            .then((response)=>{
                const data = response.data;
                this.setState({dataBaseEvents:data});
                console.log('Data has been populated');
                console.log(this.state.dataBaseEvents);
                //this.state.dataBaseEvents.forEach(this.formatEventData(entry));
                this.formatEventData();
                })
            .catch(()=>{
                alert('Error retrieving data')
            })

    }

    formatEventData(){
        const list = [];
        this.state.dataBaseEvents.forEach(function(entry){
            list.push({title: entry.name, "start":entry.start_date, "end":entry.end_date})
            console.log(entry);
        });
        this.setState({dataBaseEventsFormatted : list});
        console.log(this.state.dataBaseEventsFormatted);
    }

    render() {

        return (
            <div className='demo-app'>
                <div className='demo-app-main'>
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
                        events={this.state.dataBaseEventsFormatted}
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
        )
    }
}


