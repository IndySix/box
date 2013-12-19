# BOX

Some software we use.

## API Calls to implement

### BOX 

	/play (user_id, level_id, level_details, level_timeout)

Load the level into the box and arduino. Save the user ID and level id for later reference

	/stop ()

Stops the current level from playing an removes the current player 

	/screen ()

URL for the second screen, uses websockets and the JSend protocol for communication with the BOX.

### Website API

Not used yet.

	/level/save (user_id, level_id, level_details, level_data, level_completed)

Save the level, wheter the user has completed the level or not. Save the data in the levelhistory table.

## Serial communication

Serial data is seperated by a new line: '\r\n'.

The first character is then stripped of for the identification of the signal. The rest is parsed as JSend standard. 

Characters used:

	A: Approach, a user is detected by the infrared sensors
	T: A light sensor is triggered and a sound should be played
	F: A summary of the data including scores is send and shown to the player

