const { createPool } = require("mysql2");

const pool = createPool ({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '1c3B34r!',
    database: 'sakila',
    connectionLimit: 10
  });

  module.exports = pool;