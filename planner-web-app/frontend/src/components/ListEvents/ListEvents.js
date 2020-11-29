import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import SingleEventForList from "./SingleEventForList";



function ListAllEvents(){

    const [data, setData] = useState({
        dataBaseEvents:[],
        //dataBaseEventsFormatted:[],
        name:'',
        description:'',
        start_date:'',
        start_time:'',
        end_date:'',
        end_time:'',
    });


    useEffect(()=> {
        fetch('/getAllEvents')
            .then(response => response.json())
            .then(data => {
                console.log("Get response: ", data);
                const dataBaseEvents = data
                setData({dataBaseEvents : dataBaseEvents});
                //console.log("Calendar data has been populated")
                console.log("events",dataBaseEvents);
                //const formatted = formatEventData(dataBaseEvents);
                //setData({dataBaseEventsFormatted : formatted});
            })
            .catch(error => console.error(error));
    }, []);


    function goToEvent(){
        console.log('okay');
    }


    // function listAllEvents(){
    //     console.log(data.dataBaseEvents);
    //     var eventList = "";
    //     var count =1;
    //     var x;
    //     for(x = 0; x<data.dataBaseEvents.length;x++){
    //         var name = data.dataBaseEvents[x].name;
    //         var des = data.dataBaseEvents[x].description;
    //         var s_date = data.dataBaseEvents[x].start_date;
    //         var e_date = data.dataBaseEvents[x].end_date;
    //         console.log(name)
    //         eventList +=    "<div>" +
    //                         "Event Name: " + name +
    //                         " Event Description:" + des +
    //                         " Event Start Date:" + s_date +
    //                         " Event End Date:" + e_date +
    //                         " <button onClick={goToEvent}> See More </button>" +
    //                         "</div><br>"
    //     }
    //     //data.dataBaseEvents
    //     // data.dataBaseEvents.map(event=>(
    //     //     //console.log(event.name)
    //     //     eventList+="<li>"+ event.name + "</li>"
    //     // ))
    //
    //     console.log('list',eventList);
    //     return eventList
    // }


    return(
        <div className="first">
            <div className="second">
                <p>IN THE LIST EVENT COMPONENT</p>
            </div>

            <div className="second">
                <SingleEventForList eventsProp={data.dataBaseEvents}/>
            </div>
        </div>



    )


}

export default ListAllEvents;