const router = require('express').Router();
const flights = [];


// CREATE new flight
router.post('/', (req, res) => {
  try {
    const flight = req.body;
    flight.id = req.app.locals.flights.length + 1;
    req.app.locals.flights.push(req.body);

    res.status(200).json(req.body);

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update existing flight
router.put('/:id', (req, res) => {
  try {
    const flight = req.app.locals.flights.filter(x => x.id == req.params.id)[0];
    flight.cityOrigin = req.body.cityOrigin;
    flight.cityDestination = req.body.cityDestination;
    flight.departureDate = req.body.departureDate;
    flight.arrivalDate = req.body.arrivalDate;
    
    res.status(201).json();

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Update existing flight
router.delete('/:id', (req, res) => {
  try {
    req.app.locals.flights = req.app.locals.flights.filter(x => x.id != req.params.id);

    res.status(201).json();

  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
