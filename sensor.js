// Imports

var serialport = require("serialport");
var play = require('play');
var colors = require('colors');
var prompt = require('prompt');
var box = require('./web.js')
var functions = require("./functions");
var boxlog = require('./functions.js').boxlog;


// List all serial ports
var listSerialPorts = function(callback){
	serialport.list(function (err, ports) {
		var i = 1;

		// Loop trough each port and print it
	  	ports.forEach(function(port) {
	    	console.log('  ' + i.toString().red + ': '.red + port.comName.red);
	    	i++;
	  	});

	  	// Select the ports
		p = selectPort(ports, callback)
	}); 
}

// Function for a commandline input for selecting the port
var selectPort = function(ports, callback){
	prompt.start();
	prompt.message = '';
	prompt.delimiter = '';
	prompt.get({properties: { portname: { description: "  Which port:".white } } }, function (err, result) {
		// console.log('Port: ' + result.port);
		portname = result.portname
		callback(ports[portname - 1].comName)
	});
}

// Read sensor at a port
function readSensor(port){
	
	var sensorreader = new serialport.SerialPort(port, { baudrate: 9600 , parser: serialport.parsers.readline("\r\n") });

	if (sensorreader){

		// Open serial port and read data
	    sensorreader.on("open", function () { sensorreader.on('data', function(data) {

			d = data.slice(0,1); // Slice the first letter of the data
			data = data.slice(1);
			console.log(data);

			// Data switch
			switch(d) {

				// A for approach
				case "A":
					// play.sound('./sound/coin.wav'); // Might want to do a drumroll?
					box.io.sockets.emit('box', {status: 'success', data: 'sensor trigger' });
					boxlog('Skater approaching..')

					// Record video for 30 seconds
					functions.recordVideo()

				// T for light sensor trigger
				case "T":
					play.sound('./sound/coin.wav');
					box.io.sockets.emit('box', {status: 'success', data: 'tick trigger' });
					break;

				// F when finishing a challange
				case "F":
					play.sound('./sound/up.wav');
					box.io.sockets.emit('box', {status: 'success', data: 'finish challenge' });
					
					// Get all current data and save to the website
					var sensordata = data // Save sensor data
					// TODO: Add user details etc. 
					// Add user details
					functions.saveDataToWebsite()  

					break;



				// When none of these, print an error
				default:
					box.io.sockets.emit('box', {status: 'error', data: 'Error parsing sensor data.' });
					boxlog('Error parsing sensor data: ', 'red')
					break;
			}

		});});
	    
	// if no arduino is found, print it.
	} else {
		functions.boxlog('No arduino configured' , 'red')
	}	
}

// Exports
module.exports.readSensor = readSensor
module.exports.selectPort = selectPort;
module.exports.listSerialPorts = listSerialPorts;
