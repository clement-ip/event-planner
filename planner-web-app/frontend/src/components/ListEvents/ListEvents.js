import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import SingleEventForList from "./SingleEventForList";

import EventServices from '../../Services/EventServices';
import Footer from '../Footer'

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
        EventServices.getAllEvents()
            .then(({ message, eventsData }) => {
                if(message.msgError)
                    console.log(message.msgBody);
                else {
                    const dataBaseEvents = eventsData;
                    setData({dataBaseEvents : dataBaseEvents});
                }
            });

        // fetch('/getAllEvents')
        //     .then(response => response.json())
        //     .then(data => {
        //         console.log("Get response: ", data);
        //         const dataBaseEvents = data
        //         setData({dataBaseEvents : dataBaseEvents});
        //         //console.log("Calendar data has been populated")
        //         console.log("events",dataBaseEvents);
        //         //const formatted = formatEventData(dataBaseEvents);
        //         //setData({dataBaseEventsFormatted : formatted});
        //     })
        //     .catch(error => console.error(error));
    }, []);

    function sortHelper(event){
        if(event.target.value === "NameA"){
            var newData = data.dataBaseEvents.sort(sortByNameA);
            setData({dataBaseEvents: newData});
            console.log(newData);
        }
        if(event.target.value === "DateS"){
            var newData = data.dataBaseEvents.sort(sortByDateS);
            setData({dataBaseEvents: newData});
            console.log(newData);
        }
        if(event.target.value === "NameZ"){
            var newData = data.dataBaseEvents.sort(sortByNameZ);
            setData({dataBaseEvents: newData});
            console.log(data.dataBaseEvents);
        }
        if(event.target.value === "DateL"){
            var newData = data.dataBaseEvents.sort(sortByDateL);
            setData({dataBaseEvents: newData});
            console.log(data.dataBaseEvents);
        }
    }

    function sortByNameA(a,b){
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return -1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()){
            return 1;
        }
        return 0;
    }

    function sortByDateS(a,b){
        if(a.start_date_time < b.start_date_time){
            return -1;
        }
        if (a.start_date_time > b.start_date_time){
            return 1;
        }
        return 0;
    }

    function sortByNameZ(a,b){
        if(a.name.toLowerCase() < b.name.toLowerCase()){
            return 1;
        }
        if (a.name.toLowerCase() > b.name.toLowerCase()){
            return -1;
        }
        return 0;
    }

    function sortByDateL(a,b){
        if(a.start_date_time < b.start_date_time){
            return 1;
        }
        if (a.start_date_time > b.start_date_time){
            return -1;
        }
        return 0;
    }




    return(
        <div className="first">
            <div className="second">
                <p>IN THE LIST EVENT COMPONENT</p>
            </div>

            <p>Sort By:
                <select onChange={sortHelper}>
                    <option value="Default"></option>
                    <option value="NameA">Name (A-Z)</option>
                    <option value="NameZ">Name (Z-A)</option>
                    <option value="DateS">Date (Soon-Later)</option>
                    <option value="DateL">Date (Later-Soon)</option>
                </select>
            </p>

            <div className="second">
                <SingleEventForList eventsProp={data.dataBaseEvents}/>
            </div>
            <Footer/>
        </div>



    )


}

export default ListAllEvents;