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

// Define a GET endpoint for '/movies' route
router.get('/movies', async (req, res) => {
  try {
    const searchTerm = req.query.search; // Extract the search term from the query parameters
    const response = await omdbAxios.get('/', { // Send a GET request to the OMDB API
      params: {
        s: searchTerm // Set the 's' parameter to the search term
      }
    });

    const movies = response.data.Search; // Extract the list of movies from the API response
    res.json(movies); // Send the movie data as JSON response to the client
  } catch (error) {
    console.error('Error fetching movie data:', error); // Log any errors that occur during the API request
    res.status(500).json({ error: 'Internal Server Error' }); // Send an error response with status code 500
  }
});

module.exports = router; // Export the router module for use in other parts of the application
