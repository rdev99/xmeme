// Importing Modules

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const meme_route = require('./routes/meme_route')
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./swagger.json')


const app1=express();
const app=express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app1.use('/swagger-ui',swaggerUi.serve,swaggerUi.setup(swaggerDocument));

// Connecting to the database

const db = 'mongodb://localhost:27017/meme';

mongoose.connect(db,{ useNewUrlParser: true,useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected....'))
    .catch(err => console.log(err));


app.use('/',meme_route);

// Define the port to listen

const PORT=8081;
const SPORT=8080;
app.listen(PORT,() => {console.log(`Server Started on port ${PORT}`)})
app1.listen(SPORT,() => {console.log(`Swagger UI started on port ${SPORT}`)})