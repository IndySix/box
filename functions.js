var prompt = require('prompt');
var colors = require('colors');
var serialport = require("serialport");
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

var listSerialPorts = function(callback){
	serialport.list(function (err, ports) {
		var i = 1;

	  	ports.forEach(function(port) {
	    	console.log(i + ': ' + port.comName);
	    	i++;
	  	});
		p = selectPort(ports, callback)
	}); 
}

var selectPort = function(ports, callback){
	prompt.start();
	prompt.message = '';
	prompt.delimiter = '';
	prompt.get({properties: { portname: { description: "Which port:" } } }, function (err, result) {
		// console.log('Port: ' + result.port);
		portname = result.portname
		callback(ports[portname - 1].comName)
	});
}

var boxlog = function(log){

	if (arguments[1] == 'red'){
		console.log('[BOX] '.red + log);	
	} else if (arguments[1] == 'yellow'){
		console.log('[BOX] '.yellow + log);	
	} else {
		console.log('[BOX] '.green + log);	
	}
}

module.exports.boxlog = boxlog;
module.exports.levelSave = levelSave;
module.exports.selectPort = selectPort;
module.exports.listSerialPorts = listSerialPorts;
module.exports.port = port;