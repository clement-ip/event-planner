import React, {useEffect, useState, useContext} from 'react';
import { useForm } from 'react-hook-form';
import ProfileServices from '../../Services/ProfileServices'
import { AuthContext } from '../../Context/AuthContext';


function ProfileForm(props) {
    const { register, handleSubmit } = useForm();
    const {user} = useContext(AuthContext);
    const [profile_data, setData] = useState({
        about: '',
        interests: '',
        occupation: '',
        skills: '',
        organization: '',
        portfolio: {},
        profilePicture:''
    });

    console.log(user.user_id)
    useEffect(()=>{
        ProfileServices.getProfile(user.user_id)
            .then(res => {
                if (!res.isAuthenticated) {
                    console.log("Cannot retrieve profile");
                }
                else {
                    console.log(res.data)
                    setData({
                        about: res.data.about,
                        interests: res.data.interests,
                        occupation: res.data.occupation,
                        skills: res.data.skills,
                        organization: res.data.organization,
                        portfolio: res.data.portfolio,
                        profilePicture: res.data.profilePicture
                    });
                }
            })
    },[]);

    const submitEdit = e => {
        ProfileServices.editProfile(profile_data)
    }
    console.log(profile_data)

    return(
        <form class="profileForm" onSubmit={handleSubmit(submitEdit)}>
            <div class="field">
                <label class="label">Occupation</label>
                <div class="control">
                    {/* Place holder needs to contain existing value */}
                    <input
                        class="input"
                        type="text"
                        placeholder="Job"
                        ref={register}
                        name="profile_data[occupation]"
                        value={profile_data.occupation} />
                </div>
                <p class="help"> E.g. Programmer, Accountant, Professor, etc. </p>
            </div>

            <div class="field">
                <label class="label">Organization</label>
                <div class="control">
                    {/* Place holder needs to contain existing value */}
                    <input
                        class="input"
                        type="text"
                        placeholder="Where you work or who you are affiliated with"
                        ref={register}
                        name="profile_data[organization]"
                        value={profile_data.organization}
                    />
                </div>
                <p class="help"> E.g. Simon Fraser University </p>
            </div>
            <div class="field">
                <label class="label">Skills</label>
                <div class="control">
                    {/* Place holder needs to contain existing value */}
                    <input
                        class="input"
                        type="text"
                        placeholder="List of Your Skills"
                        ref={register}
                        name="profile_data[skills]"
                        value={profile_data.skills}
                    />
                </div>
                <p class="help">E.g. Javascript, Market Analysis, Product Development</p>
            </div>
            <div class="field">
                <label class="label">Portfolio and Social Media</label>
                <p class="control has-icons-left">
                    <span class="select">
                    <select name="profile_data[portfolio]">
                        <option value="Personal">Personal</option>
                        <option value="LinkedIn">LinkedIn</option>
                        <option value="GitHub">GitHub</option>
                        <option value="YouTube">YouTube</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Twitter">Twitter</option>
                        <option value="Other">Other</option>
                    </select>
                    </span>
                    <span class="icon is-small is-left">
                    <i class="fas fa-globe"></i>
                    </span>
                </p>
                <div class="control">
                    {/* Place holder needs to contain existing value */}
                    <input
                        class="input"
                        type="text"
                        placeholder="Link"
                        ref={register}
                        name="profile_data[portfolio]"
                        value={profile_data.portfolio}
                    />
                </div>
                <p class="help">E.g. https://Github.com/Torvalds </p>
            </div>

            <div class="field">
                <label class="label">Interests</label>
                <div class="control">
                    {/* Place holder needs to contain existing value */}
                    <input
                        class="input"
                        type="text"
                        placeholder=""
                        ref={register}
                        name="profile_data[interests]"
                        value={profile_data.interests}
                    />
                </div>
                <p class="help"> E.g. Cooking, Darts, Hiking, Pool, Programming, etc. </p>
            </div>

            <div class="field">
                <label class="label">About Yourself</label>
                <div class="control">
                    {/* Place holder needs to contain existing value */}
                    <textarea
                        class="textarea"
                        type="text"
                        placeholder="Tell us about yourself!"
                        ref={register}
                        name="profile_data[about]"
                        value={profile_data.about}
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

            {/* <div className="field mx-5">
                <button className="button is-danger is-fullwidth has-shadow py-5">
                    <p className="is-size-4">Submit</p>
                </button>
            </div> */}


        </form>
   )
}

export default ProfileForm;