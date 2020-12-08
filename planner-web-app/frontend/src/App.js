import React, {useContext } from "react";
import { Route, Switch } from "react-router-dom";

import { AuthContext } from './Context/AuthContext';
import Navbar from "./components/Navbar/Navbar";
import Landing from "./components/Landing";
import Hero from "./components/Hero";
import Hero from "./components/About";
import CreateEvent from "./components/CreateEvent/CreateEvent";
import CommentBox from './components/comments-system/client/src/components/Box';
import ListAllEvents from "./components/ListEvents/ListEvents";
import SingleEvent from "./components/Event/SingleEvent";
import ProfilePage from "./components/ProfilePage/profile_page"
import EditProfilePage from "./components/ProfilePage/profile_page_form"
import CreateProfilePage from "./components/ProfilePage/create_profile_page_form"
import EventResults from "./components/EventResults/Results"

import AuthService from './Services/AuthServices';
import CommentServices from './Services/CommentServices';
import EventServices from './Services/EventServices';
import ProfileServices from './Services/ProfileServices';
import EyesonServices from './Services/EyesonServices';

import PublicRoute from './components/Routes/PublicRoute';
import PrivateRoute from './components/Routes/PrivateRoute';


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
//   ProfileServices.getProfile(user.userID).then(({ ProfileData }) => console.log('ProfileData', ProfileData));


  return (
      <div className="App">
        <Navbar />
        {/* { isAuthenticated ? <Redirect to="/hero"/>  : null} */}
        <Switch>
          {/* <Route exact path="/" component={Landing} /> */}
          <PublicRoute restricted={true} component={Landing} path="/" exact />
          <PublicRoute restricted={true} path="/About" exact />
          <PrivateRoute component={Hero} path="/home" exact />
          <PrivateRoute component={CreateEvent} path="/createEvent" exact />
          <Route exact path="/ListAllEvents" component={ListAllEvents}/>
          <Route exact path="/SingleEvent/:id" component={SingleEvent}/>
          <Route exact path='/viewProfile/:id' component={ProfilePage}/>
          <Route exact path="/editProfile/" component={EditProfilePage}/>
          <Route exact path="/createProfile" component={CreateProfilePage}/>
          <Route exact path="/searchEvent/:id" component={EventResults}/>
        </Switch>
      </div>
  );
}

export default App;
