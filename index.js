'use strict'

var mongoose = require('mongoose');

var app = require('./app');
const port = 3700;
const urlDatabase = 'mongodb://localhost:27017/portfolio';

mongoose.Promise = global.Promise;
mongoose.connect(urlDatabase,
    {useNewUrlParser:true, useUnifiedTopology:true})
    .then(() => {
        console.log("Connection established with the MongoDB database: OK");

        // Server Creation
        app.listen(port, ()=>{
            console.log("Connection established with the server: OK => http://127.0.0.1:3700");
        });
    })
    .catch(err => console.log(err));
