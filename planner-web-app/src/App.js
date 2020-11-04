import React from 'react';
import logo from './logo.svg';
import './App.css';
import EventCalendar from './component/EventCalendar';

function App() {


  /*
  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    event.preventDefault();
  }
  */

  return (
      <div className ="container">
        <div className="col1">
          <h1>FORM</h1>
          <form>
            <label>
              Name of Event:
              <input type="text" name="name" />
            </label>
            <br></br>
            <label>
              Description of event:
              <input type="text" name="name" />
            </label>
            <br></br>
            <label>
              Start date:
              <input type="date" name="name" />
            </label>
            <br></br>
            <label>
              End date:
              <input type="date" name="name" />
            </label>
            <br></br>
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div className="col2">
          <EventCalendar/>
        </div>

      </div>


  );
}

export default App;
