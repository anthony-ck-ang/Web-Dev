
## Instructions

check node installed: `node -v`

Create project folder

### `Create backend folder`
For package.json: `npm init -y`<br />
`npm install express cors mongoose dotenv` || `npm install --save`<br />
`npm install -g nodemon`

`Notes`:

Cors allows ajax req to skip same-origin policy<br />
and access rsc from remote hosts.<br />
Allows server to access rsc outside of our server (diff origin/domain).

Mongoose allows interaction mongodb through nodeJS simpler.

Makes development easier:
dotenv:
- loads environment variables from .env file to process.env
- instead of setting env var on dev machine, they can be stored in a file

Nodemon
- auto restart node app /server when code/file changes


===========================================
##Back end

1. Create server; server.js
`nodemon server.js`

2. Connection
//https://www.npmjs.com/package/dotenv
Create .env file at root of project || in backend folder
Copy the Cluster connection string from cloud.mongodb.com and past in .env

3. Create models

4. Create routes

5. Test routes with POSTMAN || Insomnia
CRUD
Check MongoDB Atlas DashBoard

===========================================
##Front end:

create frontend folder

https://github.com/facebook/create-react-app
Bootstrap project with:
`npx create-react-app mern-exercise-tracker`

Remove unneccessary auto generated files

`npm start` to run app in development mode to check

`npm install bootstrap --save`
`npm install react-router-dom --save`
`npm install react-datepicker --save`
`npm install axios --save`

|
--------------------------------------------
Add to package.json:

  "dependencies": {
    "axios": "^0.18.0",
    "bootstrap": "^4.3.1",
    "react": "^16.8.6",
    "react-datepicker": "^2.5.0",
    "react-dom": "^16.8.6",
    "react-router-dom": "^5.0.0",
    "react-scripts": "3.0.1"
  }
  
  `npm install --save`
  `npm update --save`

===========================================
1. Create and import components to app.js

2. User react-router to map routes/path to load certain components

3. Test individual components

4. Connect front end with back end (http req to back end endpoints)

5. Test the features to see if the components work correctly together





### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
