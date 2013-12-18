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

// Socket test
var testSocket = function(){

	box.io.sockets.emit('box', {status: 'success', data: {code: 'start', username: 'Joost', challenge: 'Grind Low'}});
	
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

	setTimeout(function(){ sendSocket({code: 'finish', score: '800'}) }, 4000)
	setTimeout(function(){ sendSocket({code: 'restart'}) }, 10000)

}

// Exports
module.exports.boxlog = boxlog;
module.exports.levelSave = levelSave;
module.exports.testSocket = testSocket;
module.exports.sendSocket = sendSocket;
module.exports.port = port;