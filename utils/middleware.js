const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const { sequelize } = require('./models'); // Assuming you have Sequelize initialized in models/index.js

const app = express();

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session Middleware
const sess = {
  secret: 'Super secret secret',
  cookie: { maxAge: 86400000 }, // Session expires after 24 hours (adjust as needed)
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({ db: sequelize }), // Store sessions in the database using Sequelize
};

app.use(session(sess));

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Internal Server Error');
});

// Export the app for use in other files
module.exports = app;
