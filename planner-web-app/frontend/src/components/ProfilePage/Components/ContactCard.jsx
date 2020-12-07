import React from 'react';
import { Link } from 'react-router-dom';
const ContactCard = (props) => {
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
                </div>
            </div>
        </div>
    )
}

export default ContactCard;