const seedUsers = require('./user-seeds');
const seedReviews = require('./review-seeds');

const seedAll = async () => {
  await seedUsers();
  await seedReviews();

};

seedAll();