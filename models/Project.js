'use strict'

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var ProjectSchema = schema({
    name: String,
    description: String,
    category: String,
    languages: String,
    year: Number,
    image: String
});

module.exports = mongoose.model('Project', ProjectSchema);
// projects  --> guarda los documents en la coleccion
