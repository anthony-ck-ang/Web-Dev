import React, { Component } from 'react';
import axios from 'axios';
//https://www.npmjs.com/package/axios
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
//https://www.npmjs.com/package/react-datepicker

export default class CreateExercise extends Component {
  //constructor to initialise state
  constructor(props) {
    //js classes require to call super when defining a constructor of sub class
    super(props);

    //bind the current 'this' class/obj to the 'this' in the onChange methods
    //prevents the 'undefine error'
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    //map to mongoDB document
    //state are like 'variables' in a class to temporary save fetched data
    // users [] -> in the UI, there will be a dropdown to select all users
    this.state = {
      username: '',
      description: '',
      duration: 0,
      date: new Date(),
      users: []
    }
  }

  // react lifecycle method; called before anything is rendered on page
  componentDidMount() {
    //get and show the list of users directly from mongoDB
    axios.get('http://localhost:5000/users/')
      .then(response => {
        if (response.data.length > 0) {
          //set state of users []
          //set username to first user of the users [{}, {}, {} ...]
          this.setState({
            // response.data === []
            // loop and add just username
            users: response.data.map(user => user.username),
            username: response.data[0].username
          })
        }
      })
      .catch((error) => {
        console.log(error);
      })

  }

  //Setters (set state)
  onChangeUsername(e) {
    //use react setState method to set state
    this.setState({
      //event.FormUiInputElement.value
      username: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }

  onChangeDate(date) {
    this.setState({
      date: date
    })
  }

  //handle form submit event
  onSubmit(e) {
    e.preventDefault();

    //create exercise obj with fetched form data
    const exercise = {
      username: this.state.username,
      description: this.state.description,
      duration: this.state.duration,
      date: this.state.date
    }

    console.log(exercise);

    //* POST to server -> DB
    axios.post('http://localhost:5000/exercises/add', exercise)
      .then(res => console.log(res.data));

    //redirect back to   (list of exercises) after submit form
    window.location = '/'; 
  }

  //Form
  /*
    {} -> put js (call event handlers)

    jsx:
    'className'
    <select> + <option> -> Dropbox menu of users [] (loop and populate)

    <DatePicker /> component
    'selected' -> initial selection
    'onChange' -> user selection
    
  */
  render() {
    return (
    <div>
      <h3>Create New Exercise Log</h3>
      
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Username: </label>

          <select ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}>
                
              {
                this.state.users.map((user) => {
                  return <option 
                    key={user}
                    value={user}>{user}
                    </option>;
                })
              }

          </select>
        </div>

        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>

        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>

        <div className="form-group">
          <label>Date: </label>
          <div>
            <DatePicker
              selected={this.state.date}
              onChange={this.onChangeDate}
            />
          </div>
        </div>

        <div className="form-group">
          <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }

}