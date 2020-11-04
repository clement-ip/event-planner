import React from 'react';
import Box from './components/Box'
// import Axios from "axios";

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

var data = [
  {id: 1, author: "User1", text: "Hello world"},
  {id: 2, author: "User2", text: "Hello world"},
  {id: 3, author: "User3", text: "Hello world"},
  {id: 4, author: "User4", text: "Hello world"},
  {id: 5, author: "User5", text: "Hello world"},
  {id: 6, author: "User6", text: "Hello world"},
  {id: 7, author: "User7", text: "Hello world"},
  {id: 8, author: "User8", text: "Hello world"},
  {id: 9, author: "User9", text: "Hello world"},
  {id: 10, author: "User10", text: "Hello world"},
  {id: 11, author: "User11", text: "Hello world"},
  {id: 12, author: "User12", text: "Hello world"},
  {id: 13, author: "User13", text: "Hello world"},
  {id: 14, author: "User14", text: "Hello world"},
  {id: 15, author: "User15", text: "Hello world"},
  {id: 16, author: "User16", text: "Hello world"},
  {id: 17, author: "User17", text: "Hello world"},
  {id: 18, author: "User18", text: "Hello world"}
];

function App() {
  // Axios({
  //   method: "GET",
  //   url: "http://localhost:3000/",
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(res => {
  //   console.log(res.data.message);
  // });
  return (
    <section className="comment-component">
      <Box data={data} />
    </section>
  );
}

export default App;
