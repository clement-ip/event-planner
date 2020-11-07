import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventCalendar from './component/EventCalendar';
import EventForm from './component/EventForm';


function App() {


  return (
      <div className ="container">
        <div className="col1">
          <h1>FORM</h1>
          <EventForm/>
        </div>
        <div className="col2">
          <EventCalendar/>
        </div>
      </div>
  );
}

export default App;
