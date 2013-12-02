# API Call

## BOX 

	/play (user_id, level_id, level_details, level_timeout)

Load the level into the box and arduino. Save the user ID and level id for later reference

	/stop ()

Stops the current level from playing an removes the current player 

## API

	/level/save (user_id, level_id, level_details, level_data, level_completed)

Save the level, wheter the user has completed the level or not. Save the data in the levelhistory table.


	

