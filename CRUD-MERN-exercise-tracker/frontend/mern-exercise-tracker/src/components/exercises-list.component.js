import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Exercise functional component (just props and jsx)
const Exercise = props => (
  <tr>
    <td>{props.exercise.username}</td>
    <td>{props.exercise.description}</td>
    <td>{props.exercise.duration}</td>
    <td>{props.exercise.date.substring(0,10)}</td>
    <td>
      <button><Link to={"/edit/"+props.exercise._id}>edit</Link></button> | <button onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</ button>
    </td>
  </tr>
)

//Class component (state + LC methods)
export default class ExercisesList extends Component {
  constructor(props) {
    super(props);

    this.deleteExercise = this.deleteExercise.bind(this)

    //state
    this.state = {exercises: []};
  }

  //Get the list of exercises from the DB and set it to state
  componentDidMount() {
    axios.get('http://localhost:5000/exercises/')
      .then(response => {
        //set all data
        this.setState({ exercises: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  //Delete exercise function, @id to match mongodb obj _id
  deleteExercise(id) {
    axios.delete('http://localhost:5000/exercises/'+id)
      .then(response => { console.log(response.data)});

    //'Remove' the exercise displayed to users
    this.setState({
      //loop through the exercise[] and for each element, only return it if it's _id != to deleted id
      //and set new state
      exercises: this.state.exercises.filter(el => el._id !== id)
    })
  }

  //Exercise list function
  //Loop through the exercises[] in the state obj
  // Pass in props (exe obj and _id) from state and delete method to each exercise component and return it to jsx tbody (tr)
  exerciseList() {
    return this.state.exercises.map(currentexercise => {
      return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}/>;
    })
  }

  //Home page of app
  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>

        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            { this.exerciseList() }
          </tbody>

        </table>
      </div>
    )
  }

}