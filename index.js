//
const express = require('express');
let app = express();

//
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '1c3B34r!',
  database: 'sakila'
});

//
let router = express.Router();

//Film API
router.get('/film', function (req, res, next) {
    let searchObject = {
        "title" : req.query.title,
        "actor" : req.query.actor,
        "category" : req.query.category
    }
    connection.query(
        `SELECT film.title AS title, film.description AS description, actor.last_name as actor, category.name AS category FROM film
        JOIN film_actor ON film.film_id = film_actor.film_id
        JOIN actor ON film_actor.actor_id = actor.actor_id
        JOIN film_category ON film.film_id = film_category.film_id
        JOIN category ON film_category.category_id = category.category_id`,
        function (err, results, fields) {
            if (err) throw err;
            if (searchObject) {
                results = results.filter (
                    r => (searchObject.title ? r.title.toLowerCase().indexOf(searchObject.title.toLowerCase()) >= 0 : true) &&
                    (searchObject.actor ? r.actor.toLowerCase().indexOf(searchObject.actor.toLowerCase()) >= 0 : true) &&
                    (searchObject.category ? r.category.toLowerCase().indexOf(searchObject.category.toLowerCase()) >= 0 : true)
                )
                res.send(results);
            }
        }
    );
});

//Actor APIs
router.get('/actor', function (req, res, next) {
    let searchObject = {
        "first_name": req.query.first_name,
        "last_name": req.query.last_name
    }
    connection.query(
        'SELECT * FROM actor',
        function (err, results, fields) {
            if (err) throw err;
            if (searchObject) {
                results = results.filter(
                    r => (searchObject.first_name ? r.first_name.toLowerCase().indexOf(searchObject.first_name.toLowerCase()) >= 0 : true) &&
                    (searchObject.last_name ? r.last_name.toLowerCase().indexOf(searchObject.last_name.toLowerCase()) >= 0 : true)
                )
                res.send(results);
            }
        }
    );
});

//Rental APIs
//Get Available Films
router.get('/rental/film=:film_title', function (req, res, next) {
    connection.query(
        `SELECT DISTINCT film.title AS title, film.description AS description, address.address AS store_address FROM film
        JOIN inventory ON film.film_id = inventory.film_id
        JOIN store ON inventory.store_id = store.store_id
        JOIN address ON store.address_id = address.address_id
        JOIN rental ON  inventory.inventory_id = rental.inventory_id
        WHERE rental.return_date IS NOT NULL AND film.title LIKE ?`,
        ['%'+req.params.film_title+'%'],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

//
app.use('/api/', router);

//
var server = app.listen(5000, function() {
    console.log('Node server is running on http://localhost:5000...');
});