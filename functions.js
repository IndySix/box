// Imports

var spawn = require('child_process').spawn
var serialport = require("serialport");
var prompt = require('prompt');
var colors = require('colors');
var open = require('open');
var box = require('./web.js');
var config = require('./config.js')
var request = require('request');
var crypto = require("crypto");

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

var recordVideo = function(user_id, challenge_id){
	boxlog('Started Video for user: ' + user_id, 'blue') // Log video name

	// Hash user id and time 
	var hash = crypto.createHash("md5").update(user_id + challenge_id + Math.floor(new Date() / 1000).toString()).digest("hex")

	boxlog('Creating video with hash: ' + hash, 'blue')

	var duration = 10;

 	// Spawn video 
 	boxlog('Executing command: ' + 'ffmpeg -f video4linux2 -s hd720 -t ' + duration + ' -i /dev/video0 ' + hash + '.mp4', 'green')
    //spawn('ffmpeg', ['-f', 'video4linux2', '-s', 'hd720', '-t', duration, '-i', '/dev/video0', hash + '.mp4'])
   
}

var checkinUser = function(){
	request.get(config.websiteUrl + 'api/checkinUser', function (error, response, body) {
	  	if (!error && response.statusCode == 200) {
	  		boxlog('User checked in.')
	    	console.log(body);
	    	return body;
	  	} else {
	  		boxlog('No user checked in.')
	  		return false;
	  	}
	})
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

// Exports
module.exports.openBrowser = openBrowser;
module.exports.boxlog = boxlog;
module.exports.levelSave = levelSave;
module.exports.sendSocket = sendSocket;
module.exports.checkinUser = checkinUser;
module.exports.recordVideo = recordVideo;
module.exports.port = port;
