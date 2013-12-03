// Imports
var config = require('./config.js');
var functions = require('./functions.js');
var serialport = require("serialport");
var crypto = require('crypto'); 
var request = require('request');
var express = require('express'); 
var play = require('play');
var colors = require('colors');


functions.boxlog('Is starting');

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

// Local port for listing to requests
web.listen(8000);
functions.boxlog('Is serving pages on: '  + 'http://localhost:8000'.underline)

// Arduino
functions.boxlog('Configuring sensors')
functions.boxlog('Listing ports:' , 'yellow')
functions.listSerialPorts(function(port){
	// play.sound('./sound/start.wav'); // Play countdown sounds
	functions.boxlog('Port selected: ' + port)

	var sensorreader = new serialport.SerialPort(port, { baudrate: 9600 , parser: serialport.parsers.readline("\r\n") });
	if (sensorreader){
	    sensorreader.on("open", function () {
			sensorreader.on('data', function(data) {
				
				d = data.slice(0,1);
				console.log(d);
				if (d == 'C'){
					play.sound('./sound/start.wav');
				}
				if (d == 'T'){
					play.sound('./sound/coin.wav');
				}
				if (d == 'F'){
					play.sound('./sound/up.wav');
				}
			});  
	    });
	} else {
		functions.boxlog('No arduino configured' , 'red')
	}
})

