import React, {useEffect, useState, useContext} from 'react';
import { Route, Redirect, withRouter } from "react-router-dom";
import { AuthContext } from '../../Context/AuthContext';
import ProfileServices from '../../Services/ProfileServices'
import About from './Components/About';
import ContactCard from './Components/ContactCard';
import Interests from './Components/Interests';
import Skills from './Components/Skills';
import HostingAttendingEvents from './Components/HostingAttendingEvents';
import { Link } from 'react-router-dom';

function IndividualProfile(props){
    const {user} = useContext(AuthContext);
    const [profile_data, setData] = useState({
        userID: '',
        email:'',
        name: '',
        about: '',
        interests: '',
        occupation: '',
        skills: '',
        organization: '',
        portfolio: {},
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
                    console.log(res.data)
                    setData({
                        userID:res.data.userID,
                        email:res.data.email,
                        name: res.data.name,
                        about: res.data.about,
                        interests: res.data.interests,
                        occupation: res.data.occupation,
                        skills: res.data.skills,
                        organization: res.data.organization,
                        portfolio: res.data.portfolio,
                        attendingEvents: res.data.attendingEvents,
                        hostingEvents: res.data.hostingEvents,
                        profilePicture: res.data.profilePicture
                    });
                }
            })
    },[]);

    return(
        <div className="Profile">
            <ContactCard card_data={ { email:profile_data.email,
                                              name:profile_data.name,
                                              occupation:profile_data.occupation,
                                              organization:profile_data.organization,
                                              portfolio:profile_data.portfolio,
                                              profilePicture:profile_data.profilePicture } } />
            <About about_data={ profile_data.about }/>
            <Interests interests_data={ profile_data.interests }/>
            <Skills skills_data={ profile_data.skills }/>
            <HostingAttendingEvents events_data={ { hostingEvents:profile_data.hostingEvents,
                                                    attendingEvents:profile_data.attendingEvents } }/>

            {user.user_id === props.match.params.id &&
                <Link to="/profile/">
                    <button class="button is-danger is-outlined" renderAs="Link">
                        <span>Edit Profile</span>
                    </button>
                </Link>
            }

        </div>
    )
}

export default withRouter(IndividualProfile);



