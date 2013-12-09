var serialport = require("serialport");
var play = require('play');

function sensor(port){
	var sensorreader = new serialport.SerialPort(port, { baudrate: 9600 , parser: serialport.parsers.readline("\r\n") });
	if (sensorreader){

	    sensorreader.on("open", function () {

			sensorreader.on('data', function(data) {
				
				d = data.slice(0,1);
				data = data.slice(1);
				console.log(data);
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
}

module.exports.sensor = sensor