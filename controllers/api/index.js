const router = require('express').Router();

const flightRoutes = require('./flight-routes');

router.use('/flight', flightRoutes);

module.exports = router;
