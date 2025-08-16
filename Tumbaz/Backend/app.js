// EXPRESS GENERATOR SETUP...
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();

// MY SETUP...
const baseURL = '/api'
const welcome = require("./app/routes/welcome.route");
const users = require("./app/routes/users.route")

// EXPRESS GENERATOR SETUP
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// MY SETUP...
app.use(baseURL, welcome);
app.use(baseURL, users);

module.exports = app;
