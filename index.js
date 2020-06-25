const favicon = null;
const mysql = require("mysql");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const port = 8000;

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "HighPass2020!%",
  database: "nodelogin",
});

app.use(cors());

// app.get(`/auth`, (req, res) => {
//   res.end("CHYBA DZIAŁA");
// });

app.post("/auth", (req, res) => {
  const { login, password } = req.body;
  if (login && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [login, password],
      (error, results, fields) => {
        if (results.length > 0) {
          req.session.loggedin = true;
          req.session.username = login;
          // res.redirect("/home");
          console.log("działa");
        } else {
          res.send(`Incorrect location`);
        }
        res.end();
      }
    );
  } else {
    res.send("Please insert correct values");
    res.end();
  }
});

app.listen(port);
