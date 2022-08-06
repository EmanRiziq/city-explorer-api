"use strict";

require('dotenv').config();
const axios = require('axios');
const weatherCashe = {};

async function handleWeather(req, res) {

    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery

    if (weatherCashe[searchQuery] !== undefined) {
        res.send(weatherCashe[searchQuery])
    }
    else {

        let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
        let response = await axios.get(url)
        try {
            let data = response.data.data.map(item => new Forecast(item))
            weatherCashe[searchQuery] = data
            res.send(data)
        }
        catch (error) {
            res.status(404).send('Weather not found');

        }
    }
}


class Forecast {
    constructor(day) {
        this.date = day.valid_date;
        this.description =`Low of ${day.low_temp}, high of ${day.max_temp} with ${ day.weather.description}`;
    }
}

module.exports =  handleWeather 
