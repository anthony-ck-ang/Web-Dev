const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); 
require('dotenv').config();
// const config = require('./config');

//Server
const app = express();
const port = process.env.PORT || 3000;
app.listen(port, () =>{ console.log(`Server is running on port: ${port}`)});

//Middlewares
app.use(cors());
app.use(express.json());
app.use('/', express.static(__dirname + '/angular/public')); //server to serve html
// app.set('view engine', 'ejs');


//DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// mongoose.connect(config.getDbConnectionString(), { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
// );
// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

//Controllers
let setupController = require('./controllers/setupController');
let apiController = require('./controllers/apiController');

setupController(app);
apiController(app);


