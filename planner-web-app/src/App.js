import React from 'react';
import './App.css';

import NavBar from "./components/navbar"

import ProfilePage from "./pages/profile_page"
import MainPage from "./pages/index"
import NotFoundPage from "./pages/404"

import {
  BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
} from "react-router-dom";
import NotFound from './pages/404';


function App() {
  return (
    <div className="App">
      <Router>
        <NavBar></NavBar>
        <Switch>
          {/* <Link to="/">Home</Link> */}
          <Route exact path="/" component={MainPage} />
          <Route exact path="/profile" component={ProfilePage}/>


          <Route exact path="/404" component={NotFoundPage} />
          <Redirect to="/404"/>
        </Switch>
      </Router>

      {/* <About />
      <Organization /> */}
      

    </div>
  );
}

export default App;
