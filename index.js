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
  password: '',
  database: 'sakila'
});

//
let router = express.Router();

//Film APIs
//Get ALL films
router.get('/film/', function (req, res, next) {
    connection.query(
        'SELECT * FROM film',
        function (err, results, fields) {
            if(err) throw err;
            res.send(results);
        }
    );
});

//Get films by title
router.get('/film/title=:title', function (req, res, next) {
    connection.query(
        "SELECT * FROM film WHERE title LIKE ?",
        ["%"+req.params.title+"%"],
        function (err, results, fields) {
            res.send(results);
        }
    );
});


//Get films by category
router.get('/film/category=:category', function (req, res, next) {
    connection.query(
        "SELECT category.name AS category, film.title AS title, film.description AS description FROM category JOIN film_category ON category.category_id = film_category.category_id JOIN film ON film.film_id = film_category.film_id WHERE category.name = ?",
        [req.params.category],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

//GET films by actor last name
router.get('/film/actor=:name', function (req, res, next) {
    connection.query(
        "SELECT actor.last_name AS last_name, film.title AS title, film.description AS description FROM actor JOIN film_actor ON actor.actor_id = film_actor.actor_id JOIN film ON film.film_id = film_actor.film_id WHERE actor.last_name = ?",
        [req.params.name],
        function (err, results, fields) {
            res.send(results);
        }
    );
});

//Actor APIs
//Get ALL actors
router.get('/actor/', function (req, res, next) {
    connection.query(
        'SELECT * FROM actor',
        function (err, results, fields) {
            if(err) throw err;
            res.send(results);
        }
    );
});

//Get actor by first_name
router.get('/actor/first_name=:firstName', function (req, res, next) {
    connection.query(
        'SELECT * FROM actor WHERE first_name = ?',
        [req.params.firstName],
        function (err, results, fields) {
            res.send(results);
        }
    );
});


//Get actor by first_name
router.get('/actor/last_name=:lastName', function (req, res, next) {
    connection.query(
        'SELECT * FROM actor WHERE last_name = ?',
        [req.params.lastName],
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