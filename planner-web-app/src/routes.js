import React from 'react';
import { Route, IndexRoute } from 'react-router';

/**
 * Import all page components here
 */
import App from './App';
import profile_page from './components/profile_page';


/**
 * All routes go here.
 * Don't forget to import the components above after adding new route.
 */
export default (
  <Route path="/" component={App}>
    <IndexRoute component={profile_page} />
    <Route path="./components/Profile_Page" component={SomePage} />
  </Route>
);