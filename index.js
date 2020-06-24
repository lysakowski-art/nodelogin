// const mysql = require("mysql");
const express = require("express");
// const request = require("request");
// const session = require("express-session");
// const bodyParser = require("body-parser");
// const path = require("path");
const port = 8000;
const cors = require("cors");

// const connection = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "HighPass2020!%",
//   database: "nodelogin",
// });

const app = express();
// app.use(
//   session({
//     secret: "secret",
//     resave: true,
//     saveUninitialized: true,
//   })
// );

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.get("/", (request, response) => {
//   response.sendFile(path.join(__dirname + "/login.html"));
// });

// app.post("/auth", (request, response) => {
//   const username = request.body.username;
//   const password = request.body.password;
//   if (username && password) {
//     connection.query(
//       "SELECT * FROM accounts WHERE username = ? AND password = ?",
//       [username, password],
//       (error, results, fields) => {
//         if (results.length > 0) {
//           request.session.loggedin = true;
//           request.session.username = username;
//           response.redirect("/home");
//         } else {
//           response.send("Incorrect Username and/or Password!");
//         }
//         response.end();
//       }
//     );
//   } else {
//     response.send("Please enter Username and Password!");
//     response.end();
//   }
// });

// app.get("/home", (request, response) => {
//   if (request.session.loggedin) {
//     response.send("Welcome back, " + request.session.username + "!");
//   } else {
//     response.send("Please login to view this page!");
//   }
//   response.end();
// });

// app.get(`/auth`, (req, res) => {
//   res.send("now you are in authorization");
// });
// app.get(`/`, (req, res) => {
//   res.send("hello");
// });

app.get(`/someWebsite`, (req, res) => {
  const someValues = [
    { id: 1, name: "John", lastName: "Doe" },
    { id: 2, name: "Tim", lastName: "Wining" },
    { id: 3, name: "Edward", lastName: "Blaze" },
  ];
  res.json(someValues);
});

app.use(cors());
app.listen(port);
