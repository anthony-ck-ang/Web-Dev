const fetch = require('node-fetch');
const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

//https://jobs.github.com/api
const baseURL = 'https://jobs.github.com/positions.json'


async function fetchGithub() {

    console.log('fetching github')

    let resultCount = 1, onPage = 0;
    const allJobs = [];

    //fetch all then filter..

    // fetch all pages
    while(resultCount > 0) {
        try {
            //50 per page
            const res = await fetch(`${baseURL}?page=${onPage}`);
            const jobs = await res.json();

            allJobs.push(...jobs);

            resultCount = jobs.length;
            console.log('got', resultCount, 'jobs');

            onPage++;

        } catch (e) {
            console.log(e + "fetch failed")
        }
    }

    console.log('got', allJobs.length, 'jobs total')
    // console.log('job 1', allJobs[0])

    // filter algo
    const filteredJobs = allJobs.filter(job => {
        const jobTitle = job.title.toLowerCase();
        const jobType = job.type.toLowerCase();

        // filter logic
        if (           
            jobTitle.includes('engineer') && jobType.includes('full time') ||
            jobTitle.includes('developer') && jobType.includes('full time')
        ) {
            // console.log(job.title)
            // console.log(job.type)
            return true;
        } 
        return false;
    })

    console.log('filtered down to', filteredJobs.length);

    // set in redis (cache)
    try {
        // const success = await setAsync('github', JSON.stringify(allJobs));
        const success = await setAsync('github', JSON.stringify(filteredJobs));
        console.log({success});
    } catch (e) {
        console.log(e + "set in redis failed")
    }  
}

module.exports = fetchGithub;