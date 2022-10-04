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

//
router.get('/', function (req, res, next) {
    connection.query(
        'SELECT * FROM actor',
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