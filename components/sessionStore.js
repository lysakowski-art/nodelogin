const express = require("express");
const session = require("express-session");
const MySQLStore = require("express-mysql-session")(session);

const options = {
  host: "localhost",
  user: "root",
  password: "HighPass2020!%",
  database: "nodelogin",
};

const sessionStore = new MySQLStore(options);

exports.sessionStore = sessionStore;
