var socket = io.connect('http://localhost');

socket.on('box', function (data) {
	if (data.status == "success"){
		
		console.log('Success! Received: ');
		console.log(data.data);
		
		switch(data.data.code){
			case 'start':
				$('#checkin').fadeOut(function(){
					$('#challenge-title').text('Challenge: ' + data.data.level.level_description + ' Level: ' + data.data.level.order);
					$('#avatar').attr({'src': 'localhost/data/avatars/' + data.data.user.avatar});
					$('#username').text(data.data.user.username);
					$('#challenge').fadeIn();
					$('#level_description').text(data.data.level.level_description)
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

			case 'video':
				$('#finish').fadeOut();
				$('#video').fadeIn();
				var src = 'localhost/data/uploads/' + data.data.hash + '.mp4';
				console.log(src);
				$('#video-embed').attr({'src': src})
				$('#video-embed').play()

			case 'restart':
				$('#video').fadeOut()
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