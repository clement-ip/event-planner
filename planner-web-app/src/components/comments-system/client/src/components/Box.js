import React, {Component} from 'react';
import List from './List'
// import Form from './Form'

import './Box.css';

class Box extends Component {
    render() {
        return (
          <section className="box">
            <h1>Comments</h1>
            <List data={this.props.data} />
            <form method="POST" action="http://localhost:5000/post">
                <input type="text" id="name" name="name" placeholder="Name" ></input>
                <input type="text" id="message" name="message" placeholder="Message"></input><br></br>
              <section className="btn">
                <input className="btn btn-primary" type="submit" value="Submit"></input>
              </section>
            </form>
          </section>
        );
    }
}

export default Box;