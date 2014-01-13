var socket = io.connect('http://localhost');

socket.on('box', function (data) {
	if (data.status == "success"){
		
		console.log('Success! Received: ');
		console.log(data.data);
		
		switch(data.data.code){
			case 'start':
				$('#checkin').fadeOut(function(){
					$('#challenge-title').text('Challenge: ' + data.data.challenge)
					$('#username').text(data.data.username);
					$('#challenge').fadeIn();
				});
				break;

			case 'progress':
				$('#progress').css('width', data.data.amount);
					break;

			case 'finish':
				$('#challenge').fadeOut(function(){
					$('#score').text(data.data.score);
					$('#finish').fadeIn();
				});
				break;

			case 'restart':
				$('#challenge').fadeOut()
				$('#finish').fadeOut(function(){
					$('#checkin').fadeIn();	
				});
				break;

			default:
				console.log('Unable to parse data:')
				console.log(data)
				break;
		}

	}

});