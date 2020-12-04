import React from 'react';

const ContactCard = (props) => {

    const portfolio_data = props.card_data.portfolio;

    const elements = [];
    for (var website in portfolio_data){
        const website_string = portfolio_data[website].toString()
        elements.push(<div>{website} : <a href={website_string}>{website_string}</a> </div>)
    }

    return (
        <div className="Contact_Card">
            {/* Insert Profile Picture */}
            {/* <img src={data.profilePicture} alt=""> </img> */}

            <h1><strong>Name</strong>: {props.card_data.name}<br/></h1>
            <h1><strong>Email</strong>: {props.card_data.email}<br/></h1>
            <h1><strong>Occupation</strong>: {props.card_data.occupation}<br/></h1>
            <h1><strong>Organization</strong>: {props.card_data.organization}<br/></h1>

            {/* TODO: Portfolio needs to come back as a website link
                {WARNING: THIS IS BREAKING B/C NEED TO PLAY AS ARRAY} */}
            <h1>
                <strong>Portfolio</strong>:<br/>
                {elements}
            </h1>
        </div>
    )
}

export default ContactCard;