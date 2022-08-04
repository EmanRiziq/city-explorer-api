"use strict";

require('dotenv').config();

const axios = require('axios');

async function handleMovies(req, res) {

    let searchQuery = req.query.searchQuery;
    const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
    const moviesList = await axios.get(moviesUrl);
    console.log(moviesList.data);
    const movieArr = moviesList.data.results.map(day => new MoviesInfo(day));

    try {
        res.send(movieArr)
    } catch (err) {
        res.status(404).send('Movie not found');
    }
}

class MoviesInfo {
    constructor(movie) {
        this.title = movie.original_title;
        this.date = movie.release_date;
        this.path = movie.poster_path;
        this.des = movie.overview;
        this.rate = movie.vote_average;
    }
}

module.exports = { handleMovies }