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
var levelSave = function(level_details){
	// Set the data
	data = {}
	data.user_id = global.user_id;
	data.level_id = global.level_id;
	data.level_details = level_details;
	data.video_hash = global.video_hash;

	// Perform the request
	// request.post(config.websiteUrl + '/level/save').form(data)
}

var challengeSequenceStart = function(username, level){
	// Start sequence on second screen by sending start command 
	sendSocket({code: 'start', username: username, challenge: level.order});
}

var challengeSequenceStop = function(level_details){
	// Clear timeout if that has not been done yet.
	clearTimeout(global.timeoutID);

	// Push data to webserver for storage
	levelSave(level_details)

	// Reset second screen
	sendSocket({code: 'restart'})

	// Clear globals
	global.user_id = false;
	global.level_id = false;
	global.timeoutID = false;
	global.video_hash = false;
}

var recordVideo = function(){
	if (!global.recording){

		boxlog('Start recording video', 'green')

		global.recording = true;

		// Get user and challenge ID.
		user_id = global.user_id
		challenge_id = global.level_id

		boxlog('Started Video for user: ' + user_id, 'blue') // Log video name

		// Hash user id and time 
		var hash = crypto.createHash("md5").update(user_id + challenge_id + Math.floor(new Date() / 1000).toString()).digest("hex")

		boxlog('Creating video with hash: ' + hash, 'blue')

		var duration = 10;

	 	// Video bebug
	 	boxlog('Executing command: ' + 'ffmpeg -f video4linux2 -s hd720 -t ' + duration + ' -i /dev/video0 ' + hash + '.mp4', 'green')
	   
	   	// Spawn video process
	    spawn('ffmpeg', ['-f', 'video4linux2', '-s', 'hd720', '-t', duration, '-i', '/dev/video0', hash + '.mp4'])
	   	
	   	// Reset checkin for video
	   	checkin = false;
	   	video_hash = hash;
	   	global.video_hash = hash;

	} else {
		boxlog('Already recording video', 'red')
	}
	
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

// Send data over websocket to all attached clients
var sendSocket = function(data){
	box.io.sockets.emit('box', {status: 'success', data: data})
}

var openBrowser = function(url){
	open(url); // With the open module 
}

// Exports
module.exports.openBrowser = openBrowser;
module.exports.boxlog = boxlog;
module.exports.sendSocket = sendSocket;
module.exports.recordVideo = recordVideo;
module.exports.port = port;
module.exports.challengeSequenceStart = challengeSequenceStart;
module.exports.challengeSequenceStop = challengeSequenceStop;