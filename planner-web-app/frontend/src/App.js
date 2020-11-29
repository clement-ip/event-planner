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

import AuthService from './Services/AuthService';

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


  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  return (
      <div className="App">
        <Navbar />
        {/* { isAuthenticated ? <Redirect to="/hero"/>  : null} */}
        <Route exact path="/" component={Landing} />
        <Route exact path="/hero" component={Hero} />
        <Route exact path="/createEvent"component={CreateEvent}/>
        <Route exact path="/ListAllEvents" component={ListAllEvents}/>
        <Route exact path="/SingleEvent/:id" component={SingleEvent}/>
      </div>
  );
}

export default App;