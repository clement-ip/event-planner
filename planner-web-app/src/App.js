import React from 'react';
import './App.css';
import EventForm from './components/calendar/EventForm';
import ImageUploader from './components/ImageUploader/ImageUpload.js'

import NavBar from "./components/navbar/navbar"
import CommentBox from "./components/comments-system/client/src/components/Box"
import ProfilePage from "./pages/profile_page"
import MainPage from "./pages/index"
import NotFoundPage from "./pages/404"

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
        <EventForm/>
        <ImageUploader/>
        <CommentBox></CommentBox>
        <Switch>
          {/* <Link to="/">Home</Link> */}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/profile" component={ProfilePage}/>


          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404"/>
        </Switch>
      </Router>


    <footer>Something Something Disclaimer & Copyright Stuff by CCEEH Conglomerate</footer>

    </div>
  )
}

export default App;
