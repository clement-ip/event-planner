import { use } from 'passport';
import React, { useEffect, useState } from 'react';
import ProfileServices from '../../Services/ProfileServices';
import ProfileCard from './ProfileCard'


const SingleEventAttendees = (props) => {
    const [Host, setHost] = useState({});
    const [Attendees, setAttendees] = useState([]);

    // const combinedEvents = (data) => data.attendingEvents.concat(data.hostingEvents);

    const AttendeeProfiles = (profiles) => {
        return profiles.map((profile, index) => {
            <ProfileCard data={profile} key={profile._id}/>
        })
    };

    useEffect(()=> {
        ProfileServices.getProfile(props.host_id)
            .then(res => {
                if (!res.isAuthenticated) {
                    console.log("Cannot retrieve profile");
                }
                else {
                    setHost(res.data)
                }
            });

        const data = props.attendee_id;
        if (data !== null) {
            if (data.length > 0) {
                data.map((attendee) => {
                    return ProfileServices.getProfile(attendee)
                                .then(res => {
                                    if (!res.isAuthenticated) {
                                        console.log("Cannot retrieve profile");
                                    }
                                    else {
                                        // console.log('Attendee DATA',res.data)
                                        setAttendees(Attendee => [... Attendee, res])
                                    }
                                });
                })
            }
        }
    }, [props])

    return (
        <div className="ProfileEventsDisplay">
            <div className="card">
                <header className="card-header">
                    <section className="card-header-title">
                        <div className="title is-4">Host</div>
                    </section>
                </header>
                <div className="card-content">
                    <div className="content">
                        <ProfileCard data={Host} key={Host._id}/>
                    </div>
                </div>
            </div>

            <div className="card">
                <header className="card-header">
                    <p className="card-header-title">
                        <div className="title is-4">Attendees</div>
                    </p>
                    {/* <a href="#" className="card-header-icon">
                        <a className="card-header-icon card-toggle">
                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                        </a>
                    </a> */}
                </header>
                <div className="card-content">
                    <div className="content">
                        {AttendeeProfiles(Attendees)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SingleEventAttendees;