const pool = require('../../config/database');

module.exports = {
    getAllCustomers: callBack => {
        pool.query(
            `SELECT * FROM customer`,
            [],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    getCustomerBySearchParameters : (searchObject, callBack) => {
        pool.query(
            `SELECT * FROM customer
            JOIN address ON customer.address_id = address.address_id
            JOIN city ON address.city_id = city.city_id
            JOIN country ON city.country_id = country.country_id`,
            [],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                if(searchObject) {
                    res = res.filter(
                        r => (searchObject.first_name ? r.first_name.toLowerCase().indexOf(searchObject.first_name.toLowerCase()) >= 0 : true) &&
                        (searchObject.last_name ? r.last_name.toLowerCase().indexOf(searchObject.last_name.toLowerCase()) >= 0 : true) &&
                        (searchObject.country ? r.country.toLowerCase().indexOf(searchObject.country.toLowerCase()) >= 0 : true)
                    )
                    return callBack(null, res);
                }
            }
        )
    }
}