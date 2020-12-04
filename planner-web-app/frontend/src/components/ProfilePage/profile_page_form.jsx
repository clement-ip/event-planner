import React, {useEffect, useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import ProfileServices from '../../Services/ProfileServices'
import { AuthContext } from '../../Context/AuthContext';


function ProfileForm(props) {
    const { register, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
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

    useEffect(()=>{
        ProfileServices.getProfile(user.user_id)
            .then(res => {
                if (!res.isAuthenticated) {
                    console.log("Cannot retrieve profile");
                }
                else {
                    console.log(res.data)
                    setData({
                        userID: res.data.userID,
                        email: res.data.email,
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

    const SubmitEdit = e => {
        console.log('PRE! :',e)
        e.profile_data.userID = profile_data.userID;
        e.profile_data.email = profile_data.email;
        e.profile_data.name = profile_data.name;
        // setData({
        //     about: e.profile_data.about,
        //     interests: e.profile_data.interests,
        //     occupation: e.profile_data.occupation,
        //     skills: e.profile_data.skills,
        //     organization: e.profile_data.organization,
        //     portfolio: e.profile_data.portfolio,
        //     profilePicture: e.profile_data.profilePicture
        // });

        console.log('CHECK! :',e)

        ProfileServices.editProfile(e.profile_data).then( res => {
            console.log(res)
            setData({
                about: res.data.about,
                interests: res.data.interests,
                occupation: res.data.occupation,
                skills: res.data.skills,
                organization: res.data.organization,
                portfolio: res.data.portfolio,
                profilePicture: res.data.profilePicture
            })
        } );
        console.log('CHECK POST! :',profile_data)
    }

    return(
        <form onSubmit={handleSubmit(SubmitEdit)}>
            <div class="field">
                <label class="label">Occupation</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Job"
                        ref={register}
                        name="profile_data[occupation]"
                        defaultValue={profile_data.occupation} />
                </div>
                <p class="help"> E.g. Programmer, Accountant, Professor, etc. </p>
            </div>

            <div class="field">
                <label class="label">Organization</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Where you work or who you are affiliated with"
                        ref={register}
                        name="profile_data[organization]"
                        defaultValue={profile_data.organization}
                    />
                </div>
                <p class="help"> E.g. Simon Fraser University </p>
            </div>

            <div class="field">
                <label class="label">Skills</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="List of Your Skills"
                        ref={register}
                        name="profile_data[skills]"
                        defaultValue={profile_data.skills}
                    />
                </div>
                <p class="help">E.g. Javascript, Market Analysis, Product Development</p>
            </div>

            {/* <div class="field">
                <label class="label">Portfolio and Social Media</label>
                <p class="control has-icons-left">
                    <span class="select">
                    <select name="profile_data[portfolio]">
                        <option defaultValue="Personal">Personal</option>
                        <option defaultValue="LinkedIn">LinkedIn</option>
                        <option defaultValue="GitHub">GitHub</option>
                        <option defaultValue="YouTube">YouTube</option>
                        <option defaultValue="Instagram">Instagram</option>
                        <option defaultValue="Twitter">Twitter</option>
                        <option defaultValue="Other">Other</option>
                    </select>
                    </span>
                    <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                    </span>
                </p>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder="Link"
                        ref={register}
                        name="profile_data[portfolio]"
                        defaultValue={profile_data.portfolio}
                    />
                </div>
                <p class="help">E.g. https://Github.com/Torvalds </p>
            </div> */}

            <div class="field">
                <label class="label">Interests</label>
                <div class="control">
                    <input
                        class="input"
                        type="text"
                        placeholder=""
                        ref={register}
                        name="profile_data[interests]"
                        defaultValue={profile_data.interests}
                    />
                </div>
                <p class="help"> E.g. Cooking, Darts, Hiking, Pool, Programming, etc. </p>
            </div>

            <div class="field">
                <label class="label">About Yourself</label>
                <div class="control">
                    <textarea
                        class="textarea"
                        type="text"
                        placeholder="Tell us about yourself!"
                        ref={register}
                        name="profile_data[about]"
                        defaultValue={profile_data.about}
                    >
                    </textarea>
                </div>
                <p class="help">E.g. I aspire to be the very best!</p>
            </div>

            <div class="field is-grouped">
                <button className="button is-danger is-fullwidth has-shadow py-5">
                    <p className="is-size-4">
                        Submit
                    </p>
                </button>
                <button className="button is-danger is-fullwidth has-shadow py-5">
                    <p className="button is-light">
                        Cancel
                    </p>
                </button>
            </div>
            <br></br>
        </form>
   )
}

export default ProfileForm;