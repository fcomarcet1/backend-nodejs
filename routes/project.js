'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');

var router = express.Router();

// Routes
router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);

// CRUD
router.post('/project-save', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);

// Module exports
module.exports = router;