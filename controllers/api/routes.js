const express = require('express');
const axios = require('axios');
require('dotenv').config();
const { Movie, Review } = require('../../models/review.js');
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


// POST route to add a review to a movie
router.post('/movies/:imdbID/reviews', isLoggedIn, async (req, res) => {
  try {
    const { imdbID } = req.params;
    const { content, userId } = req.body;

    // Check if the movie with the specified IMDb ID exists in the cached data
    const movie = getCachedData(imdbID);
    if (!movie) {
      // Movie not found in cache, send API request to OMDB
      const response = await omdbAxios.get('/', {
        params: {
          i: imdbID // Use the IMDb ID for a specific movie
        }
      });

      // Check if the movie is found in the API response
      if (response.data.Response === 'True') {
        // Cache the movie data
        cacheData(imdbID, response.data);
        
        // Create and save the review for the movie
        const review = await Review.create({ content, userId, movieId: imdbID });

        // Send a success response with the newly created review
        res.status(201).json({ message: 'Review added successfully', review });
      } else {
        // Movie not found in API response
        res.status(404).json({ error: 'Movie not found in API' });
      }
    } else {
      // Movie found in cache, create and save the review
      const review = await Review.create({ content, userId, movieId: imdbID });

      // Send a success response with the newly created review
      res.status(201).json({ message: 'Review added successfully', review });
    }
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
