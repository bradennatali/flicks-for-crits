const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes')
const loginRoutes = require('./loginRoutes.js')

router.use('/api', apiRoutes);
router.use('/', homeRoutes);
router.use('/login', loginRoutes)
module.exports = router;