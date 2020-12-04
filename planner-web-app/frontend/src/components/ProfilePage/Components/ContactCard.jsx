import React from 'react';

const ContactCard = (props) => {

    const portfolio_data = props.card_data.portfolio;

    const portfolio_websites = [];
    for (let i = 0; i < portfolio_data.length; i++) {
        for (var website in portfolio_data[i]){
            var website_string = portfolio_data[i][website].toString().toLowerCase();

            if (!website_string.includes("https://") || !website_string.includes("http://")) {
                website_string = "https://"+ website_string
            }
            portfolio_websites.push(
                    <div>{website}:
                         <a rel={'external'} target="_blank" href={website_string}> {website_string}</a>
                    </div>
            )
        }
    }


    return (
        <div className="Contact_Card">
            {/* Insert Profile Picture */}
            {/* <img src={data.profilePicture} alt=""> </img> */}

            <h1><strong>Name</strong>: {props.card_data.name}<br/></h1>
            <h1><strong>Email</strong>: {props.card_data.email}<br/></h1>
            <h1><strong>Country</strong>: {props.card_data.country}<br/></h1>
            <h1><strong>City</strong>: {props.card_data.city}<br/></h1>
            <h1><strong>Occupation</strong>: {props.card_data.occupation}<br/></h1>
            <h1><strong>Organization</strong>: {props.card_data.organization}<br/></h1>

            {/* TODO: Portfolio needs to come back as a website link
                {WARNING: THIS IS BREAKING B/C NEED TO PLAY AS ARRAY} */}
            <h1>
                <strong>Portfolio</strong>:<br/>
                {portfolio_websites}
            </h1>
        </div>
    )
}

export default ContactCard;