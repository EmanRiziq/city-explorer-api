const axios = require('axios');

async function handleWeather(req, res) {
    try {
        let lat = req.query.lat;
        let lon = req.query.lon;
        let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
        let response = await axios.get(url)
        let data = response.data.data.map(item => new Forecast(item))
        console.log(data)
        res.send(data)
    }
    catch (error) {
        res.status(404).send('Weather not found');

    }
}


class Forecast {
    constructor(datetime, description) {
        this.date = datetime;
        this.description = description;
    }
}

module.exports = {handleWeather}
