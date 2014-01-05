// Imports

var spawn = require('child_process').spawn
var serialport = require("serialport");
var prompt = require('prompt');
var colors = require('colors');
var open = require('open');
var box = require('./web.js');
var config = require('./config.js')
var request = require('request');

// Global variables:
var port;

// Save level function
var levelSave = function(user_id, level_id, level_details){
	// Set the data
	data = {}
	data.user_id = user_id;
	data.level_id = level_id;
	data.level_details = level_details;

	// Perform the request
	request.post(config.websiteUrl + '/level/save').form(data)
}

var openBrowser = function(url){
	open(url); // With the open module 
}

var recordVideo = function(user_id, challenge_id, duration){
	boxlog('Started Video for user: ' + user_id, 'blue') // Log video name

	// Spawn command line video process
    // spawn('python', ['/pathtoscript', '-c', 'camerapath', '-n', 'filename', '-d', 'duration']);
}

// Boxlog function with color
var boxlog = function(log){
	// Switches for color
	if (arguments[1] == 'red'){
		console.log('  [BOX]  '.red + log);	
	} else if (arguments[1] == 'yellow'){
		console.log('  [BOX]  '.yellow + log);	
	} else if (arguments[1] == 'blue'){
		console.log('  [BOX]  '.blue + log);	
	} else {
		console.log('  [BOX]  '.green + log);	
	}
}

// Function to save data to website
var saveDataToWebsite = function(data){
	request.post(config.websiteUrl + '/level/save').form(data)
}

// Send data over websocket to all attached clients
var sendSocket = function(data){
	box.io.sockets.emit('box', {status: 'success', data: data})
}

// Socket test
var testSocket = function(){

	// Start test sequence
	sendSocket({code: 'start', username: 'Joost', challenge: 'Grind Low'});
	
	// Progress bar
	setTimeout(function(){ sendSocket({code: 'progress', amount: '5%'}) }, 1000)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '10%'}) }, 1100)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '15%'}) }, 1200)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '20%'}) }, 1300)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '25%'}) }, 1400)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '30%'}) }, 1500)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '35%'}) }, 1600)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '40%'}) }, 1700)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '45%'}) }, 1800)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '50%'}) }, 1900)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '55%'}) }, 2000)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '60%'}) }, 2100)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '65%'}) }, 2200)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '70%'}) }, 2300)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '75%'}) }, 2400)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '80%'}) }, 2500)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '85%'}) }, 2600)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '90%'}) }, 2700)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '95%'}) }, 2800)
	setTimeout(function(){ sendSocket({code: 'progress', amount: '100%'}) }, 2900)

	// Finish
	setTimeout(function(){ sendSocket({code: 'finish', score: '800'}) }, 4000)

	// Reset to start screen
	setTimeout(function(){ sendSocket({code: 'restart'}) }, 10000)

}

// Exports
module.exports.openBrowser = openBrowser;
module.exports.boxlog = boxlog;
module.exports.levelSave = levelSave;
module.exports.testSocket = testSocket;
module.exports.sendSocket = sendSocket;
module.exports.port = port;