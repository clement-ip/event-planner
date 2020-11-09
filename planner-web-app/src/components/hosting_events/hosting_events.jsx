import axios from 'axios';
import React from 'react';
import './css/main.css';

export default class hosting_events extends React.Component{

  state = {db_hostevents: [],
      event_name: '',
      organization_name: '',
      topic: '',
      about_event:'',
      contact_email: '',
      contact_phone_num:'',
      duration: '',
      country:'',
      city:'',
      location:''
    }

  componentDidMount(){
    axios.get('/hosting_events')
    .then((response)=>{
        const data = response.data;
        console.log(data)
        this.setState({db_hostevents:data});
        this.formatProfileData();
    })
    .catch(()=>{
        alert('Error retrieving data')
    })
  }
  formatProfileData(){
    this.setState({event_name:this.state.db_hostevents[0].event_name})
    this.setState({organization_name:this.state.db_hostevents[0].organization_name})
    this.setState({topic:this.state.db_hostevents[0].topic})
    this.setState({about_event:this.state.db_hostevents[0].about_event})
    this.setState({contact_email:this.state.db_hostevents[0].contact_email})
    this.setState({contact_phone_num:this.state.db_hostevents[0].contact_phone_num})
    this.setState({duration:this.state.db_hostevents[0].duration})
    this.setState({country:this.state.db_hostevents[0].country})
    this.setState({city:this.state.db_hostevents[0].city})
    this.setState({location:this.state.db_hostevents[0].location})
}

  render(){
      const data = this.state
      console.log('state ', data)
      return(
        <div className="App">
          <section className="container-about">
            <h1>{data.event_name}</h1>

            <h1>Organizanization Name:</h1>
            <p>{data.organization_name}</p>

            <h1>Topic:</h1>
            <p>{data.topic}</p>

            <h1>About Event:</h1>
            <p>{data.about_event}</p>

            <h1>Email:</h1>
            <p>{data.contact_email}</p>

            <h1>Phone Number:</h1>
            <p>{data.contact_phone_num}</p>

            <h1>Duration of Event:</h1>
            <p>{data.duration}</p>

            <h1>Country Location:</h1>
            <p>{data.country}</p>

            <h1>City Location:</h1>
            <p>{data.city}</p>

            <h1>Location of Event:</h1>
            <p>{data.location}</p>

          </section>

        </div>
      );
  }
}
