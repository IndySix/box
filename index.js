// Imports
var config = require('./config.js');
var functions = require('./functions.js');
var boxlog = require('./functions.js').boxlog;
var web = require('./web.js').web
var sensor = require('./sensor.js').sensor

var crypto = require('crypto'); 
var request = require('request');

boxlog('Is starting');

// Local port for listing to requests
web.listen(8000);

boxlog('Is serving pages on: '  + 'http://localhost:8000'.underline)

// Arduino
boxlog('Configuring sensors')
boxlog('Listing ports:' , 'yellow')

functions.listSerialPorts(function(port){
	// play.sound('./sound/start.wav'); // Play countdown sounds
	boxlog('Port selected: ' + port)

	sensor(port);
	
})

