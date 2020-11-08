import React, {Component} from 'react';
import List from './List'
import './Box.css';
import axios from 'axios';
import io  from "socket.io-client"

const SERVER = "http://localhost:5000";

class Box extends Component {

    constructor(props){
      super(props);
      this.state = {
        comments: []
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.fetchData = this.fetchData.bind(this);
    }

    componentDidMount() {
      axios.get('/comment')
        .then(({data}) => this.setState({ comments: data }))
        .catch(e => console.log(e))
      const socket = io(SERVER, {transports: ['websocket']});
      socket.on('Comment', (msg) => {
        console.log("Received: ", msg);
        this.fetchData();
      });
    }

    fetchData() {
      axios.get('/comment')
        .then(({data}) => this.setState({ comments: data }))
        .catch(e => console.log(e))
    }

    handleSubmit(e) {
      e.preventDefault();
      const newComment = JSON.stringify({name: e.target.name.value, message: e.target.message.value});
      console.log("New Comment: ", newComment);
      const socket = io(SERVER, {transports: ['websocket']});
      socket.emit('Comment', newComment);
      axios.post('http://localhost:5000/comment', newComment, {
        headers: {
            'Content-Type': 'application/json',
            }
          }
        )
        .then(response => {
          this.fetchData();
        })
    };

    css = `.hide { position:absolute; top:-1px; left:-1px; width:1px; height:1px; }`
    render() {
        return (
          <section className="box">
            <h1>Comments</h1>
            <List data={this.state.comments} />
            <style>{this.css}</style>
            <iframe title="hiddenFrame" name="hiddenFrame" className="hide"></iframe>
            <form method="POST" id="form" target="hiddenFrame" onSubmit={this.handleSubmit}>
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