// Imports
var config = require('./config.js');
var functions = require('./functions.js');
var boxlog = require('./functions.js').boxlog;
var box = require('./web.js')
var sensor = require('./sensor.js')
var request = require('request');
var tests = require('./tests.js')

// Start
boxlog('Is starting', 'blue');

// Local port for listing to requests
box.server.listen(8000);

// Print URLs
boxlog('Is serving pages on: '  + 'http://localhost:8000'.underline)
boxlog('Second screen at: '  + 'http://localhost:8000/screen'.underline)
functions.openBrowser('http://localhost:8000/screen')

// Websockets
boxlog('Testing websockets', 'blue')

// Arduino
boxlog('Configuring sensors', 'blue')
boxlog('Listing ports:' , 'yellow')

// Select a serial port and read data
sensor.listSerialPorts(function(port){
	
	boxlog('Port selected: ' + port) // Display selected port

	tests.testSocket() // Test socket
	tests.testVideo() // Test socket

	boxlog('Setup completed!')

	sensor.readSensor(port); // Read sensor 
	
})



