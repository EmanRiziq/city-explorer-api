'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');
const port = process.env.port || 3002;
const { handleWeather } = require('./modules/weather');
const { handleMovies } = require('./modules/movies');



//home router
app.get('/', (req, res) => {
  res.status(200).send(['hi', 'hello'])
});

app.get('/weather', handleWeather)
app.get('/movies', handleMovies)


app.listen(port, () => {
  console.log('working port ' + port)
})
