import React, {useEffect, useState} from "react";
import "./Event.css"
import CommentBox from "../comments-system/client/src/components/Box"

import axios from "axios";



function SingleEvent(props){

    console.log("HEREEEE: ", props);
    const [data, setData] = useState({
        dataBaseEvents:[],
        //dataBaseEventsFormatted:[],
        name:'',
        description:'',
        start:'',
        end:'',
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
        url: '/getSingleCalEvent'+props.match.params.id,
        method: 'GET',
        })
        .then((res) =>{
            console.log('this the data',res.data);
            setData({name : res.data.name,
                description : res.data.description,
                start_date : res.data.start_date,
                end_date : res.data.end_date
            });
            console.log("data has been fetched");

        })
            .catch(err => console.log(err));
    }, [props.match.params.id]);


    return(
        <div>
            <h1 className="title is-1">Single Event Comp for: {data.name}</h1>
            <p>
                <strong>Event Description</strong>: {data.description} <br/>
                <strong>Start Time</strong>: {data.start_date} <br/>
                <strong>End Time</strong>: {data.end_date}
            </p>
            <CommentBox data={props.match.params.id}/>
        </div>
    )
}



export default SingleEvent;