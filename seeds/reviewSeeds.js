const { Review } = require('../models');

const reviewData = [
  {
    movieId: 1,
    content: 'This movie was amazing!', 
    userId: 1,
    voteReviewId: 1
  },
  {
    movieId: 1, //change once api calls are made and set movie ids accordingly
    content: 'Not bad, but could be better.', 
    userId: 2,
    voteReviewId: 0
  },

  {
    movieId: 2,
    content: 'Film of the Century: Lights, Camera, Action-Packed Satisfaction!',
    userId: 3,
    voteReviewId: 2
  }
];

const seedReviews = async () => {
  await Review.bulkCreate(reviewData);
};

module.exports = seedReviews;
