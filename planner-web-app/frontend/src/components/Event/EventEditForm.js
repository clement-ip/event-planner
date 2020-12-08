import axios from "axios";
import React, {useEffect, useState} from "react";
import EventServices from "../../Services/EventServices";
import {changeUTCLOCAL} from "./eventDateHelper"
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

function handleSubmit(eventID){
    return e => {
        e.preventDefault();
        console.log("is this the ID",eventID);
        console.log("good lord",e.target[7].value);


        var host_name = e.target[0].value;
        var host_id= e.target[1].value;
        var host_email= e.target[2].value;
        var host_phone_number= e.target[4].value;
        var host_organization= e.target[5].value;

        var name  = e.target[6].value;
        var description= e.target[7].value;
        var start_date_time= e.target[8].value;
        var end_date_time= e.target[9].value;
        var location_city= e.target[10].value;
        var location_country= e.target[11].value;
        var location_address= e.target[12].value;

        var requirements= e.target[13].value;
        var tags = e.target[14].value;


        var event = {
            host_email: host_email,
            host_phone_number: host_phone_number,
            host_id: host_id,
            host_name: host_name,
            host_organization: host_organization,

            name: name,
            description: description,
            location_city: location_city,
            location_country: location_country,
            location_address: location_address,
            start_date_time: start_date_time,
            end_date_time: end_date_time,

            requirements: requirements,
            tags: tags,
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

// function changeUTCLOCAL(date){
//     var tryDate = new Date(date);
//     var dateString = tryDate.toLocaleDateString();
//     var timeString = tryDate.toLocaleTimeString('it-IT');
//     var splitStart = dateString.split("/")
//     console.log("what",dateString)
//     console.log("what2",timeString)
//     if(splitStart[0].length === 1){
//         var final = splitStart[2]+'-'+'0'+splitStart[0]+'-'+splitStart[1]+'T'+timeString.substring(0,5);
//     }
//     else if(splitStart[1].length === 1){
//         var final = splitStart[2]+'-'+splitStart[0]+'-'+'0'+splitStart[1]+'T'+timeString.substring(0,5);
//     }
//     else if(splitStart[1].length === 1 && splitStart[0].length === 1){
//         var final = splitStart[2]+'-'+'0'+splitStart[0]+'-'+'0'+splitStart[1]+'T'+timeString.substring(0,5);
//     }
//     else{
//         var final = splitStart[2]+'-'+splitStart[0]+'-'+splitStart[1]+'T'+timeString.substring(0,5);
//     }
//     console.log(final);
//     return final;
// }

// function convertDateTime(props){
//     // const start = props.props.start_date_time;
//     // var tryDate = new Date(start);
//     // var dateString = tryDate.toLocaleDateString();
//     // var timeString = tryDate.toLocaleTimeString('it-IT');
//     // console.log(dateString,timeString);
//     // var splitStart = dateString.split("/")
//     // console.log(splitStart);
//     // var finalStart = splitStart[2]+'-'+splitStart[0]+'-'+splitStart[1]+'T'+timeString.substring(0,5);
//     // console.log(finalStart);
//     // console.log("uhghhh",start.substring(0,16));
//     // const end = props.props.end_date_time.substring(0,16);
//     props.props.start_date_time=changeUTCLOCAL(props.props.start_date_time);
//     props.props.end_date_time=changeUTCLOCAL(props.props.end_date_time);
// }

function EventEditForm(props){
    console.log(props);
    console.log(props.props.eventID)
    const [value, setValue] = useState()
    //convertDateTime(props)
    return(
        <form onSubmit={handleSubmit(props.props.eventID)}>
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
            <label className = "label"  htmlFor='event_host_id'>ID Number:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_id"
                    //onChange={handleChange}
                       defaultValue={props.props.host_id}
                />
            </div>
            <br></br>
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
            <label className = "label"  htmlFor='event_host_number'>Phone Number:</label>
            <div className="control">
                <PhoneInput
                    className="input"
                    name="host_phone_number"
                    value={props.props.host_phone_number}
                    onChange={setValue}
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_host_org'>Organization:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_org"
                    //onChange={handleChange}
                       defaultValue={props.props.host_organization}
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
            </div>
            <br></br>
            <h1 className="eventFormh1">Location</h1>
            <label className = "label"  htmlFor='event_location_city'>City:*</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="location_city"
                    //onChange={handleChange}
                       defaultValue={props.props.location_city}
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_location_country'>Country:*</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="location_country"
                    //onChange={handleChange}
                       defaultValue={props.props.location_country}
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_location_addr'>Address:*</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="location_address"
                    //onChange={handleChange}
                       defaultValue={props.props.location_address}
                       required
                />
            </div>
            <br></br>

            <h1>Other</h1>
            <br></br>
            <label className = "label"  htmlFor='event_requirements'>Requirements:</label>
            <div className="control">
                        <textarea type="text"
                                  name="description"
                                  className="textarea"
                            //onChange={handleChange}
                                  defaultValue={props.props.requirements}>
                        </textarea>
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_tags'>tags:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="tags"
                    //onChange={handleChange}
                       defaultValue={props.props.tags}
                />
            </div>
            <br></br>

            <input type="submit" value="Submit" className="flexInput"/>
        </form>

    )



}

export default EventEditForm;