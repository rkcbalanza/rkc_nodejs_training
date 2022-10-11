const {
    getAllCustomers,
    getCustomerBySearchParameters
} = require('./customer.service')

module.exports = {
    getAllCustomers : (req, res) => {
        getAllCustomers((err, results) => {
            if (err) {
                console.log(err);
                return res.status(500),json({
                    success : 0,
                    message : 'Database Connection Error!'
                });
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        });
    },
    getCustomerBySearchParameters : (req, res) => {
        const searchObject = {
            "first_name" : req.query.first_name,
            "last_name" : req.query.last_name,
            "country" : req.query.country
        }
        getCustomerBySearchParameters (searchObject, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success : 0,
                    message : 'Database Connection Error!'
                });
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No Record Found!'
                })
            }
            return res.status(200).json({
                success : 1,
                data : results
            })
        })
    }
}