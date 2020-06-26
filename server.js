const favicon = null;
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const cors = require("cors");
const sessionStore = require("./components/sessionStore.js");
const connections = require("./components/connections");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const TWO_HOURS = 1000 * 60 * 15;

const {
  PORT = 8000,
  SESS_NAME = "sid" /*session ID */,
  SESS_LIFETIME = TWO_HOURS,
  SESS_SECRET = "shhhh",
  NODE_ENV = "development",
} = process.env; /*to nam daje wartości defaultowe*/

const IN_PROD =
  NODE_ENV === "production"; /* tutaj to się nadpisuje na production */

const app = express();
app.use(
  cors({
    credentials: true,
    origin: "http://127.0.0.1:3000",
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    name: SESS_NAME,
    proxy: true,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    store: sessionStore.sessionStore,
    cookie: {
      maxAge: SESS_LIFETIME,
      sameSite: false,
      secure: false,
    },
  })
);

app.post("/auth", (req, res) => {
  const { login, password } = req.body;

  if (login && password) {
    connections.connection.query(
      "SELECT * FROM accounts WHERE username = ?",
      [login],
      (error, results, fields) => {
        if (results.length > 0) {
          console.log(results[0]);
          if (bcrypt.compareSync(password, results[0].password)) {
            req.session.loggedIn = {
              loggedIn: true,
              username: login,
              typeOfUser: results[0].type,
            };
            res.send(true);
          } else {
            res.send(false);
          }
        } else {
          res.send(false);
        }
      }
    );
  } else {
    res.send(false);
  }
});

app.post("/register", (req, res) => {
  const { username, password, email, type } = req.body;
  let hash = bcrypt.hashSync(password, saltRounds);

  if (
    connections.connection.query("SELECT * FROM accounts WHERE username = ?", [
      username,
    ]) === 0
  ) {
    if (username && hash && email && type) {
      connections.connection.query(
        "INSERT INTO `accounts`(username, password, email, type) VALUES (?,?,?,?)",
        [username, hash, email, type]
      );
      res.send(true);
    } else {
      res.send(false);
    }
  } else {
    res.send(false);
  }
});

app.get("/cookie", (req, res) => {
  if (req.session.loggedIn) {
    res.send(req.session.loggedIn);
  }
});

app.listen(PORT);
