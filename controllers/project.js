'use strict';

var controller =
    {
        // Methods
        home: function (req, res) {
            return res.status(200).send({
                message: "Home controller from project: OK"
            });
        },

        test: function (req, res) {
            return res.status(200).send({
                message: "Test controller from project: OK"
            });
        }
    };


// Module exports
module.exports = controller;