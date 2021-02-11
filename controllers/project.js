'use strict';

var Project = require('../models/project');

var controller =
    {
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

        // CRUD


        saveProject: function(req, res) {

            var project = new Project();

            // Received the data from the body of the request
            var params = req.body;

            // Set values at object
            project.name = params.name;
            project.description = params.description;
            project.category = params.category;
            project.year = params.year;
            project.langs = params.langs;
            project.image = null;

            project.save((err, projectStored) => {

                // Check errors
                if(err) {
                    return res.status(500).send({message: 'Error al guardar el documento.'});
                }
                if(!projectStored) {
                    return res.status(404).send({message: 'No se ha podido guardar el proyecto.'});
                }

                return res.status(200).send({project: projectStored});
            });
        },

    };


// Module exports
module.exports = controller;