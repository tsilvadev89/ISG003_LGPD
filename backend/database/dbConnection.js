const mariadb = require('mariadb');

const con = mariadb.createPool({
  host: "localhost",
  user: "root",
  password: "fatec",
  database: "so2",
  port: 3308,
  connectionLimit: 5
});

module.exports = con;
