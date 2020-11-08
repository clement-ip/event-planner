import React from "react";
import axios from "axios";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

export default class MyForm extends React.Component{

    state = {dataBaseEvents:[],
        dataBaseEventsFormatted:[],
        name: '',
        description: '',
        start_date: '',
        end_date:''}

    componentDidMount= () => {
        this.getEventData();
    }

    getEventData = ()=>{
        axios.get('/api/getAll')
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

    handleChange=({target}) =>{
        const {name, value} = target;
        this.setState({
            [name]: value
        });
        //this.setState({[name]:value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
/*
        this.state.name = e.target[0].value;
        this.state.description = e.target[1].value;
        this.state.s_date = e.target[2].value;
        this.state.e_date = e.target[3].value;
*/
        console.log(this.state)
        var event = {
            name: this.state.name,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        console.log(event)

        axios({
            url: '/api/save',
            method: 'POST',
            data: event
        })
            .then(() =>{
                console.log("data has been sent to the server");
                this.resetUserInputs();
                this.getEventData();
        })
            .catch((error) =>{
                console.log(error);
                console.log("Server Error");
        });

        //request server add event.
    }


    resetUserInputs = () =>{
        this.setState({
            name: '',
            description: '',
            start_date: '',
            end_date:''
        });
    };

    render(){
        console.log('state ', this.state)
        return(
            <div className="container">
                <div className="col1">
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            Name of Event:
                            <input type="text"
                                   name="name"
                                   value ={this.state.name}
                                   onChange={this.handleChange}/>
                        </label>
                        <br></br>
                        <label>
                            Description of event:
                            <textarea type="text"
                                      name="description"
                                      cols="30" rpws="20"
                                      value={this.state.description}
                                      onChange={this.handleChange}/>
                        </label>
                        <br></br>
                        <label>
                            Start date:
                            <input type="date"
                                   name="start_date"
                                   value={this.state.start_date}
                                   onChange={this.handleChange}/>
                        </label>
                        <br></br>
                        <label>
                            End date:
                            <input type="date"
                                   name="end_date"
                                   value={this.state.end_date}
                                   onChange={this.handleChange}/>
                        </label>
                        <br></br>
                        <input type="submit" value="Submit" />
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
        );
    }
}
