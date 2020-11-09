import axios from 'axios';
import React from 'react';
import './css/main.css';

export default class ProfilePage extends React.Component{

  state = {db_profiles: [],
      first_name: '',
      last_name: '',
      about:'',
      interests: '',
      occupation: '',
      skills: '',
      organization:'',
      job_title:''
    }

  componentDidMount(){
    axios.get('/profile')
    .then((response)=>{
        const data = response.data;
        this.setState({db_profiles:data});
        this.formatProfileData();
    })
    .catch(()=>{
        alert('Error retrieving data')
    })
  }
  formatProfileData(){
    this.setState({first_name:this.state.db_profiles[0].first_name})
    this.setState({last_name:this.state.db_profiles[0].last_name})
    this.setState({about:this.state.db_profiles[0].about})
    this.setState({interests:this.state.db_profiles[0].interests})
    this.setState({occupation:this.state.db_profiles[0].occupation})
    this.setState({skills:this.state.db_profiles[0].skills})
    this.setState({organization:this.state.db_profiles[0].organization})
    this.setState({job_title:this.state.db_profiles[0].job_title})

}

  render(){
      const data = this.state
      console.log('state ', data)
      return(
        <div className="App">
          <section className="container-about">
            <h1><p>{data.first_name} {data.last_name}</p> </h1>
            <p>{data.about}</p>

            <h1>Interests</h1>
            <p>{data.interests}</p>

            <h1>Occupation</h1>
            <p>{data.occupation}</p>

            <h1>Skills</h1>
            <p>{data.skills}</p>

          </section>
          {/* <section className="container-about">
            <h1>Org the Organization</h1>
            <h2>About Org</h2>
            <p>INSERT PARAGRAPH. INSERT PARAGRAPH. INSERT PARAGRAPH. INSERT PARAGRAPH.</p>
            <h3>Role in Organization</h3>
            <p>Project Coordinator</p>
          </section> */}
        </div>
      );
  }
}

// export default ProfilePage;
