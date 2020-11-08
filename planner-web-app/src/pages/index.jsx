import React from 'react';
import { Link } from "react-router-dom";

// import EventForm from './components/calendar/EventForm';
// import ImageUploader from './components/ImageUploader/ImageUpload.js'

// import NavBar from "./components/navbar/navbar"
// import CommentBox from "./components/comments-system/client/src/components/Box"
// import ProfilePage from "./pages/profile_page"

const MainPage = () => {
  return(
    <div>
      <h3>Main Page</h3>
      <p>Test Main Page</p>
      <div>
        <Link to="/profile">Profile Page</Link>
      </div>
      <div>
        <Link to="/EventForm">Calendar</Link>
      </div>
      <div>
      <Link to="/ImageUploader">Image Upload</Link>
      </div>
      <div>
        <Link to="/CommentBox">Comment Section</Link>
      </div>
    </div>
  );
}

export default MainPage;

