import React, {useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import { AuthContext } from './Context/AuthContext';
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing";
import Hero from "./components/Hero";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import CommentBox from './components/comments-system/client/src/components/Box';
import ListAllEvents from "./components/ListEvents/ListEvents";
import SingleEvent from "./components/Event/SingleEvent";
import ProfilePage from "./components/ProfilePage/profile_page"
import EditProfilePage from "./components/ProfilePage/profile_page_form"
import EventResults from "./components/EventResults/Results"

import AuthService from './Services/AuthServices';
import CommentServices from './Services/CommentServices';
import EventServices from './Services/EventServices';
import ProfileServices from './Services/ProfileServices';
import EyesonServices from './Services/EyesonServices';


function App() {
  // const person = {
  //   name: "Hassan",
  //   email : "shali108@sfu.ca",
  //   password : "password"
  // };

  // AuthService.register(user).then(data => console.log(data))
  // AuthService.login(person).then(data => console.log(data))
  // AuthService.isAuthenticated().then(data => console.log(data));
  // AuthService.logout()

//   const commentData = {
//     eventID : "5fc3e92aeec5eb21f86af25f",
//     message : "This is a test message",
//     name : "Hassan"
//   }

//   CommentServices.createComment(commentData).then(data => console.log("Testing", data));

//   EventServices.getAllEvents().then(({ eventsData }) => console.log('EventsData', eventsData));

// EyesonServices.join("event");

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  const {user} = useContext(AuthContext);
//   console.log(user)
//   ProfileServices.getProfile(user.user_id).then(({ ProfileData }) => console.log('ProfileData', ProfileData));


  return (
      <div className="App">
        <Navbar />
        {/* { isAuthenticated ? <Redirect to="/hero"/>  : null} */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/hero" component={Hero} />
        <Route exact path="/createEvent" component={CreateEvent}/>
        <Route exact path="/ListAllEvents" component={ListAllEvents}/>
        <Route exact path="/SingleEvent/:id" component={SingleEvent}/>
        <Route exact path='/profile/:id' component={ProfilePage}/>
        <Route exact path="/profile/" component={EditProfilePage}/>
        <Route exact path="/search/:id" component={EventResults}/>
      </div>
  );
}

export default App;
