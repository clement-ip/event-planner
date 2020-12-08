import React, {useEffect, useState, useContext } from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";
import EventEditForm from './EventEditForm'

import SessionBox from './SessionBox';

import EventServices from '../../Services/EventServices';
import EyesonServices from '../../Services/EyesonServices';
import ProfileServices from "../../Services/ProfileServices";

function SingleEvent(props){

    const {user} = useContext(AuthContext);
    const url = window.location.href;
    const [data, setData] = useState({
        // dataBaseEvents: [],
        //dataBaseEventsFormatted:[],
        eventID:'',
        name: '',
        description: '',
        // location_city: '',
        // // location_country: '',
        // location_address: '',
        // requirements: '',
        host_email: '',
        // host_phone_number: '',
        // host_id: '',
        // host_organization: '',
        // tags: '',  //change to [String] and maybe implement react-tag-input
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
                        // location_city: eventData.location_city,
                        // location_country: eventData.location_country,
                        // location_address: eventData.location_address,
                        // requirements: eventData.requirements,
                        host_email: eventData.host_email,
                        // host_phone_number: eventData.host_phone_number,
                        host_id: eventData.host_id,
                        host_name: eventData.host_name,
                        // host_organization: eventData.host_organization,
                        // tags: eventData.tags,  //change to [String] and maybe implement react-tag-input
                        start_date_time: eventData.start_date_time,
                        end_date_time: eventData.end_date_time
                    });
                    console.log("eventdata", eventData);
                }
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
            <div className="columns mt-6">
                <div className="column is-6 is-offset-3">
                    {/* Header tiles */}
                    <div className="tile is-ancestor mb-0">
                        <div className="tile is-vertical">
                            <div className="tile is-parent">
                                <article className="tile box is-child">
                                    Images
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile notification is-child is-white">
                                    <div>
                                        <p className="subtitle is-6">
                                            {convertTime(data.start_date_time)}
                                        </p>
                                        <p className="title is-1 is-spaced">
                                            <b>{data.name}</b>
                                        </p>
                                    </div>
                                    <div className="columns pt-3 mb-0">
                                        <div className="column is-2 pb-0">
                                            <a>
                                                <figure className="image is-square">
                                                    <img className="is-rounded" src="https://www.dovercourt.org/wp-content/uploads/2019/11/610-6104451_image-placeholder-png-user-profile-placeholder-image-png.jpg"/>
                                                </figure>
                                            </a>
                                        </div>
                                        <div className="column pb-0">
                                            <article className="tile notification is-child is-white pl-0">
                                                <p className="title is-5 mb-0">Hosted By {data.host_name}</p>
                                                { data.host_email && (
                                                    <div className="level">
                                                        <div className="level-left">
                                                            <div className="level-item mx-0">
                                                                <span className="icon is-large has-text-info">
                                                                    <i className="far fa-envelope fa-lg"></i>
                                                                </span>
                                                            </div>
                                                            <div className="level-item">
                                                                <p>{data.host_email}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </article>
                                        </div>
                                    </div>
                                    <hr className="my-0"></hr>
                                </article>
                            </div>
                        </div>
                    </div>
                
                    {/* Description Tiles */}
                    <div className="tile is-ancestor">
                        <div className="tile is-vertical">
                            <div className="tile">
                                <div className="tile is-8 is-parent">
                                    <div className="tile content is-child">
                                        <p className="title is-4">Details</p>
                                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
                                    </div>     
                                </div>
                                <div className="tile is-parent">
                                    <SessionBox data={data} eventID={props.match.params.id} exit_url={url} user={user.name}/>
                                </div>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile box is-child">
                                    Attendees
                                </article>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile box is-child">
                                    Comments
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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
            <button onClick={()=> console.log(user)} className="button is-primary">Test</button>
            <CommentBox eventID={props.match.params.id} user={user}/>
        </div>
    )
}



export default SingleEvent;