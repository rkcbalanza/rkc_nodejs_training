const {
    getAllCustomers,
    getCustomerBySearchParameters
} = require('./customer.controller');
const router = require('express').Router();

router.get("/", getCustomerBySearchParameters);

module.exports = router;