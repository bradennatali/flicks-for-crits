// Import required modules
const axios = require('axios');
const NodeCache = require('node-cache');
require('dotenv').config();

// Create a new instance of NodeCache for caching data
const myCache = new NodeCache();

// OMDB API base URL and API key
const omdbBaseUrl = 'http://www.omdbapi.com/';
const apiKey = process.env.OMDB_API_KEY; // Get the OMDB API key from environment variables

// Function to fetch movie data from the OMDB API
async function fetchMovieData(imdbID) {
  try {
    // Check if data is already cached
    const cachedData = myCache.get(imdbID);
    if (cachedData) {
      console.log('Movie data retrieved from cache');
      return cachedData;
    }

    // Data not cached, make API request to OMDB
    const response = await axios.get(`${omdbBaseUrl}?i=${imdbID}&apikey=${apiKey}`);

    // Cache the data
    myCache.set(imdbID, response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching movie data from OMDB API:', error);
    throw error; // Rethrow the error for handling in the calling function
  }
}

module.exports = {
  fetchMovieData,
};
