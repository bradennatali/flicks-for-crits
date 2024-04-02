const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Assuming you have a User model

const router = express.Router();

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the email exists in the database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please sign up.' });
    }

    // Check if the password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Invalid password.' });
    }

    // Set session data to indicate user is logged in
    req.session.userId = user.id;

    res.status(200).json({ message: 'Login successful.', user });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Logout route
router.get('/logout', (req, res) => {
  // Destroy session data to log out the user
  req.session.destroy((err) => {
    if (err) {
      console.error('Error logging out:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(200).json({ message: 'Logout successful.' });
    }
  });
});

module.exports = router;
