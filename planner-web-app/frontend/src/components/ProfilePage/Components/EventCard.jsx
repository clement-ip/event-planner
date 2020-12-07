import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const EventCard = (props) => {
    console.log('EVENT CARD PROPS :', props.data)
    return (
        <div className="card" key={props.data._id}>
            <div className="card-content">
                <div className="media">
                    <div className="media-left">
                        <figure className="image is-48x48">
                            { props.picture === "" ?
                                <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image"></img> :
                                <div></div>
                                // <img src="src" alt="Placeholder image"></img>
                            }
                        </figure>
                    </div>
                    <div className="media-content">
                        <Link to={() => "/SingleEvent/" + props.data._id}>
                            <p className="title is-4">{props.data.name}</p>
                        </Link>
                        <p className="subtitle is-6">{props.data.start_date_time}</p>
                    </div>
                </div>
                <div className="content">
                </div>
            </div>
        </div>
    )
}

export default EventCard;