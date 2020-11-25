import React from 'react';
import './App.css';
import EventForm from './components/calendar/EventForm';
import ImageUploader from './components/ImageUploader/ImageUpload.js'

import NavBar from "./components/navbar/navbar"
import CommentBox from "./components/comments-system/client/src/components/Box"
import ProfilePage from "./components/Profile_Page/profile_page"
import hosting_events from "./components/hosting_events/hosting_events"
import MainPage from "./components/index"
import NotFoundPage from "./components/404"
import ListAllEvents from "./components/listEvents/ListEvents"
import SingleEvent from "./components/Event/SingleEvent";

import {
  BrowserRouter as Router,
    Switch,
    Route,
    // Link,
    Redirect
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          {/* <Link to="/">Home</Link> */}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/profile" component={ProfilePage}/>
          <Route exact path="/hosting_events" component={hosting_events}/>
          <Route exact path="/EventForm" component={EventForm}/>
          <Route exact path="/ImageUploader" component={ImageUploader}/>
          <Route exact path="/CommentBox" component={CommentBox}/>
          <Route exact path="/ListAllEvents" component={ListAllEvents}/>
          <Route exact path="/SingleEvent/:id" component={SingleEvent}/>
          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404"/>
        </Switch>
      </Router>


    <footer>Something Something Disclaimer & Copyright Stuff by CCEEH Conglomerate</footer>

    </div>
  )
}

export default App;
