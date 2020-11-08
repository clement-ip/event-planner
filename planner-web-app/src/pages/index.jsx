import React from 'react';
import { Link } from "react-router-dom";

const MainPage = () => {
  return(
    <div>
      <h3>Main Page</h3>
      <p>Test Main Page</p>
      <p>
        <Link to="/profile">Profile Page</Link>
      </p>
    </div>
  );
}

export default MainPage;

