const User = require('./user');
const Review = require('./review');

User.hasMany(Review, {
    foreignKey: 'user_id',
});

Review.belongsTo(User, {
    foreignKey: 'user_id',
});

module.exports = { User, Review};
