var sendSocket = require('./functions.js').sendSocket;
var recordVideo = require('./functions.js').recordVideo;

var testVideo = function(){
	global.user_id = 1;
	global.level_id = 1;
	recordVideo(1, 'testchallenge');
}

var testSerial = function(){
	
}

// Socket test
var testSocket = function(){

	// Start test sequence1
	sendSocket({code: 'start', user: {username: 'Joost', avatar: 'test.jpg'}, level: {'level_description': 'Grind Low', order: 2}});
	
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

	// Show video
	setTimeout(function(){ sendSocket({code: 'video', hash: '76ca87a7874de163c2e04dbcb7037621'}) }, 10000)
	
	// Reset to start screen
	setTimeout(function(){ sendSocket({code: 'restart'}) }, 20000)
}

module.exports.testSocket = testSocket;
module.exports.testVideo = testVideo;
module.exports.testSerial = testSerial;
