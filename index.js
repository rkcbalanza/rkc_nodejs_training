//
require('dotenv').config();
const express = require('express');
let app = express();
//const pool = require('./config/database');
const actorRouter = require('./api/actor/actor.router');
const filmRouter = require('./api/film/film.router');
const staffRouter = require('./api/staff/staff.router')

app.use(express.json());
app.use('./api/staff', staffRouter);
app.use('/api/actor', actorRouter);
app.use('/api/film', filmRouter);
//
// let router = express.Router();

// //Rental APIs
// router.get('/rental/film=:film_title', function (req, res, next) {
//     connection.query(
//         `SELECT DISTINCT film.title AS title, film.description AS description, address.address AS store_address FROM film
//         JOIN inventory ON film.film_id = inventory.film_id
//         JOIN store ON inventory.store_id = store.store_id
//         JOIN address ON store.address_id = address.address_id
//         JOIN rental ON  inventory.inventory_id = rental.inventory_id
//         WHERE rental.return_date IS NOT NULL AND film.title LIKE ?`,
//         ['%'+req.params.film_title+'%'],
//         function (err, results, fields) {
//             res.send(results);
//         }
//     );
// });

//
//app.use('/api/', router);

//
var server = app.listen(process.env.APP_PORT, function() {
    console.log('Node server is running on http://localhost:'+process.env.APP_PORT+'...');
});