import React, {useEffect, useState, useContext, useRef} from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";
import EventEditForm from './EventEditForm'
import SingleEventAttendees from './SingleEventAttendees';
<<<<<<< HEAD

import SessionBox from './SessionBox';
=======
>>>>>>> c632b0c... change event db schema & start on linking profile

import EventServices from '../../Services/EventServices';
import EyesonServices from '../../Services/EyesonServices';
import ProfileServices from "../../Services/ProfileServices";
import Footer from '../Footer';

function SingleEvent(props){

    const {user} = useContext(AuthContext);
    const url = window.location.href;
    const attendBtnRef = useRef(null);
    const editBtnRef = useRef(null);
    const [data, setData] = useState({
        eventID:'',
        name: '',
        description: '',
        host_email: '',
        attendee_id: [],
        host_id: '',
        start_date_time: '',
        end_date_time: '',
        editState: false
    });


    useEffect(()=> {
        console.log('UseEffect', user.userID)
        console.log('UseEffect', data.host_id)
        if(data.host_id === user.userID) {
            editBtnRef.current.classList.remove('is-hidden');
            attendBtnRef.current.classList.add('is-hidden');
        } else {
            editBtnRef.current.classList.add('is-hidden');
            attendBtnRef.current.classList.remove('is-hidden');
        }
    }, [data.host_id])


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
                        host_email: eventData.host_email,
                        host_id: eventData.host_id,
                        host_name: eventData.host_name,
                        start_date_time: eventData.start_date_time,
                        end_date_time: eventData.end_date_time,
                        attendee_id: eventData.attendee_id
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
                                    <SessionBox data={data} eventID={props.match.params.id} exit_url={url} user={{ id : user.userID, name: user.name}}/>
                                </div>
                            </div>
                            <div className="tile is-parent">
                                <article className="tile box is-child">
                                    <p className="title is-4">Discussion</p>
                                    <div className="columns">
                                        <CommentBox eventID={props.match.params.id} user={user}/>
                                    </div>
                                </article>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="navbar is-fixed-bottom has-shadow">
                <div className="navbar-menu is-active">
                    <div className="navbar-end">
                        <div className="navbar-item">
                            <a onClick={joinEvent} className="button is-primary" ref={attendBtnRef}>
                                Attend
                            </a>
                        </div>
                        <div className="navbar-item">
                            <a onClick={toggleEditOn} className="button is-primary" ref={editBtnRef}>
                                Edit
                            </a>
                        </div>
                        <div className="navbar-item">
                            {deleteButton()}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}



export default SingleEvent;