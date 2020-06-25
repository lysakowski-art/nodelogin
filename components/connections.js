const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "HighPass2020!%",
  database: "nodelogin",
});

exports.connection = connection;
