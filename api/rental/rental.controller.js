const {
    getRentalAvailability
} = require('./rental.service')

module.exports = {
    getRentalAvailability : (req, res) => {
        const searchObject = {
            "title" : req.query.title
        }
        getRentalAvailability(searchObject, (err, results) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: 0,
                    message : 'Database Connection Error!'
                })
            }
            if (!results) {
                return res.json({
                    success: 0,
                    message: 'No record found!'
                })
            }
            return res.status(200).json({
                success: 1,
                data: results
            })
        })
    }
}