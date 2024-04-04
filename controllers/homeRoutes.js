const express = require('express');
const router = express.Router();


// Redirect root URL to the homepage
router.get('/', (req, res) => {
    res.render('search', {
      loggedIn: req.session.loggedIn,
    }); // Redirect to the homepage route
  });
  
  router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('layouts/login');
  });

module.exports = router;
