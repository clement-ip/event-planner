import React, {useCallback, useEffect, useState} from "react";
import EventServices from '../../Services/EventServices';

function EventResults(props){

    const [eventId, setEventId] = useState([]);
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
    var nodes = eventId.map(function (data) {
        return (
            <section key={data._id}>
                <li>
                    <p>{data._id}</p>
                </li>
            </section>
        );
    });

    const Results = () => (
        <section className="replies">
            <ul className="reply-list">
                {nodes}
            </ul>
        </section>
    )

    useEffect(()=> {
        EventServices.searchEvent(props.match.params.id)
            .then(({ message, data }) => {
                if(message.msgError)
                    console.log(message.msgBody);
                else {
                    setEventId(data);
                }
            });
            // EventServices.getSingleEvent("5fc7f9e762149e5084752fe1")
            // .then(({ message, eventData}) =>{
            //     console.log("here: ", eventId);
            //     if(message.msgError)
            //         console.log(message.msgBody);
            //     else {
            //         console.log("Here", eventData);
                    // setData({
                    //     eventID: props.match.params.id,
                    //     name: eventData.name,
                    //     description: eventData.description,
                    //     location_city: eventData.location_city,
                    //     location_country: eventData.location_country,
                    //     location_address: eventData.location_address,
                    //     requirements: eventData.requirements,
                    //     host_email: eventData.host_email,
                    //     host_phone_number: eventData.host_phone_number,
                    //     host_id: eventData.host_id,
                    //     host_name: eventData.host_name,
                    //     host_organization: eventData.host_organization,
                    //     tags: eventData.tags,  //change to [String] and maybe implement react-tag-input
                    //     start_date_time: eventData.start_date_time,
                    //     end_date_time: eventData.end_date_time
                    // });
                // }
                // console.log('this the data',res.data);
                // console.log("data has been fetched");
            // })
    }, []);

    return(
        <Results></Results>
    )


}

export default EventResults;