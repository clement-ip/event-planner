import React, {useEffect, useState, useContext } from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";
import EventEditForm from './EventEditForm'
import SingleEventAttendees from './SingleEventAttendees';

import EventServices from '../../Services/EventServices';
import EyesonServices from '../../Services/EyesonServices';
import ProfileServices from "../../Services/ProfileServices";
import Footer from '../Footer';

function SingleEvent(props){

    const {user} = useContext(AuthContext);
    const url = window.location.href;
    const [data, setData] = useState({
        dataBaseEvents: [],
        //dataBaseEventsFormatted:[],
        eventID:'',
        name: '',
        description: '',
        location_city: '',
        location_country: '',
        location_address: '',
        requirements: '',
        host_email: '',
        host_phone_number: '',
        host_id: '',
        host_organization: '',
        tags: '',  //change to [String] and maybe implement react-tag-input
        attendee_id: [],
        start_date_time: '',
        end_date_time: '',
        editState: false
    });


    useEffect(()=> {
        const eventID = props.match.params.id;
        EventServices.getSingleEvent(eventID)
            .then(({ message, eventData}) =>{
                if(message.msgError)
                    console.log(message.msgBody);
                else {
                    console.log(eventData);
                    setData({
                        eventID: eventID,
                        name: eventData.name,
                        description: eventData.description,
                        host_email: eventData.host_email,
                        host_id: eventData.host_id,
                        host_name: eventData.host_name,
                        start_date_time: eventData.start_date_time,
                        end_date_time: eventData.end_date_time,
                        attendee_id: eventData.attendee_id
                    });
                }
                console.log("data has been fetched", data);
            })
    }, [props.match.params.id]);

    function convertTime(date){
        var time = new Date(date);
        console.log(time.toString())
        var string = time.toLocaleDateString()+' '+time.toLocaleTimeString()
        return string;
    }


    function toggleEditOn(){
        console.log('toggle on ',data);
        setData({editState: true,
            eventID: data.eventID,
            name:data.name,
            description: data.description,
            host_email: data.host_email,
            host_id: data.host_id,
            host_name: data.host_name,
            start_date_time: data.start_date_time,
            end_date_time: data.end_date_time,
            attendee_id: data.attendee_id
        })
    }

    function toggleEditOff(){
        console.log('toggle off',data);
        setData({editState: false,
            eventID: data.eventID,
            name:data.name,
            description: data.description,
            host_email: data.host_email,
            host_id: data.host_id,
            host_name: data.host_name,
            start_date_time: data.start_date_time,
            end_date_time: data.end_date_time,
            attendee_id: data.attendee_id
        })
    }

    const joinConferenceHandler = () => {
        const data = { exit_url : url, user : "user", eventID : props.match.params.id };
        console.log("printing in here: ", data);
        EyesonServices.join(data).then(res => {
            const gui_link = res.links.gui;
            console.log(gui_link);
            window.location.replace(gui_link);
        })
    }

    function joinEvent(){
        console.log("Event id ", data.eventID);
        console.log("User id ",user.userID);
        var body = {
            user_id: user.userID,
            event_id: data.eventID
        }
        console.log(body);
        ProfileServices.addEventToUserProfile(body)
            .then(res => {
                console.log('RES in event addition to profile',res)
                if (res.status === "Error") {
                    console.log("event cannot be added")
                }
                else {
                    console.log("Successfully added event to profile :", res.data)
                    // window.location.replace('/profile')
                    EventServices.addAttendeeToEvent(body)
                        .then(res => {
                            console.log('RES in Attendee addition to Event',res)
                            if (res.status === "Error") {
                                console.log("User & event cannot be added")
                            }
                            else {
                                console.log("Successfully added attendee to event :", res.data)
                                // window.location.replace('/profile')
                                window.alert("You have Successfully joined the event!")
                            }
                        })
                }
            })

        
    }



    //var toDelete;
    const logDelete = e =>{
        console.log(e)//
        //GO DELETE e WHICH IS THE ID TO DELETE;
        //AXIOS
        var eventID = {
            id: e
        }
        console.log(eventID.id);

        EventServices.deleteEvent(eventID)
            .then(({ message }) => {
                if(message.msgError)
                    console.log(message.msgBody);
                else {
                    console.log(message.msgBody);
                    //window.location.reload(true);
                }
            });
        //delete from each profile that has this event in attending event.
        ProfileServices.deleteEventFromAttendeesHost(eventID)
            .then(res => {
                console.log('RES in event delete from both hosting / attending',res)
                if (res.status === "Error") {
                    console.log("event cannot be deleted")
                }
                else {
                    console.log("Successfully deleted event to :", res.data)
                    // window.location.replace('/profile')
                }
                window.location.replace('/ListAllEvents')
            });

    }


    if(user.email !== ""){
        console.log(user)
    }
    else{
        console.log("not logged in")
    }

    function joinButton(){
        console.log("does id exist",data);
        console.log(user.userID);
        console.log(data.host_id);
        if(user.userID !== data.host_id){
            return(
                <button onClick={joinEvent} className="button is-primary">Join Event</button>
            )
        }
    }

    function editButton(){
        console.log(user.userID);
        console.log(data.host_id);
        if(user.userID === data.host_id){
            return(
                <button onClick={toggleEditOn} className="button is-primary">EDIT</button>
            )
        }
    }

    function deleteButton(){
        if(user.userID === data.host_id)
            return(
                <button className="button is-danger is-light" id= "goToEventButton" onClick={()=>logDelete(data.eventID)} >
                    Delete
                </button>
            )
    }


    if(data.editState === true){
        return(
            <div>
                <div>
                    <EventEditForm props={data}></EventEditForm>
                    <button onClick={toggleEditOff}>Cancel</button>
                    <CommentBox eventID={props.match.params.id} user={user}/>
                </div>
            </div>
        )
    }

    return(
        <div>
            <h1 className="title is-1">Single Event Comp for: {data.name}</h1>
            {editButton()}
            <h2>Host Info</h2>
            <p>
                <strong>Name</strong>: {data.host_name} <br/>
                <strong>Email</strong>: {data.host_email}<br/>
            </p>
            <br/><h2>Event Info</h2>
            <p>
                <strong>Event Description</strong>: {data.description} <br/>
                <strong>Start Time</strong>: {convertTime(data.start_date_time)} <br/>
                <strong>End Time</strong>: {convertTime(data.end_date_time)}<br/>
            </p>
            <button onClick={joinConferenceHandler} className="button is-primary">Join Conference</button>
            {joinButton()}
            {deleteButton()}
            <button onClick={()=> console.log(data)} className="button is-primary">Test</button>

            <SingleEventAttendees host_id={data.host_id} attendee_id={data.attendee_id}/>

            <CommentBox eventID={props.match.params.id} user={user}/>

            <Footer/>
        </div>
    )
}



export default SingleEvent;