"use strict";

require('dotenv').config();

const axios = require('axios');
const movieCashe = {};

async function handleMovies(req, res) {

    let searchQuery = req.query.searchQuery;
    if (movieCashe[searchQuery] !== undefined) {
        res.send(movieCashe[searchQuery])
    }
    else {
        const moviesUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${searchQuery}`;
        const moviesList = await axios.get(moviesUrl);
        // console.log(moviesList.data);
        const movieArr = moviesList.data.results.map(day => new MoviesInfo(day));
        movieCashe[searchQuery] = movieArr


        try {
            res.send(movieArr)
        } catch (err) {
            res.status(404).send('Movie not found');
        }
    }
}

class MoviesInfo {
    constructor(movie) {
        this.title = movie.original_title;
        this.date = movie.release_date;
        this.path = (movie.poster_path ? `http://image.tmdb.org/t/p/w500${movie.poster_path}` : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT21FY3SpqoXi4NcShIpKXZDVGzTsrPkiyCEA&usqp=CAU');
        this.des = movie.overview;
        this.rate = movie.vote_average;
    }
}

module.exports = { handleMovies }