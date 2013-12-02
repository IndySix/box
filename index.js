// Imports
var config = require('./config.js')
var serialport = require("serialport")
var crypto = require('crypto'); 
var request = require('request')
var express = require('express'); 

// Local BOX server setup requests
var web = express(); // Setup app and configure:
web.use(express.json());
web.use(express.urlencoded());


// The BOX Urls
web.get('/', function(req, res) {        
        res.write('Hello, this is the Box!');
        res.end();
});

// Local port for listing to requests
web.listen(8000);
console.log('The BOX is serving pages on: http://localhost:8000')
