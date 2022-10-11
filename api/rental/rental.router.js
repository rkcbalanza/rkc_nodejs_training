const {
    getRentalAvailability
} = require('./rental.controller')
const router = require('express').Router();

router.get("/availability", getRentalAvailability);

module.exports = router;