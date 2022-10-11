const pool = require('../../config/database');

module.exports = {
    createRental : (data, callBack) => {
        pool.query(
            `INSERT INTO rental (rental_date, inventory_id, customer_id, return_date, staff_id, last_update)
            VALUES (?,?,?,?,?,?)`,
            [
                data.rental_date,
                data.inventory_id,
                data.customer_id,
                data.return_date,
                data.staff_id,
                new Date().toISOString().slice(0, 19).replace('T', ' '),
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    updateRental : (data, callBack) => {
        pool.query(
            `UPDATE rental SET
            rental_date = ?,
            customer_id = ?,
            return_date = ?,
            staff_id = ?,
            last_update = ?
            WHERE inventory_id = ?`,
            [
                data.rental_date,
                data.customer_id,
                data.return_date,
                data.staff_id,
                new Date().toISOString().slice(0, 19).replace('T', ' '),
                data.inventory_id,
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    getRentalByFilm : (searchObject, callBack) => {
        pool.query(
            `SELECT * FROM film
            JOIN inventory ON film.film_id = inventory.film_id
            JOIN rental ON inventory.inventory_id = rental.inventory_id
            WHERE film.title LIKE ?`,
            [
                '%'+searchObject.title+'%'
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    getRentalByInventoryID : (data, callBack) => {
        pool.query (
            `SELECT * FROM rental WHERE inventory.id = ? ORDER BY return_date IS NULL DESC, return_date ASC`,
            [
                data.inventory_id
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    getRentalAvailability : (searchObject, callBack) => {
        pool.query(
            `SELECT * FROM film
            JOIN inventory ON film.film_id = inventory.film_id
            JOIN rental ON inventory.inventory_id = rental.inventory_id
            WHERE film.title LIKE ?
            GROUP BY inventory.inventory_id
            ORDER BY return_date IS NULL DESC, return_date ASC`,
            [
                '%'+searchObject.title+'%'
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    }
}