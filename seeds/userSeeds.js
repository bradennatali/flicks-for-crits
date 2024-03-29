const { User } = require('../models');

const userData = [
  {
    userId: '1',
    name: 'Rusty Naylor',
    email: 'rustynaylor@example.com',
    password: 'simplepassword'
  },
  {
    userId: '2',
    name: 'Al Beback',
    email: 'terminator2@example.com',
    password: 'arnold'
  },
  {
    userId: '3',
    name: 'Paige Turner',
    email: 'PaigeTurner@example.com',
    password: 'notsosimplepassword'
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
