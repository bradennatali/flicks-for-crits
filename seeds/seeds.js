const seedUsers = require('./userSeeds');
const seedReviews = require('./reviewSeeds');

const seedAll = async () => {
  await seedUsers();
  await seedReviews();

};

seedAll();