import React, { useCallback, useContext } from "react";
import { useForm } from 'react-hook-form';

import EventServices from '../../Services/EventServices';
import PhoneInput from 'react-phone-number-input'

import FormError from './FormErrors';
import AuthServices from '../../Services/AuthServices';
import { AuthContext } from "../../Context/AuthContext";

// function handleSubmit(e){
//     e.preventDefault();
//     console.log('does this one work?')
//     console.log("good lord",e);

//     var host_name = e.target[0].value;
//     // var host_id= e.target[1].value;
//     var host_email= e.target[2].value;
//     // var host_phone_number= e.target[4].value;
//     // var host_organization= e.target[5].value;


//     var name  = e.target[6].value;
//     var description= e.target[7].value;
//     var start_date_time= e.target[8].value;
//     var end_date_time= e.target[9].value;
//     // var location_city= e.target[10].value;
//     // var location_country= e.target[11].value;
//     // var location_address= e.target[12].value;

//     var requirements= e.target[13].value;
//     var tags = e.target[14].value;


//     var event = {
//         host_email: host_email,
//         // host_phone_number: host_phone_number,
//         // host_id: host_id,
//         host_name: host_name,
//         // host_organization: host_organization,

//         name: name,
//         description: description,
//         // location_city: location_city,
//         // location_country: location_country,
//         // location_address: location_address,
//         start_date_time: start_date_time,
//         end_date_time: end_date_time,

//         requirements: requirements,
//         tags: tags
//     }
//     console.log("event", event)

//     EventServices.saveEvent(event)
//         .then(({ message }) => {
//             console.log(message.msgBody);
//             window.location.reload(false);
//         });
// }


const EventForm = ({ formRefs, fullFormRef }) => {
    const { register, handleSubmit, errors, setError, clearErrors } = useForm();
    const { user } = useContext(AuthContext);

    const onSubmitHandler = (data) => {
        const { title, startDate, endDate, description, contact } = data;
        console.log(user)
        const eventData = {
            name : title,
            description : description,
            host_name : user.name,
            host_email : user.email,
            hostID: user.userID,
            start_date_time : startDate,
            end_date_time : endDate,
            attendee_IDs : '',
        }
        contact && (eventData.host_email = user.email);

        console.log(eventData);

        EventServices.saveEvent(eventData)
        .then(({ message }) => {
            console.log(message.msgBody);
        });

    }

    return (
        <form className="pt-6" onSubmit={handleSubmit(onSubmitHandler)} id="createEventForm">
            <div className="field mx-5" ref={formRefs.title}>
                <label className="label is-size-2 my-0">Title</label>
                <label className="is-size-6">Give your event a name?</label>
                <div className="control">
                    <input className={"input py-5 " + (errors.title ? "is-danger" : "is-info")} type="text" placeholder="Title of event" name="title" ref={register({ required: true })}></input>
                    <FormError err={errors.title} />
                </div>
            </div>
            <div className="field mx-5 is-hidden" ref={formRefs.duration}>
                <label className="label is-size-2 my-0">Duration</label>
                <label className="is-size-6">When will you be hosting your session?</label>
                <label className="label">Starting</label>
                <div className="control">
                    <input className={"input py-5 " + (errors.startDate ? "is-danger" : "is-info")} type="datetime-local" placeholder="Select start time" name="startDate" ref={register({ required: true })}></input>
                    <FormError err={errors.startDate} />
                </div>
                <label className="label">Ending</label>
                <div className="control">
                    <input className={"input py-5 " + (errors.endDate ? "is-danger" : "is-info")} type="datetime-local" placeholder="Select end time" name="endDate" ref={register({ required: true })}></input>
                    <FormError err={errors.endDate} />
                </div>
            </div>
            <div className="field mx-5 is-hidden" ref={formRefs.description}>
                <label className="label is-size-2 my-0">Description</label>
                <label className="is-size-6">What will your event be about?</label>
                <div className="control my-3">
                    <textarea className={"textarea py-5" + (errors.description ? "is-danger" : "is-info")} placeholder="Give a little teaser..." name="description" ref={register({ required: true })}/>
                    <FormError err={errors.description} />
                </div>
            </div>
            <div className="field mx-5 is-hidden" ref={formRefs.contact}>
                <label className="label is-size-2 my-0">Contact Information</label>
                <label className="label is-size-6">Would you like to display your email?</label>
                <div className="control">
                    <label className="checkbox">
                        <input type="checkbox" placeholder="Title of event" name="contact" ref={register()}/>
                            Yes display my contact information
                    </label>
                </div>
            </div>
        </form>
    );
}
 
export default EventForm;


// function EventForm(){
//     const { register, handleSubmit, errors, setError, clearErrors } = useForm();
//     const [value, setValue] = useState()
//     return(
//         <form onSubmit={handleSubmit(onSubmitHandler)}>

//         </form>


        // <form onSubmit={handleSubmit}>
        //     {/* <h1 className="eventFormh1">Host info</h1> */}
        //     {/* <label className = "label"  htmlFor='event_host_name'>Name:</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="host_name"
        //         />
        //     </div>
        //     <br></br> */}
        //     {/* <label className = "label"  htmlFor='event_host_id'>ID Number:</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="host_id"
        //         />
        //     </div>
        //     <br></br> */}
        //     {/* <label className = "label"  htmlFor='event_host_email'>Email:</label>
        //     <div className="control">
        //         <input type="email"
        //                className="input"
        //                name="host_email"
        //         />
        //     </div>
        //     <br></br> */}
        //     {/* <label className = "label"  htmlFor='event_host_number'>Phone Number:</label>
        //     <div className="control">
        //         <PhoneInput
        //                className="input"
        //                name="host_phone_number"
        //                value={value}
        //                onChange={setValue}
        //         />
        //     </div>
        //     <br></br> */}
        //     {/* <label className = "label"  htmlFor='event_host_org'>Organization:</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="host_org"
        //         />
        //     </div>
        //     <br></br> */}


        //     <h1 className="eventFormh1">Event Info</h1>
        //     <label className = "label" htmlFor='event_name'>Name of Event:*</label>
        //     <div className="control">
        //         <input type="text"
        //                name="name"
        //                className="input"
        //                placeholder="Event Name"
        //                required
        //         />
        //     </div>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_description'>Description of event:</label>
        //     <div className="control">
        //                 <textarea type="text"
        //                           name="description"
        //                           className="textarea"
        //                           placeholder="Event Description">
        //                 </textarea>
        //     </div>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_start_date'>Start date:*</label>
        //     <div className="control">
        //         <input type="datetime-local"
        //                className="input"
        //                name="start_date"
        //                required
        //         />
        //     </div>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_end_date'>End date:*</label>
        //     <div className="control">
        //         <input type="datetime-local"
        //                className="input"
        //                name="end_date"
        //                required
        //         />
        //     </div>
        //     <br></br>
        //     {/* <h1 className="eventFormh1">Location</h1>
        //     <label className = "label"  htmlFor='event_location_city'>City:*</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="location_city"
        //                required
        //         />
        //     </div>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_location_country'>Country:*</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="location_country"
        //                required
        //         />
        //     </div>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_location_addr'>Address:*</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="location_address"
        //                required
        //         />
        //     </div>
        //     <br></br> */}

        //     <h1>Other</h1>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_requirements'>Requirements:</label>
        //     <div className="control">
        //                 <textarea type="text"
        //                           name="description"
        //                           className="textarea"
        //                           placeholder="Event Description">
        //                 </textarea>
        //     </div>
        //     <br></br>
        //     <label className = "label"  htmlFor='event_tags'>tags:</label>
        //     <div className="control">
        //         <input type="text"
        //                className="input"
        //                name="tags"
        //         />
        //     </div>
        //     <br></br>

        //     <input type="submit" value="Submit" className="flexInput"/>
        // </form>

    // )
// }

// export default EventForm;