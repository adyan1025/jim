import mediapipe as mp
import cv2 #cv2 is the module import name for opencv-python, "Unofficial pre-built CPU-only OpenCV packages for Python, import opencv


#really media pipelines 
mp_drawing = mp.solutions.drawing_utils #Helper class to visualize the result of a MediaPipe Vision task.
mp_holistic = mp.solutions.holistic #Holistic Landmarker task lets you combine components of the pose, face, and hand landmarkers to create a complete landmarker for the human bod

cap = cv2.VideoCapture(0)
#initiate holistic model by grabbing mp_holistic
with mp_holistic.Holistic(min_detection_confidence=0.5, min_tracking_confidence=0.5) as holistic:
    
    while cap.isOpened():
        ret, frame = cap.read() #reading the feed from our webcam

        #Recolor feed
        image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB) #grabbing frame and then passing it thru the function cv2.cvtcolor and recolor to RGB bc it is taking bgr to rgb
        image.flags.writeable = False

        #Make Detections, VERY IMPORTANT TO CREATING THE DATA SET
        results = holistic.process(image) 
        #print(results.pose_landmarks)

        #rather than printing results, we will draw them to the screen
        #Recolor image back to BGR for rendering
        image.flags.writeable = True
        image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR) #if given an error of src.empty(), camera isnt connecting
            #FACE AND
            ##mp_drawing.draw_landmarks(image, results.face_landmarks, mp_holistic.FACEMESH_TESSELATION)
            #right hand
            ##mp_drawing.draw_landmarks(image, results.right_hand_landmarks, mp_holistic.HAND_CONNECTIONS)
            #left hand
            ##mp_drawing.draw_landmarks(image, results.left_hand_landmarks, mp_holistic.HAND_CONNECTIONS)

        #POSE DETECTIONS
        mp_drawing.draw_landmarks(image, results.pose_landmarks, mp_holistic.POSE_CONNECTIONS)
        

        cv2.imshow('Raw Webcam Feed', image) #what we want our frame to read as, size of image based on video camera 
        
        if cv2.waitKey(10) & 0xFF == ord('q'):
            break

cap.release() #release camera
cv2.destroyAllWindows() #destroy all of our cv2 windows