import axios from "axios";
import React, {useEffect, useState} from "react";
import EventServices from "../../Services/EventServices";
import {changeUTCLOCAL} from "./eventDateHelper"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function handleSubmit(eventID,hostID){
    return e => {
        e.preventDefault();
        console.log("is this the ID",eventID);
        console.log("good lord",e.target[3].value);

        var host_id= hostID;
        var host_name = e.target[0].value;
        var host_email= e.target[1].value;
        var name  = e.target[2].value;
        var description= e.target[3].value;
        var start_date_time= e.target[4].value;
        var end_date_time= e.target[5].value;

        var event = {
            host_email: host_email,
            host_id: host_id,
            host_name: host_name,
            name: name,
            description: description,
            start_date_time: start_date_time,
            end_date_time: end_date_time,
            eventID:eventID
        }
        console.log("event", event)

        EventServices.editEvent(event)
            .then(({ message }) => {
                console.log(message.msgBody);
                window.location.reload(false);
            });
    }
}



function EventEditForm(props){
    console.log(props);
    console.log(props.props.eventID)
    const [value, setValue] = useState()
    //convertDateTime(props)
    return(
        <form onSubmit={handleSubmit(props.props.eventID,props.props.host_id)}>
            <h1 className="eventFormh1">Host info</h1>
            <label className = "label"  htmlFor='event_host_name'>Name:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_name"
                    //onChange={handleChange}
                       defaultValue={props.props.host_name}
                />
            </div>
            <br></br>
{/*//                       defaultValue={props.props.host_id}*/}
            <label className = "label"  htmlFor='event_host_email'>Email:</label>
            <div className="control">
                <input type="email"
                       className="input"
                       name="host_email"
                    //onChange={handleChange}
                       defaultValue={props.props.host_email}
                />
            </div>
            <br></br>

            <h1 className="eventFormh1">Event Info</h1>
            <label className = "label" htmlFor='event_name'>Name of Event:*</label>
            <div className="control">
                <input type="text"
                       name="name"
                       className="input"
                       placeholder="Event Name"
                    //onChange={handleChange}
                       defaultValue={props.props.name}
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_description'>Description of event:</label>
            <div className="control">
                        <textarea type="text"
                                  name="description"
                                  className="textarea"
                            //onChange={handleChange}
                                  defaultValue={props.props.description}>
                        </textarea>
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_start_date'>Start date:*</label>
            <div className="control">
                <input type="datetime-local"
                       className="input"
                       name="start_date"
                    //onChange={handleChange}
                       defaultValue={changeUTCLOCAL(props.props.start_date_time)}
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_end_date'>End date:*</label>
            <div className="control">
                <input type="datetime-local"
                       className="input"
                       name="end_date"
                    //onChange={handleChange}
                       defaultValue={changeUTCLOCAL(props.props.end_date_time)}
                       required
                />
            <br></br>
            </div>
            <input type="submit" value="Submit" className="flexInput"/>
        </form>

    )



}

export default EventEditForm;