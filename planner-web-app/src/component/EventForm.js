import React from "react";
import axios from "axios";

export default class MyForm extends React.Component{

    state = {  name: '',
                description: '',
                start_date: '',
                end_date:''}


    handleChange=({target}) =>{
        const {name, value} = target;
        this.setState({
            [name]: value
        });
        //this.setState({[name]:value})
    }

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target[0].value)
/*
        this.state.name = e.target[0].value;
        this.state.description = e.target[1].value;
        this.state.s_date = e.target[2].value;
        this.state.e_date = e.target[3].value;
*/
        console.log(this.state)
        var event = {
            name: this.state.name,
            description: this.state.description,
            start_date: this.state.start_date,
            end_date: this.state.end_date
        }
        console.log(event)

        axios({
            url: '/api/save',
            method: 'POST',
            data: event
        })
            .then(() =>{
                console.log("data has been sent to the server");
                this.resetUserInputs();
        })
            .catch((error) =>{
                console.log(error);
                console.log("Server Error");
        });

        //request server add event.
    }


    resetUserInputs = () =>{
        this.setState({
            name: '',
            description: '',
            start_date: '',
            end_date:''
        });
    };

    render(){
        console.log('state ', this.state)
        return(
            <form onSubmit={this.handleSubmit}>
            <label>
                Name of Event:
                <input type="text"
                       name="name"
                       value ={this.state.name}
                       onChange={this.handleChange}/>
            </label>
            <br></br>
            <label>
                Description of event:
                <textarea type="text"
                          name="description"
                          cols="30" rpws="20"
                          value={this.state.description}
                          onChange={this.handleChange}/>
            </label>
            <br></br>
            <label>
                Start date:
                <input type="date"
                       name="start_date"
                       value={this.state.start_date}
                       onChange={this.handleChange}/>
            </label>
            <br></br>
            <label>
                End date:
                <input type="date"
                       name="end_date"
                       value={this.state.end_date}
                       onChange={this.handleChange}/>
            </label>
            <br></br>
            <input type="submit" value="Submit" />
        </form>
        );
    }
}
