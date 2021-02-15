'use strict';

var Project = require('../models/project');
var fs = require("fs");
var path = require("path");

var controller = {
        // Methods
        /**
         * @param {any} req
         * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>|http.ServerResponse} res
         */
        home: function (req, res) {
            return res.status(200).send({
                message: "Home controller from project: OK"
            });
        },

        /**
         * @param {any} req
         * @param {Request<P, ResBody, ReqBody, ReqQuery, Locals>|http.ServerResponse} res
         */
        test: function (req, res) {
            return res.status(200).send({
                message: "Test controller from project: OK"
            });
        },

        // **************** CRUD *************************
        // ***********************************************

        /**
         * Store a newly created resource.
         *
         */
        saveProject: function (req, res) {
            /* Test method
            return res.status(200).send({
                message: "saveProject controller from project: OK"
            });
            */

            var project = new Project();

            // Received data from the body of the request.
            var params = req.body;

            // Set values at project object.
            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year;
            project.languages = params.languages;
            project.image = "";

            console.log(project);

            // Persists new project data
            project.save((err, projectStored) => {

                // Check errors
                if (err) {
                    return res.status(500).send({message: 'Error al guardar el documento.'});
                }
                if (!projectStored) {
                    return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});
                }

                // Return project stored
                return res.status(200).send({
                    project: projectStored
                });

            });
        },

        /**
         * Display the specified resource.
         *
         */
        getProject: function (req, res) {

            // Get Project Id from request
            var projectId = req.params.id;

            // Check if project exist
            if (projectId == null) {
                return res.status(404).send({
                    message: "El proyecto no existe"
                });
            }

            // Query to obtain data from the specific resource with the Id
            Project.findById(projectId, (err, project) => {

                // Check possibles errors
                if (err) {
                    return res.status(500).send({
                        message: 'Error al devolver los datos.'
                    });
                }
                if (!project) {
                    return res.status(404).send({
                        message: 'El proyecto no existe.'
                    });
                }

                // if everything is OK we return the project
                return res.status(200).send({project});
            });

        },

        /**
         * Display list of specified resource => projects list.
         *
         */
        getProjects: function (req, res) {

            // Query to obtain data from the specific resource.
            // Project.find({}).sort('-year').exec((err, projects) => {}
            // Project.find({year: 2019}).exec((err, projects) => {}
            Project.find({}).exec((err, projects) => {

                // Check possibles errors
                if (err) return res.status(500).send({message: 'Error al devolver los datos.'});
                if (!projects) return res.status(404).send({message: 'No hay projectos que mostrar.'});

                // if everything is OK we return projects list
                return res.status(200).send({projects});
            });
        },

        /**
         * Update specified resource.
         *
         */
        updateProject: function (req, res) {

            // Get Project Id from request && Received data from the body of the request.
            var projectId = req.params.id;
            var update = req.body;

            // Query to obtain data from the specific resource && update.
            Project.findByIdAndUpdate(projectId, update, {new: true}, (err, projectUpdated) => {

                // Check possibles errors
                if (err) return res.status(500).send({message: 'Error al actualizar'});
                if (!projectUpdated) return res.status(404).send({message: 'No existe el proyecto para actualizar'});

                // if everything is OK we return the updated project.
                return res.status(200).send({
                    project: projectUpdated
                });
            });

        },

        /**
         * Delete specified resource.
         *
         */
        deleteProject: function (req, res) {

            // Get Project Id from request
            var projectId = req.params.id;

            // Query to obtain data from the specific resource && delete.
            Project.findByIdAndRemove(projectId, (err, projectRemoved) => {

                // Check possibles errors
                if (err) return res.status(500).send({message: 'No se ha podido borrar el proyecto'});
                if (!projectRemoved) return res.status(404).send({message: "No se puede eliminar ese proyecto."});

                // if everything is OK we return the removed project.
                return res.status(200).send({
                    project: projectRemoved
                });
            });
        },

        /**
         * Upload image resource.
         *
         */
        uploadImage: function (req, res) {

            // Get Project Id from request
            var projectId = req.params.id;
            var fileName = "Image not found...";

            // NOTE:  to use .files we need to install connect-multiparty(not default in nodejs)
            if (req.files) {
                //return  res.status(200).send({files: req.files})

                // variables needed to save in the database
                var filePath = req.files.image.path;

                // We need the real name saved in disk for save in database i can use split
                var fileSplit = filePath.split("\\"); // usamos el separador \\ para recortar
                var fileName = fileSplit[1];
                var extSplit = fileName.split("."); // cut string for extension.
                var fileExt = extSplit[1]; // extension
                //return  res.status(200).send({filesplit: fileSplit,filename: fileName,extSplit: extSplit,fileExt: fileExt })

                // Check extension of image
                if (fileExt == "png" || fileExt == "jpg" || fileExt == "jpeg" || fileExt == "gif") {

                    // Query to find the project to associate for new upload image.
                    Project.findByIdAndUpdate(projectId, { image: fileName }, { new: true }, (err, projectUpdated) => {

                            // Check errors
                            if (err) return res.status(500).send({message: "La imagen no se ha subido"});
                            if (!projectUpdated) return res.status(404).send({message: "El proyecto no existe y no se ha asignado la imagen",});

                            // if everything is OK we return the updated project.
                            return res.status(200).send({project: projectUpdated,});
                        });
                    /*
                    // Query to find the project to associate for new image
                    Project.findByIdAndUpdate(
                        projectId,
                        { image: fileName },
                        { new: true },
                        (err, projectUpdate) => {
                            // Check errors
                            if (err) return res.status(500).send({message: "La imagen no se ha subido"});
                            if (!projectUpdated) return res.status(404).send({message: "El proyecto no existe y no se ha asignado la imagen",});

                            // if everything is OK we return the updated project.
                            return res.status(200).send({project: projectUpdated,});
                        });

                     */
                }
                else {
                    // Error image type extension => unlink to uploads
                    fs.unlink(filePath, (err) => {
                        return res.status(200).send({ message: "La extensión no es válida" });
                    });

                    /*return res.status(404).send({
                        message: "Extension image not supported"
                    });*/
                }
            }
            else{
                // Error req.files
                return  res.status(404).send({message: 'Error to send file...'})
            }
        },
    }
// Module exports
module.exports = controller;