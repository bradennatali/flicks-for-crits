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

const isLoggedIn = (req, res, next) => {
  if (req.session.userId) {
    // User is logged in, continue with the next middleware or route handler
    next();
  } else {
    // User is not logged in, redirect to the signup page
    res.redirect('/signup'); 
  }
};


// Redirect root URL to the homepage
router.get('/', (req, res) => {
  res.redirect('/main'); // Redirect to the homepage route
});

// Homepage route
router.get('/home', isLoggedIn, (req, res) => {
  res.render('main'); // Render the 'home' Handlebars template
});


// GET route to fetch movies based on search term
router.get('/movies', isLoggedIn, async (req, res) => {
  try {
    const searchTerm = req.query.search;
    const response = await omdbAxios.get('/', {
      params: {
        s: searchTerm
      }
    });

    // Extract movie data from the response and format it
    const movies = response.data.Search.map(movie => ({
      title: movie.Title,
      year: movie.Year,
      poster: movie.Poster,
      imdbID: movie.imdbID
    }));
    res.json(movies); // Send the formatted movie data as JSON response
  } catch (error) {
    console.error(error); // Log any errors that occur during the API request
    res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 status code with error message
  }
});

// POST route to add a review to a movie
router.post('/movies/:imdbID/reviews', isLoggedIn, async (req, res) => {
  try {
    const { imdbID } = req.params;
    const { content, userId } = req.body;

    // Check if the movie with the specified IMDb ID exists in the database
    const movie = await Movie.findOne({ where: { imdbID } });
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' }); // Send 404 status code if movie not found
    }

    // Create and save the review for the movie
    const review = await Review.create({ content, userId, movieId: movie.id });

    // Send a success response with the newly created review
    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error); // Log any errors that occur during the review creation process
    res.status(500).json({ error: 'Internal Server Error' }); // Send a 500 status code with error message
  }
});

module.exports = router;
