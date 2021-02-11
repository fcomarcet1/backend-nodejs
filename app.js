'use strict';

// Load modules
var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//  Path Routes.
var project_routes = require('./routes/project');

// Middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// Headers && cors

// Routes
app.use('/api', project_routes);


//Exports
module.exports = app;