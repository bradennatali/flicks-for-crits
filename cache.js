const NodeCache = require('node-cache');
const cron = require('node-cron');
const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

// Initialize NodeCache
const myCache = new NodeCache();

// Initialize Sequelize for database connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
});

// Define a model for storing cached data in the database
const CachedData = sequelize.define('CachedData', {
  key: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  data: {
    type: DataTypes.JSON,
    allowNull: false,
  },
});

// Connect to the database
sequelize.authenticate()
  .then(() => {
    console.log('Connected to the database');
    // Sync the model with the database
    return CachedData.sync();
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

// Function to cache data
const cacheData = (key, data) => {
  myCache.set(key, data);
};

// Function to retrieve cached data
const getCachedData = (key) => {
  return myCache.get(key);
};

// Function to clear cached data
const clearCache = () => {
  myCache.flushAll();
};

// Function to save cached data to the database
const saveCachedDataToDB = () => {
  const cachedData = myCache.keys().map(key => ({ key, data: myCache.get(key) }));
  cachedData.forEach(({ key, data }) => {
    CachedData.upsert({ key, data });
  });
};

// Schedule cron job to save cached data to the database every minute
cron.schedule('* * * * *', () => {
  console.log('Saving cached data to database...');
  saveCachedDataToDB();
});

module.exports = { cacheData, getCachedData, clearCache };
