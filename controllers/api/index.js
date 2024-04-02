const router = require('express').Router();
const apiRoutes = require('./apiRoutes');
const routes = require('./routes');

router.use('/apiRoutes', apiRoutes);
router.use('/routes', routes);

module.exports = router;
