// Express is framework to handle node js
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');

const { send } = require('process');
// req handling  json, xml , urln-encoded
// Mongoose to connect with mongodb (node js(express) + mongodb)

const cors = require('cors');
const cookieParser = require('cookie-parser');

const moviesRoutes = require('./routes/movies');
const userRoutes = require('./routes/users');


app.use(cors());
app.use(express.json());
app.options('*', cors());
app.use('/images', express.static(path.join('backend/images')));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, DELETE, PATCH, PUT');
  next();
});



// Routing apis
app.use('/api/movies', moviesRoutes);
app.use('/api/user', userRoutes);
app.get("/", (req, res) => res.sendFile(__dirname + "/dist"));
app.get("/api/energy/addEnergy", (req, res) => res.sendFile(__dirname + "/dist"));

mongoose.connect(
    'mongodb://localhost:27017/netflixdemo',
    // @ts-ignore
)
.then(() => {
    console.log('Dabatabase connected');
})
.catch(() => {
    console.log('Dabatabase Error');
});

// mongoose.connect(
//   'mongodb+srv://rsatechiiot:rahul0808@cluster0.xr62nmr.mongodb.net/netflixdemo',
//   // @ts-ignore
//  { useNewUrlParser: true,
//   useUnifiedTopology: true }
//  )
// .then(() => {
//   console.log('Dabatabase connected mongo');
// })
// .catch(() => {
//   console.log('Dabatabase Error');
// });

const Movies = require('./model/movies');

app.use(bodyParser.json());
app.use(cookieParser());




module.exports = app;
