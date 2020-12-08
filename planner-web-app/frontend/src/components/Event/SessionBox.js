import React from 'react';

import EyesonServices from '../../Services/EyesonServices';

const SessionBox = ({ data, exit_url, eventID, user }) => {

    function convertTime(date){
        var time = new Date(date);
        console.log(time.toString())
        var string = time.toLocaleDateString()+' '+time.toLocaleTimeString()
        return string;
    }

    const joinSessionHandler = () => {
        const data = { exit_url : exit_url, user : user, eventID : eventID };
        console.log("printing in here: ", data);
        EyesonServices.join(data).then(res => {
            const gui_link = res.links.gui;
            console.log(gui_link);
            window.location.replace(gui_link);
        })
    }

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
                <div className="column is-narrow has-text-centered">
                    <a onClick={joinSessionHandler} className="button is-primary">
                    <span className="icon">
                        <i className="lni lni-microphone"></i>
                    </span>
                    <span> Host Session</span>
                    </a>
                </div>
            </div>
        </article>
    );
}
 
export default SessionBox;