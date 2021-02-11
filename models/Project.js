'use strict';

// load mongoose
var mongoose = require('mongoose');

var schema = mongoose.schema;
var ProjectSchema = schema(
    {
         name: String,
         description: String,
         category: String,
         language: String,
         year: Number,
         image: String
    });

// Modules exports
/*
* Mongoose asigna los names en minuscula y plural por eso podemos poner Project y en nuestra database
* aparece projects
*/
module.exports = mongoose.model("Project", ProjectSchema);
