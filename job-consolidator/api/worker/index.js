//https://www.npmjs.com/package/cron
//https://crontab.guru/#0_*_*_*_*
const CronJob = require('cron').CronJob;

const fetchGithub = require('./tasks/fetch-github')
const fetchStackOverFlow = require('./tasks/fetch-stackoverflow')


new CronJob('* * * * *', fetchGithub, null, true);
new CronJob('* * * * *', fetchStackOverFlow, null, true);
// new CronJob('* * * * *', fetchGithub, null, true, 'America/Los_Angeles');

console.log(fetchGithub)
console.log(fetchStackOverFlow)
console.log(CronJob)