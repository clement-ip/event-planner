import React, {useEffect, useState, useContext } from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";
import EventEditForm from './EventEditForm'

import EventServices from '../../Services/EventServices';
import EyesonServices from '../../Services/EyesonServices';
import ProfileServices from "../../Services/ProfileServices";

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
                    setData({
                        eventID: eventID,
                        name: eventData.name,
                        description: eventData.description,
                        location_city: eventData.location_city,
                        location_country: eventData.location_country,
                        location_address: eventData.location_address,
                        requirements: eventData.requirements,
                        host_email: eventData.host_email,
                        host_phone_number: eventData.host_phone_number,
                        host_id: eventData.host_id,
                        host_name: eventData.host_name,
                        host_organization: eventData.host_organization,
                        tags: eventData.tags,  //change to [String] and maybe implement react-tag-input
                        start_date_time: eventData.start_date_time,
                        end_date_time: eventData.end_date_time
                    });
                }
                // console.log('this the data',res.data);
                // console.log("data has been fetched");
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
            location_city: data.location_city,
            location_country: data.location_country,
            location_address: data.location_address,
            requirements: data.requirements,
            host_email: data.host_email,
            host_phone_number: data.host_phone_number,
            host_id: data.host_id,
            host_name: data.host_name,
            host_organization: data.host_organization,
            tags: data.tags,
            start_date_time: data.start_date_time,
            end_date_time: data.end_date_time,
        })
    }

    function toggleEditOff(){
        console.log('toggle off',data);
        setData({editState: false,
            eventID: data.eventID,
            name:data.name,
            description: data.description,
            location_city: data.location_city,
            location_country: data.location_country,
            location_address: data.location_address,
            requirements: data.requirements,
            host_email: data.host_email,
            host_phone_number: data.host_phone_number,
            host_id: data.host_id,
            host_name: data.host_name,
            host_organization: data.host_organization,
            tags: data.tags,
            start_date_time: data.start_date_time,
            end_date_time: data.end_date_time,
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
                }
            })
    }

    if(user.email !== ""){
        console.log(user)
    }
    else{
        console.log("not logged in")
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
            <button onClick={toggleEditOn}>EDIT</button>
            <h2>Host Info</h2>
            <p>
                <strong>Name</strong>: {data.host_name} <br/>
                <strong>id</strong>: {data.host_id} <br/>
                <strong>Email</strong>: {data.host_email}<br/>
                <strong>Phone Number</strong>: {data.host_phone_number}<br/>
                <strong>Organization</strong>: {data.host_organization}
            </p>
            <br/><h2>Event Info</h2>
            <p>
                <strong>Event Description</strong>: {data.description} <br/>
                <strong>Start Time</strong>: {convertTime(data.start_date_time)} <br/>
                <strong>End Time</strong>: {convertTime(data.end_date_time)}<br/>
                <strong>Address</strong>: {data.location_address} {data.location_city} {data.location_country}<br/>
                <strong>Tags</strong>: {data.tags}<br/>
                <strong>Requirements</strong>: {data.requirements}
            </p>
            <button onClick={joinConferenceHandler} className="button is-primary">Join Conference</button>
            <button onClick={joinEvent} className="button is-primary">Join Event</button>
            <CommentBox eventID={props.match.params.id} user={user}/>
        </div>
    )
}



export default SingleEvent;