const pool = require('../../config/database');

module.exports = {
    createFilm: (data, callBack) => {
        pool.query(
            `INSERT INTO film (title, description, release_year, language_id, rental_duration, rental_rate, length, replacement_cost, rating, special_features) 
            VALUES (?,?,?,?,?,?,?,?,?,?)`,
            [
                data.title,
                data.description,
                data.release_year,
                data.language_id,
                data.rental_duration,
                data.rental_rate,
                data.length,
                data.replacement_cost,
                data.rating,
                data.special_features
            ],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res)
            }
        )
    },
    updateFilm: (data, callBack) => {
        pool.query(
            `UPDATE film SET
            title = ?, 
            description = ?, 
            release_year = ?, 
            language_id = ?, 
            rental_duration = ?, 
            rental_rate = ?, 
            length = ?, 
            replacement_cost = ?, 
            rating = ?, 
            special_features = ?
            WHERE id = ?`,
            [
                data.title,
                data.description,
                data.release_year,
                data.language_id,
                data.rental_duration,
                data.rental_rate,
                data.length,
                data.replacement_cost,
                data.rating,
                data.special_features,
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
    deleteFilm: (data, callBack) => {
        pool.query(
            `DELETE FROM film WHERE id = ?`,
            [data.id],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                return callBack(null, res[0])
            }
        )
    },
    getFilmBySearchParameters: (searchObject, callBack) => {
        pool.query(
            `SELECT film.title AS title, film.description AS description, actor.last_name as actor, category.name AS genre FROM film
            JOIN film_actor ON film.film_id = film_actor.film_id
            JOIN actor ON film_actor.actor_id = actor.actor_id
            JOIN film_category ON film.film_id = film_category.film_id
            JOIN category ON film_category.category_id = category.category_id`,
            [],
            (err, res, fields) => {
                if (err) {
                    return callBack(err)
                }
                if (searchObject) {
                    res = res.filter(
                        r => (searchObject.title ? r.title.toLowerCase().indexOf(searchObject.title.toLowerCase()) >= 0 : true) &&
                            (searchObject.actor ? r.actor.toLowerCase().indexOf(searchObject.actor.toLowerCase()) >= 0 : true) &&
                            (searchObject.genre ? r.genre.toLowerCase().indexOf(searchObject.genre.toLowerCase()) >= 0 : true)
                    )
                    return callBack(null, res);
                }
            }
        )
    }
}