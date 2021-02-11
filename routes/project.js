'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

// Routes
router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);

// Module exports
module.exports = router;