
// Imports
var express = require('express'); 
var swig = require('swig');
var sensor = require('./sensor.js');
var functions = require('./functions.js');

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
web.post('/start', function(req, res) {    
	// Write reponse.   
	res.write('Play level!');
	res.end();

	// Parse data for starting a request
	level = JSON.parse(req.body.data);
	user = level.queue
	timeout = level.playTime

	global.username = user.username
	global.order_id = level.order
	global.part_id = level.part

	// Start challenge
	functions.challengeSequenceStart(user.username, level)

	// Setup second screen
	sendSocket({code: 'start', user: user, level: level});


	// Start listening of sensors until timeout or stop function
	global.timeout = setTimeout(function(){
		challengeSequenceStop({'data': 'timeout'})
	}, playTime) // Playtime is the timeout

});

// The BOX url to stop a level
web.get('/stop', function(req, res) {        
	res.write('Stop level!');

	functions.challengeSequenceStop({})

	res.end();
});

// Second screen
web.get('/screen',function(req, res) {
	res.render('screen', {});
});



// Exports
module.exports.io = io;
module.exports.server = server;