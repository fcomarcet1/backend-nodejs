'use strict';

var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();

// Upload images
var multipart = require("connect-multiparty");
var multipartMiddleware = multipart({ uploadDir: "./uploads" });


/*
******************** ROUTES ************************************
****************************************************************
*/
router.get('/home', ProjectController.home);
router.get('/test', ProjectController.test);

// CRUD
router.post('/project-save', ProjectController.saveProject);
router.get('/project/:id?', ProjectController.getProject);
router.get('/projects', ProjectController.getProjects);
router.put('/project/:id', ProjectController.updateProject);
router.delete("/project/:id", ProjectController.deleteProject);

// upload files
router.post("/upload-image/:id", multipartMiddleware, ProjectController.uploadImage);

// Module exports
module.exports = router;