# Imports
import argparse
from RecordMovie import * 

# Argument parser
parser = argparse.ArgumentParser(description='Start recording a movie with the webcam')
parser.add_argument('-c','--camera', help='Location of the Webcam', required=True)
parser.add_argument('-n','--name', help='Name of the movie', required=True)
parser.add_argument('-d','--duration', help='Duration of the movie', required=True)
args = vars(parser.parse_args())


# Setup camera 
camera = cv2.VideoCapture(args['camera'])

# Capture the video
recordMovie = RecordMovie(savepath, camera, args['name'],args['name'],args['duration'])
recordMovie.record()

# Release the camere and recordMvie
del(camera)
del(recordMovie) 
SerialRecordController.py