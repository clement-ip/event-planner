import React, {useEffect, useState} from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"
import { AuthContext } from '../../Context/AuthContext';
import axios from "axios";



function SingleEvent(props){

    console.log("HEREEEE: ", props);
    const [data, setData] = useState({
        dataBaseEvents:[],
        //dataBaseEventsFormatted:[],
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
        end_date_time: ''
    });

    // var event = {
    //     name: '',
    //     description: '',
    //     start_date: '',
    //     end_date: '',
    // }

    console.log("ID",props.match.params.id);

    useEffect(()=> {

        axios({
            url: '/getSingleEvent'+props.match.params.id,
            method: 'GET',
        })
            .then((res) =>{
                console.log('this the data',res.data);
                setData({
                    name: res.data.name,
                    description: res.data.description,
                    location_city: res.data.location_city,
                    location_country: res.data.location_country,
                    location_address: res.data.location_address,
                    requirements: res.data.requirements,
                    host_email: res.data.host_email,
                    host_phone_number: res.data.host_phone_number,
                    host_id: res.data.host_id,
                    host_name: res.data.host_name,
                    host_organization: res.data.host_organization,
                    tags: res.data.tags,  //change to [String] and maybe implement react-tag-input
                    start_date_time: res.data.start_date_time,
                    end_date_time: res.data.end_date_time

                });
                console.log("data has been fetched");

            })
            .catch(err => console.log(err));
    }, [props.match.params.id]);


    return(
        <div>
            <h1 className="title is-1">Single Event Comp for: {data.name}</h1>
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
                <strong>Start Time</strong>: {data.start_date_time} <br/>
                <strong>End Time</strong>: {data.end_date_time}<br/>
                <strong>Address</strong>: {data.location_address} {data.location_city} {data.location_country}<br/>
                <strong>Tags</strong>: {data.tags}<br/>
                <strong>Requirements</strong>: {data.requirements}
            </p>
            {/*<CommentBox data={props.match.params.id} user={AuthContext.user}/>*/}
        </div>
    )
}



export default SingleEvent;