import React from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

export default class DemoApp extends React.Component {

    state = {
        weekendsVisible: true,
        currentEvents: [
            { title: 'Meeting 1', date: '2020-11-01' },
            { title: 'Meeting 2', date: '2020-11-02' },
            { title: 'Meeting 3', date: '2020-11-04' },
            { title: 'Meeting 5', "start": '2020-11-06', "end":'2020-11-10'}
        ]
    };

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
                        initialView='dayGridMonth'
                        editable={true}
                        selectable={true}
                        selectMirror={true}
                        dayMaxEvents={true}
                        events={this.state.currentEvents}
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

