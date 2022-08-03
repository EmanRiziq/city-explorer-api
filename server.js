'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');
const app = express();
app.use(cors());
const axios = require('axios');
// console.log(app)
const port = process.env.port || 4001;

//home router
app.get('/home', function (req, res) {
  // res.render('index.ejs');
  res.status(200).send(['hi', 'hello'])
});

app.get('/weather', async (req, res) => {
  try {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&lat=${lat}&lon=${lon}`
    let response = await axios.get(url)
    let data = response.data.map(item => new Forecast(item))
    console.log(data)
    res.send(data)
  }
  catch (error) {
    res.status(400).send(error)
  }
}
)

class Forecast {
  constructor(datetime, description) {
    this.date = datetime;
    this.description = description;
  }
}
app.get('/movies', async (req, res) => {
   
    let searchQuery = req.query.searchQuery;
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const moviesList = await axios.get(moviesUrl);
    console.log(moviesList.data);
    const movieArr = moviesList.data.results.map(day => new MoviesInfo(day));

    try {
      res.send(movieArr)
    } catch (err) {
      console.log('Movie not found');
    }
  }
)
  class MoviesInfo {
    constructor(movie) {
      this.title = movie.original_title;
      this.date = movie.release_date;
      this.path = movie.poster_path;
      this.des = movie.overview;
      this.rate = movie.vote_average;
    }
  }
    // class Movies {
  //   constructor(Movie) {
  //     this.title = Movie.title;
  //     this.overview = Movie.overview;
  //     this.average_votes = Movie.average_votes;
  //     this.total_votes = Movie.total_votes;
  //     this.image_url = Movie.image_url;
  //     this.popularity = Movie.popularity;
  //     this.released_on = Movie.released_on
  //   }
  // }





  // app.get('/movies', async (req, res) => {
  //   const test = req.query.searchQuery;
  //   const url = `https://api.themoviedb.org/3/movie/550?api_key=${process.env.MOVIE_API_KEY}&query=${test}`
  //   console.log(url)
  //   const movieData = await axios.get(url)
  //   console.log(movieData.data)
  //   // let data = movieData.data.results.map(item => { return new Movies(item) })

  //   res.send(movieData)

  //   // try {   
  //   // }
  //   // catch (error) {
  //   //   res.status(400).send(error)
  //   // }
  // }
  // )

  // class Movies {
  //   constructor(Movie) {
  //     this.title = Movie.title;
  //     this.overview = Movie.overview;
  //     this.average_votes = Movie.average_votes;
  //     this.total_votes = Movie.total_votes;
  //     this.image_url = Movie.image_url;
  //     this.popularity = Movie.popularity;
  //     this.released_on = Movie.released_on
  //   }
  // }



  app.listen(port, () => {
    console.log('working ')
  })
