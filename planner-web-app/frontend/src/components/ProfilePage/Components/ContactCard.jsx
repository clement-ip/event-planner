import React from 'react';
import { Link } from 'react-router-dom';
const ContactCard = (props) => {

    const portfolio_data = props.card_data.portfolio;

    return (
        <div className="card">
            {/* INSERT PROFILE IMAGE */}
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4"><strong>{props.card_data.name}</strong></p>
                        <p className="subtitle is-6">{props.card_data.email}</p>
                    </div>
                </div>
                <div className="content">
                    {props.card_data.country}, {props.card_data.city}<br/>
                    Occupation: {props.card_data.occupation}<br/>
                    Organization: {props.card_data.organization}<br/>
                    {/* INSERT PORTFOLIO */}
                </div>
            </div>
        </div>
    )
}

            // {/* TODO: Portfolio needs to come back as a website link
            //     {WARNING: THIS IS BREAKING B/C NEED TO PLAY AS ARRAY} */}
            // {/* <h1>
            //     <strong>Portfolio</strong>:<br/>
            //     {portfolio_websites}
            // </h1> */}


export default ContactCard;