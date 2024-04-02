const express = require('express');
const router = express.Router();


// Redirect root URL to the homepage
router.get('/', (req, res) => {
    res.render('movies'); // Redirect to the homepage route
  });
  

module.exports = router;
