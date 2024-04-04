const NodeCache = require('node-cache');
const myCache = new NodeCache();
const { cacheData, getCachedData } = require('../../cache.js');
const express = require('express'); 
const axios = require('axios'); 
require('dotenv').config(); 

const apiKey = process.env.OMDB_API_KEY; // Get the OMDB API key from environment variables
const omdbAxios = axios.create({ // Create an Axios instance for making API requests to OMDB
  baseURL: 'http://www.omdbapi.com/',
  params: {
    apikey: apiKey // Include the API key as a query parameter for authentication
  }
});

const router = express.Router(); // Create a router instance using Express

const isLoggedIn = (req, res, next) => {
    if (req.session.userId) {
      // User is logged in, continue with the next middleware or route handler
      next();
    } else {
      // User is not logged in, redirect to the signup page
      res.redirect('/signup'); // will change '/' 
    }
  };

// Define a GET endpoint for '/movies' route
router.get('api/apiRoutes/movies', isLoggedIn, async (req, res) => {
    try {
      const searchTerm = req.query.search;
  
      // Check if data is already cached
      const cachedData = getCachedData(searchTerm);
      if (cachedData) {
        console.log('Data retrieved from cache');
        res.json(cachedData);
        return; // Exit the route handler since data is already cached
      }
  
      // Data is not cached, make API request and cache the response
      const response = await omdbAxios.get('/', {
        params: {
          s: searchTerm
        }
      });
  
      const movies = response.data.Search;
  
      // Cache the data
      cacheData(searchTerm, movies);
  
      res.json(movies); // Send the movie data as JSON response to the client
    } catch (error) {
      console.error('Error fetching movie data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

module.exports = router; 