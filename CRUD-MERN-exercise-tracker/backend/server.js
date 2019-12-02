const express = require('express');
/** Cors allows ajax req to skip same-origin policy
and access rsc from remote hosts.
Allows server to access rsc outside of our server (diff origin/domain). **/
const cors = require('cors');
const mongoose = require('mongoose'); //help connect to mongodb

//https://www.npmjs.com/package/dotenv
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

//Middlewares
app.use(cors());
app.use(express.json()); //parse json; server send and receive json

//Connect to mongodb atlas
//https://www.npmjs.com/package/mongoose
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Import Routers and use
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
