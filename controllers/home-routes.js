const router = require('express').Router();


router.get('/', async (req, res) => {
  try {
    const flights = req.app.locals.flights;
    res.render('homepage', { flights });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
