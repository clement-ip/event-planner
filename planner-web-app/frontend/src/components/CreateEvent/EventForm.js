import axios from "axios";
import React, {useEffect, useState} from "react";

function handleSubmit(e){
    e.preventDefault();
    console.log("good lord",e.target[14].value);

    var host_name = e.target[0].value;
    var host_id= e.target[1].value;
    var host_email= e.target[2].value;
    var host_phone_number= e.target[3].value;
    var host_organization= e.target[4].value;

    var name  = e.target[5].value;
    var description= e.target[6].value;
    var start_date_time= e.target[7].value;
    var end_date_time= e.target[8].value;
    var location_city= e.target[9].value;
    var location_country= e.target[10].value;
    var location_address= e.target[11].value;

    var requirements= e.target[12].value;
    var tags = e.target[13].value;


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
        tags: tags
    }
    console.log("event", event)

    axios({
        url: '/saveEvent',
        method: 'POST',
        data: event
    })
        .then(() =>{
            console.log("data has been sent to the server");
        })
        .catch((error) =>{
            console.log(error);
            console.log("Server Error");
        });
    window.location.reload(false)
}

function EventForm(){
    return(
        <form onSubmit={handleSubmit}>
            <h1 className="eventFormh1">Host info</h1>
            <label className = "label"  htmlFor='event_host_name'>Name:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_name"
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_host_id'>ID Number:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_id"
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_host_email'>Email:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_email"
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_host_number'>Phone Number:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_phone_number"
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_host_org'>Organization:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="host_phone_number"
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
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_description'>Description of event:</label>
            <div className="control">
                        <textarea type="text"
                                  name="description"
                                  className="textarea"
                                  placeholder="Event Description">
                        </textarea>
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_start_date'>Start date:*</label>
            <div className="control">
                <input type="datetime-local"
                       className="input"
                       name="start_date"
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_end_date'>End date:*</label>
            <div className="control">
                <input type="datetime-local"
                       className="input"
                       name="end_date"
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
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_location_country'>Country:*</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="location_country"
                       required
                />
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_location_addr'>Address:*</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="location_address"
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
                                  placeholder="Event Description">
                        </textarea>
            </div>
            <br></br>
            <label className = "label"  htmlFor='event_tags'>tags:</label>
            <div className="control">
                <input type="text"
                       className="input"
                       name="tags"
                />
            </div>
            <br></br>

            <input type="submit" value="Submit" className="flexInput"/>
        </form>

    )



}

export default EventForm;