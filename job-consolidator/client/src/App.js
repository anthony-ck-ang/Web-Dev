import React from 'react';
import './App.css';

import Jobs from './Jobs';

const JOB_API_URL = '/api/jobs';
// const JOB_API_URL = '/api/jobs/StackOverFlow';

async function fetchJobs(updateCb) {
  const res = await fetch(JOB_API_URL);
  let json = await res.json();
  
  updateCb(json);
}

function App() {

  const [jobList, updateJobs] = React.useState([]);

  //https://reactjs.org/docs/hooks-effect.html
  React.useEffect(() => {
    fetchJobs(updateJobs); //fetch jobs and update state after render
  }, []) //only run effect once

  return (
    <div className="App">
      <Jobs jobs={jobList} />
    </div>
  );
}

export default App;
