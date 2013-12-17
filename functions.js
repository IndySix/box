var prompt = require('prompt');
var colors = require('colors');
var serialport = require("serialport");
var box = require('./web.js')
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

// Socket test
var testSocket = function(){
	box.io.sockets.emit('box', {status: 'success', data: 'hello world' });
}

// Exports
module.exports.boxlog = boxlog;
module.exports.levelSave = levelSave;
module.exports.testSocket = testSocket;
module.exports.port = port;