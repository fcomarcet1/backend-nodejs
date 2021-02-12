'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

// Routes
router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);
router.post('/project-save', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);

// Module exports
module.exports = router;