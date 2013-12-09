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
	play.sound('./sound/countdown.wav'); // Play countdown sound
	res.write('Play level!');
	res.end();
});

// The BOX url to stop a level
web.get('/stop', function(req, res) {        
	res.write('Stop level!');
	res.end();
});

module.exports.web = web