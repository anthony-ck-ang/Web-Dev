
## Instructions

Check if node is installed:  `node -v`

## `Create project folder`

## `Create backend folder`
For package.json:  `npm init -y`

`npm install express cors mongoose dotenv`  ||  `npm install --save`<br />
`npm install -g nodemon`


`Notes`:

`Cors` allows ajax req to skip same-origin policy<br />
and access rsc from remote hosts.<br />
Allows server to access rsc outside of our server (diff origin/domain).

`Mongoose` allows interaction mongodb through nodeJS simpler.

`Makes development easier`<br />
`dotenv`
- loads environment variables from .env file to process.env
- instead of setting env var on dev machine, they can be stored in a file

`Nodemon`
- auto restart node app /server when code/file changes


##Back end

1. Create server
server.js <br />
`nodemon server.js`

2. Connection <br />
//https://www.npmjs.com/package/dotenv<br />
Create .env file at root of project || in backend folder<br />
Copy the Cluster connection string from cloud.mongodb.com and past in .env

3. Create models

4. Create routes

5. Test CRUD routes with POSTMAN  ||  Insomnia <br />

&& Check MongoDB Atlas DashBoard

<br />
##Front end:

## `Create frontend folder`

https://github.com/facebook/create-react-app <br />
Bootstrap project with: 
`npx create-react-app mern-exercise-tracker`

Remove unneccessary auto generated files

`npm start` to run app in development mode to check

`npm install bootstrap --save` <br />
`npm install react-router-dom --save`<br />
`npm install react-datepicker --save`<br />
`npm install axios --save`

or
--------------------------------------------
Add to package.json:

  `"dependencies": {
    "axios": "^0.18.0",
    "bootstrap": "^4.3.1",
    "react": "^16.8.6",
    "react-datepicker": "^2.5.0",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.0",
    "react-scripts": "3.0.1"
  }`
  <br />
  `npm install --save`<br />
  `npm update --save`


## General
1. Create and import components to app.js

2. User react-router to map routes/path to load certain components

3. Test individual components

4. Connect front end with back end (http req to back end endpoints)

5. Test the features to see if the components work correctly together

