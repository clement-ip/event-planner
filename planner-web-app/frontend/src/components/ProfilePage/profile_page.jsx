import React, {useEffect, useState, useContext} from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import ProfileServices from '../../Services/ProfileServices'
// import About from './Components/About';
import ContactCard from './Components/ContactCard';
// import Interests from './Components/Interests';
// import Skills from './Components/Skills';
import HostingAttendingEvents from './Components/HostingAttendingEvents';
import GenericProfileSection from './Components/GenericProfileSection';
import { Link } from 'react-router-dom';

function IndividualProfile(props){
    const {user} = useContext(AuthContext);
    const [profile_data, setData] = useState({
        userID: '',
        email:'',
        name: '',
        about: '',
        country: '',
        city: '',
        interests: '',
        occupation: '',
        skills: '',
        organization: '',
        attendingEvents:[],
        hostingEvents:[],
        profilePicture:''
    });

    // TODO:
    // EDIT BUTTON:
        // If user._id == props.match.params.id : show edit button for user
        // Else: do not show edit button
    // EVENTS CARD -> NEEDS TO DISPLAY A LIST
        // Needs to connect to event's db calls

    console.log(props.match.params.id)
    useEffect(()=>{
        ProfileServices.getProfile(props.match.params.id)
            .then(res => {
                if (!res.isAuthenticated) {
                    console.log("Cannot retrieve profile");
                }
                else {
                    console.log('Result Data: ',res.data)
                    setData({
                        userID:res.data.userID,
                        email:res.data.email,
                        name: res.data.name,
                        about: res.data.about,
                        country: res.data.country,
                        city: res.data.city,
                        interests: res.data.interests,
                        occupation: res.data.occupation,
                        skills: res.data.skills,
                        organization: res.data.organization,
                        attendingEvents: res.data.attendingEvents,
                        hostingEvents: res.data.hostingEvents,
                        profilePicture: res.data.profilePicture
                    });
                }
            })
    },[]);

    return(
        <div className="Profile">
            { user.userID === props.match.params.id &&
                <Link to="/editProfile/">
                    <button className="button is-danger is-outlined">
                        <span>Edit Profile</span>
                    </button>
                </Link>
            }
            <ContactCard card_data={ { email:profile_data.email,
                                              name:profile_data.name,
                                              occupation:profile_data.occupation,
                                              organization:profile_data.organization,
                                              profilePicture:profile_data.profilePicture,
                                              country:profile_data.country,
                                              city:profile_data.city,
                                    } } />
            <GenericProfileSection section_data={{name:'About', data_body: profile_data.about}}/>
            <GenericProfileSection section_data={{name:'Interests', data_body: profile_data.interests}}/>
            <GenericProfileSection section_data={{name:'Skills', data_body: profile_data.skills}}/>
            <HostingAttendingEvents events_data={ { hostingEvents:profile_data.hostingEvents,
                                                    attendingEvents:profile_data.attendingEvents } }/>
        </div>
    )
}

export default withRouter(IndividualProfile);



