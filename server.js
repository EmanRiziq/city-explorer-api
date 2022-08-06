'use strict'
const express = require('express');
const app = express();


require('dotenv').config();


const handleWeather = require('./modules/weather');
const handleMovies = require('./modules/movies');



const cors = require("cors");
app.use(cors());


const port = process.env.PORT 
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})


app.get('/', (_req, res) => {
    res.send('Hello World')
}
)

app.get('/weather', handleWeather);
app.get('/movies', handleMovies);