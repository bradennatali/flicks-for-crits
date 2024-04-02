DROP DATABASE IF EXISTS user_db;
CREATE DATABASE user_db;

-- Create a table for caching movie data
CREATE TABLE cached_movies (
    id INT AUTO_INCREMENT PRIMARY KEY,
    search_term VARCHAR(255) NOT NULL,
    movie_data JSON NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);