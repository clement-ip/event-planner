import React, { useEffect, useRef } from 'react';

import EyesonServices from '../../Services/EyesonServices';
import EventServices from '../../Services/EventServices';

const SessionBox = ({ data, exit_url, eventID, user }) => {
    const joinBtnRef = useRef(null);
    const hostBtnRef = useRef(null);

    function convertTime(date){
        var time = new Date(date);
        console.log(time.toString())
        var string = time.toLocaleDateString()+' '+time.toLocaleTimeString()
        return string;
    }

    const hostSessionHandler = () => {
        const roomData = { exit_url : exit_url, user : user.name, eventID : eventID };
        console.log("printing in here: ", roomData);
        EyesonServices.join(roomData).then(res => {
            const gui_link = res.links.gui;
            const accessKey = res.access_key;
            const eventData = { sessionAccessKey : accessKey, ...data};
            console.log(data);
            console.log(eventData);
            EventServices.editEvent(eventData)
            .then(res => {
                window.location.replace(gui_link);
            })
        })
    }

    const joinSessionHandler = () => {
        EventServices.getSingleEvent(eventID)
            .then(({ eventData : { sessionAccessKey } }) => {
                if(sessionAccessKey) {
                    // Check if access key is still valid
                    const roomData = { sessionAccessKey, user : user.name };
                    EyesonServices.get(roomData)
                        .then(res => {
                            if(!res.error) {
                                const gui_link = res.links.gui;
                                window.location.replace(gui_link);
                            } else
                                console.log("room isn't available")
                        });
                } 
            })
    }

    useEffect(() => {
        if(data.host_id === user.id) {
            hostBtnRef.current.classList.remove('is-hidden');
            joinBtnRef.current.classList.add('is-hidden');
        } else {
            hostBtnRef.current.classList.add('is-hidden');
            joinBtnRef.current.classList.remove('is-hidden');
        }
    }, [data.host_id, user.id])

    return (
        <article className="tile box is-child">
            <p className="title is-6">Session Details</p>
            <p> 
                <b>Start time </b>
                {convertTime(data.start_date_time)}
            </p>
            <p> 
                <b>End time </b>
                {convertTime(data.end_date_time)}
            </p>
            <br></br>

            <div className="columns is-centered">
                <div className="column is-narrow has-text-centered" ref={hostBtnRef}>
                    <a onClick={hostSessionHandler} className="button is-primary">
                        <span className="icon">
                            <i className="lni lni-microphone"></i>
                        </span>
                        <span> Host Session</span>
                    </a>
                </div>

                <div className="column is-narrow has-text-centered" ref={joinBtnRef}>
                    <a onClick={joinSessionHandler} className="button is-primary">
                        <span className="icon">
                            <i className="lni lni-microphone"></i>
                        </span>
                        <span> Join Session</span>
                    </a>
                </div>
            </div>
        </article>
    );
}
 
export default SessionBox;