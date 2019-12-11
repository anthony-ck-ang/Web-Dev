
import { useState, useEffect } from "react";
import React from 'react';
import './App.css';

import Jobs from './Jobs';

const JOB_API_URL = '/api/jobs';
// const JOB_API_URL = '/api/jobs/StackOverFlow';

const App = resource => {
  const [listOfJobs, setJobs] = useState([]);

  const fetchResource = async resource => {
    const res = await fetch(JOB_API_URL);
    let json = await res.json();

    setJobs(json);
  };

  // https://reactjs.org/docs/hooks-effect.html
  // If 'resource' value is same, arrow func is not called.
  // If diff, will fetch after each re-render
  useEffect(() => {
    fetchResource(resource);
  }, [resource]);

  //pass in the listOfJobs
    return (
    <div className="App">
      <Jobs jobs={listOfJobs} />
    </div>
  );
};

// async function fetchJobs(updateJobs) {
//   const res = await fetch(JOB_API_URL);
//   let json = await res.json();
  
//   updateJobs(json);
// }

// function App() {

//   const [jobList, updateJobs] = React.useState([]);

//   //https://reactjs.org/docs/hooks-effect.html
//   React.useEffect(() => {
//     fetchJobs(updateJobs); //fetch jobs and update state after render
//   }, []) //only run effect once

//   return (
//     <div className="App">
//       <Jobs jobs={jobList} />
//     </div>
//   );
// }

export default App;
