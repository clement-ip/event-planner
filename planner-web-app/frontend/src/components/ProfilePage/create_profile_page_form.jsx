import React, {useEffect, useState, useContext} from 'react';
import { Redirect, withRouter } from "react-router-dom";
import { useForm } from 'react-hook-form';
import ProfileServices from '../../Services/ProfileServices'
import { AuthContext } from '../../Context/AuthContext';
import { Link } from 'react-router-dom';
import profile_page_form from './profile_page_form';


const CreateProfileForm = (props) => {
    // const { user } = useContext(AuthContext);
    const { user, isAuthenticated, setIsAuthenticated} = useContext(AuthContext);
    // const { history } = useHistory();
    const [profile_data, setData] = useState({
        userID: '',
        email:'',
        name: '',
        about: '',
        city: '',
        country:'',
        interests: '',
        occupation: '',
        skills: '',
        organization: '',
        attendingEvents:[],
        hostingEvents:[],
        profilePicture:''
    });

    useEffect(()=>{
        console.log('CHECK USER IN CREATPROFILEFORM',user)
        const newProfile ={
            userID: user.userID,
            email: user.email,
            name: user.name,
            about: '',
            country:'',
            city:'',
            interests: '',
            occupation: '',
            skills: '',
            organization: '',
            attendingEvents:[],
            hostingEvents:[],
            profilePicture:''
        };

        ProfileServices.createProfile(newProfile)
            .then(res => {
                console.log('RES in createprofile',res)
                if (res.status === "Error") {
                    console.log("Profile Cannot be made!")
                }
                else {
                    console.log("Successfully Created Profile :", res.data)
                    // window.location.replace('/profile')
                    props.history.push('/editProfile');
                }
        })
    },[user]);

    return (
        <div>
            {/* <profile_page_form/> */}
            {/* <Redirect to='/profile' /> */}
        </div>
    );
//     return(
//         <div>
//         </div>
//    )
}

export default withRouter(CreateProfileForm);