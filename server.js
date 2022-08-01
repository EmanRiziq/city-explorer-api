'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();

app.use(cors());

// console.log(app)
const port = process.env.PORT || 3001;

app.use(express.json());

app.post('data/weather.json', (req, res) => {
  console.log(req.body.todo);
});