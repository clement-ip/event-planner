import React, {useCallback, useEffect, useState} from "react";
import EventServices from '../../Services/EventServices';
import SingleEventForList from "../ListEvents/SingleEventForList";

function EventResults(props){

    const [eventId, setEventId] = useState({
        dataBaseEvents:[],
        listOfIds:[],
    },[]);
    // const [data, setData] = useState({
    //
    // });

    var nodes = eventId.listOfIds.map(function (data) {
        console.log("emptty",data);
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




    // var listOfIds = []
    //
    useEffect(()=> {
        EventServices.searchEvent(props.match.params.id)
            .then(({ message, data }) => {
                if(message.msgError)
                    console.log(message.msgBody);
                else {
                    EventServices.getAllEvents()
                        .then(({ message, eventsData }) => {
                            if(message.msgError)
                                console.log(message.msgBody);
                            else {
                                var listOfIds = []
                                for(var x = 0;x<data.length;x++){
                                    listOfIds.push(data[x]._id);
                                    }
                                //const dataBaseEvents = eventsData;
                                var listOfFiltered = []
                                for(var x = 0;x<eventsData.length;x++){
                                    if(listOfIds.includes(eventsData[x]._id)){
                                        listOfFiltered.push(eventsData[x]);
                                    }
                                }
                                setEventId({dataBaseEvents : listOfFiltered,
                                            listOfIds:data});
                            }
                        });
                    //filterEvents(data);
                }
            });
    }, []);

    function filterEvents(data){
        console.log('The eventId var',eventId);
        EventServices.getAllEvents()
            .then(({ message, eventsData }) => {
                if(message.msgError)
                    console.log(message.msgBody);
                else {
                    console.log("search key", eventId.eventID);
                    const dataBaseEvents = eventsData;
                    console.log(dataBaseEvents);
                    console.log("THIS IS THE EVENT IDS",eventId.listOfIds);
                    var listOfFiltered = []
                    for(var x = 0;x<dataBaseEvents.length;x++){
                        if(eventId.listOfIds.includes(dataBaseEvents[x]._id)){
                            listOfFiltered.push(dataBaseEvents[x]);
                        }

                    }
                    console.log(listOfFiltered);
                    setEventId({dataBaseEvents : listOfFiltered});
                }
            });
    }

    return(
        <div>
            <div>
                {/*<Results></Results>*/}
            </div>
            <div className="second">
                <p>hello:</p>
                <SingleEventForList eventsProp={eventId.dataBaseEvents}/>
            </div>
        </div>


    )


}

export default EventResults;