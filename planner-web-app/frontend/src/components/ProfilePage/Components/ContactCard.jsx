import React from 'react';
import { Link } from 'react-router-dom';
const ContactCard = (props) => {

    const portfolio_data = props.card_data.portfolio;

    // const portfolio_websites = [];
    // for (let i = 0; i < portfolio_data.length; i++) {
    //     for (var website in portfolio_data[i]){
    //         var website_string = portfolio_data[i][website].toString().toLowerCase();

    //         if (!website_string.includes("https://") || !website_string.includes("http://")) {
    //             website_string = "https://"+ website_string
    //         }
    //         portfolio_websites.push(
    //                 <div>{website}:
    //                      <a rel={'external'} target="_blank" href={website_string}> {website_string}</a>
    //                 </div>
    //         )
    //     }
    // }

//     <div className="card-image">
//     <figure className="image is-4by3">
//     { props.card_data.profilePicture === "" ?
//         <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image"></img> :
//         <div>
//             {/* Insert Profile Picture */}
//             {/* <img src={data.profilePicture} alt=""> </img> */}
//         </div>
//     }
//     </figure>
// </div>

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