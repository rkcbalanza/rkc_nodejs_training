const pool = require('../../config/database');

module.exports = {
    createActor: (data, callBack) => {
        pool.query(
            `INSERT INTO actor (first_name, last_name, last_update) 
            VALUES (?,?,?)`,
            [
                data.first_name,
                data.last_name,
                new Date().toISOString().slice(0, 19).replace('T', ' ')
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    getAllActors: callBack => {
        pool.query(
            `SELECT * FROM actor`,
            [],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    updateActor: (data, callBack) => {
        pool.query(
            `UPDATE actor SET first_name = ?, last_name = ?, last_update = ? WHERE actor_id = ?`,
            [
                data.first_name,
                data.last_name,
                new Date().toISOString().slice(0, 19).replace('T', ' '),
                data.id
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    deleteActor: (data, callBack) => {
        pool.query(
            `DELETE FROM actor WHERE id = ?`,
            [data.id],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res[0])
            }
        )
    },
    getActorsbyFirstNameorLastName: (searchObject, callBack) => {
        pool.query(
            `SELECT * FROM actor`,
            [],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                if (searchObject) {
                    res = res.filter(
                        r => (searchObject.first_name ? r.first_name.toLowerCase().indexOf(searchObject.first_name.toLowerCase()) >= 0 : true) &&
                            (searchObject.last_name ? r.last_name.toLowerCase().indexOf(searchObject.last_name.toLowerCase()) >= 0 : true)
                    )
                    return callBack(null, res);
                }
            }
        )
    }
}