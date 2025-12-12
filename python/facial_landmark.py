import cv2
import mediapipe as mp

#Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh()

# Read an image
image = cv2.imread("face.png")

# Check if image was loaded successfully
if image is None:
    print("Error: Could not load image 'face.png'. Please check if the file exists.")
    exit()
    
height, width, _ = image.shape
print("Height:", height, "Width:", width)
# Convert BGR to RGB
rgb_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)

result = face_mesh.process(rgb_image)
print(result)

# Draw circle in the center of the image
center_x = width // 2
center_y = height // 2
cv2.circle(image, (center_x, center_y), 5, (0, 255, 0), -1)

# Optional: Keep the facial landmark circle
for facial_landmarks in result.multi_face_landmarks:
   for i in range(0, 468):
       pt = facial_landmarks.landmark[i]
       x = int(pt.x * width)
       y = int(pt.y * height)
  
       cv2.circle(image, (x, y), 1, (255, 0, 0), -1)

   pt1 = facial_landmarks.landmark[50]
   x = int(pt1.x * width)
   y = int(pt1.y * height)
  
   cv2.circle(image, (x, y), 3, (0, 255, 0), -1)
   cv2.putText(image,str(i),(x,y),0,1,(0,0,0))

cv2.imshow("Face Image", image)
cv2.imshow("rgb_image", rgb_image)
cv2.waitKey(0)
cv2.destroyAllWindows()
