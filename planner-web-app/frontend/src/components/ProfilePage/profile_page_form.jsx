import React, {useEffect, useState, useContext} from 'react';
import { /*useHistory,*/ withRouter } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import ProfileServices from '../../Services/ProfileServices'
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';


function ProfileForm(props) {
    const { user } = useContext(AuthContext);
    // const { history } = useHistory();
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

    useEffect(()=>{
        ProfileServices.getProfile(user.userID)
            .then(res => {
                if (!res.isAuthenticated) {
                    console.log("Cannot retrieve profile");
                }
                else {
                    console.log(res)
                    setData({
                        userID: res.data.userID,
                        email: res.data.email,
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

    const { register, handleSubmit } = useForm({
        defaultValues: {
            userID: profile_data.userID,
            email: profile_data.email,
            name: profile_data.name,
            about: profile_data.about,
            country: profile_data.country,
            city: profile_data.city,
            location: profile_data.location,
            interests: profile_data.interests,
            occupation: profile_data.occupation,
            skills: profile_data.skills,
            organization: profile_data.organization,
            attendingEvents: profile_data.attendingEvents,
            hostingEvents: profile_data.hostingEvents,
            profilePicture: profile_data.profilePicture
        }
    });

    const SubmitEdit = e => {
        console.log('PRE! :',e)
        e.profile_data.userID = profile_data.userID;
        e.profile_data.email = profile_data.email;
        e.profile_data.name = profile_data.name;

        ProfileServices.editProfile(e.profile_data).then( res => {
            console.log('RESULT: ', res)
            if (!(res.status === 'Error')){
                profile_data.about = res.data.about;
                profile_data.country = res.data.country;
                profile_data.city = res.data.city;
                profile_data.interests = res.data.interests;
                profile_data.occupation = res.data.occupation;
                profile_data.skills = res.data.skills;
                profile_data.organization = res.data.organization;
                profile_data.profilePicture = res.data.profilePicture;
                console.log('CHECK POST! :',profile_data)
            }

        } );
        const path = `/viewProfile/${user.userID}`
        // props.history.push(path);
        window.location.replace(path);
    }

    return(
        <form onSubmit={handleSubmit(SubmitEdit)}>
            <div className="field">
                <label className="label">Occupation</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Job"
                        ref={register}
                        name="profile_data[occupation]"
                        defaultValue={profile_data.occupation} />
                </div>
                <p className="help"> E.g. Programmer, Accountant, Professor, etc. </p>
            </div>

            <div className="field">
                <label className="label">Organization</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="Where you work or who you are affiliated with"
                        name="profile_data[organization]"
                        defaultValue={profile_data.organization}
                        ref={register}
                    />
                </div>
                <p className="help"> E.g. Simon Fraser University </p>
            </div>

            <div className="field">
                <label className="label">Skills</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder="List of Your Skills"
                        name="profile_data[skills]"
                        defaultValue={profile_data.skills}
                        ref={register}
                    />
                </div>
                <p className="help">E.g. Javascript, Market Analysis, Product Development</p>
            </div>

            <div className="field">
                <label className="label">Country</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="profile_data[country]"
                        defaultValue={profile_data.country}
                        ref={register}
                    />
                </div>
                <p className="help">E.g. Canada, China, USA, etc.</p>
            </div>

            <div className="field">
                <label className="label">City</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="profile_data[city]"
                        defaultValue={profile_data.city}
                        ref={register}
                    />
                </div>
                <p className="help">E.g. New York City, Toronto, San Francisco, Vancouver, etc.</p>
            </div>

            <div className="field">
                <label className="label">Interests</label>
                <div className="control">
                    <input
                        className="input"
                        type="text"
                        placeholder=""
                        name="profile_data[interests]"
                        defaultValue={profile_data.interests}
                        ref={register}
                    />
                </div>
                <p className="help"> E.g. Cooking, Darts, Hiking, Pool, Programming, etc. </p>
            </div>

            <div className="field">
                <label className="label">About Yourself</label>
                <div className="control">
                    <textarea
                        className="textarea"
                        type="text"
                        placeholder="Tell us about yourself!"
                        name="profile_data[about]"
                        defaultValue={profile_data.about}
                        ref={register}
                    >
                    </textarea>
                </div>
                <p className="help">E.g. I aspire to be the very best!</p>
            </div>

            <div className="field is-grouped">
                <button className="button is-success has-shadow py-5">
                    <p className="is-size-4">
                            Submit
                    </p>
                </button>
                <Link to={() => "/viewProfile/" + user.userID}>
                    <button
                        className="button is-outlined has-shadow py-5"
                    >
                        <p className="is-size-4">
                            <span>Cancel</span>
                        </p>
                    </button>
                </Link>
            </div>
            <br></br>
        </form>
   )
}

export default withRouter(ProfileForm);