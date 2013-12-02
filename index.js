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


// The BOX url
web.get('/', function(req, res) {        
        res.write('Hello, this is the Box!');
        res.end();
});

// The BOX url to start a level (get the details from the JSON request)
web.get('/play', function(req, res) {        
        res.write('Play level!');
        res.end();
});

// The BOX url to stop a level
web.get('/stop', function(req, res) {        
        res.write('Stop level!');
        res.end();
});

// Local port for listing to requests
web.listen(8000);
console.log('The BOX is serving pages on: http://localhost:8000')


function levelSave(user_id, level_id, level_details){

	// Set the data
	data = {}
	data.user_id = user_id;
	data.level_id = level_id;
	data.level_details = level_details;

	// Perform the request
	request.post(config.websiteUrl + '/level/save').form(data)
}