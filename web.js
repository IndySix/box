
// Imports
var express = require('express'); 
var swig = require('swig');
var sensor = require('./sensor.js')

// Local BOX server setup requests, including websockets
var web = express()
  , http = require('http')
  , server = http.createServer(web)
  , io = require('socket.io').listen(server);

// Websocket debugging level
io.set('log level', 1);

// Configure Express
web.use(express.json());
web.use(express.urlencoded());

// Setup render engine
web.engine('html', swig.renderFile);
web.set('view engine', 'html');

// Configure views dir
web.set('views', __dirname + '/views');

// Configure static dir
web.use(express.static(__dirname + '/static'));

// The BOX url
web.get('/', function(req, res) {        
    res.write('Hello, this is the Box!');
    res.end();
});

// The BOX url to start a level (get the details from the JSON request)
web.get('/play', function(req, res) {        
	
	// Send serial to Arduino to notify that a user is checked in.



	// Start level
	res.write('Play level!');
	res.end();
});

// The BOX url to stop a level
web.get('/stop', function(req, res) {        
	res.write('Stop level!');
	res.end();
});

// Second screen
web.get('/screen',function(req, res) {
	res.render('screen', {});
});

// Exports
module.exports.io = io;
module.exports.server = server;