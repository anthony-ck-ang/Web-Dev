//https://www.npmjs.com/package/rss-parser
const Parser = require('rss-parser');
const parser = new Parser();

const redis = require("redis"),
    client = redis.createClient();

const {promisify} = require('util');
const setAsync = promisify(client.set).bind(client);

const baseURL = 'https://stackoverflow.com/jobs/feed'
//https://stackoverflow.com/jobs/feed?q=dev
//https://stackoverflow.com/jobs/feed?q=developer
//https://stackoverflow.com/jobs/feed?q=developer+java+singapore


async function fetchStackOverFlow() {

    console.log('fetching stackoverflow')

    const allJobs = [];

    //pass xml -> js obj
    let feed = await parser.parseURL(`${baseURL}?q=developer+java+singapore`);
    console.log(feed.title);

    feed.items.forEach(item => {
        allJobs.push(item);
        // console.log(item)
        // console.log("---------------------------------------------------------------------")
    });
    
    console.log(allJobs.length);


//------------------------------------------------------
    //filter algo
    let = devCount = 0, engCount = 0,  anlCount = 0, javaCount = 0, jsCount = 0;

    const filteredJobs = allJobs.filter(job => {
        const jobTitle = job.title;
        const jobCat = job.categories;

        console.log(job.title)
        console.log(job.categories)

        if(jobTitle.includes('developer') || jobCat.includes('developer')) devCount++;
        if(jobTitle.includes('engineer') || jobCat.includes('engineer')) engCount++;
        if(jobTitle.includes('analyst') || jobCat.includes('analyst')) anlCount++;
        if(jobTitle.includes('java') || jobCat.includes('java')) javaCount++;
        if(jobTitle.includes('javascript') || jobCat.includes('javascript')) jsCount++;

        console.log("developer " + devCount)
        console.log("engineer " + engCount)
        console.log("Analyst " + anlCount)
        console.log("java " + javaCount)
        console.log("javascript " + jsCount)

    // return true;
        // filter logic
        if (
		
            // jobTitle.includes('engineer') || jobCat.includes('java') ||
            // jobTitle.includes('developer') || jobCat.includes('javascript') ||
            // jobTitle.includes('analyst') && jobCat.includes('react')

            jobTitle.includes('developer') || jobCat.includes('developer') &&
            jobTitle.includes('javascript') || jobCat.includes('javascript')

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
        // const success = await setAsync('StackOverFlow', JSON.stringify(allJobs));
        const success = await setAsync('StackOverFlow', JSON.stringify(filteredJobs));
        console.log({success});
    } catch (e) {
        console.log(e + "set in redis failed")
    }  
}

module.exports = fetchStackOverFlow;