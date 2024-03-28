const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { Movie, Review } = require('./models/reviews.js'); 
const router = express.Router();

// Create an Axios instance with the OMDB API key as an authorization header
const apiKey = process.env.OMDB_API_KEY;
const omdbAxios = axios.create({
  baseURL: 'http://www.omdbapi.com/',
  params: {
    apikey: apiKey
  }
});

// GET route to fetch movies based on search term
router.get('/movies', async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const response = await omdbAxios.get('/', {
      params: {
        s: searchTerm
      }
    });

    const movies = response.data.Search.map(movie => ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbID: movie.imdbID
    }));
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST route to add a review to a movie
router.post('/movies/:imdbID/reviews', async (req, res) => {
  try {
    const { imdbID } = req.params;
    const { content, userId } = req.body;

   // Check if the movie exists
const movie = await Movie.findOne({ where: { imdbID } });
if (!movie) {
  return res.status(404).json({ error: 'Movie not found' });
}

// Create and save the review
const review = await Review.create({ content, userId, movieId: movie.id });

res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
