import time
import mss
import pyautogui
import numpy as np
import keyboard  # Using 'keyboard' library for listening to key presses

# --- Configuration ---
# BOX_SIZE = 400 # Size of the square region around the center to monitor
REGION_PERCENTAGE = 0.15 # Use 15% of screen width/height for the monitor box

# Get screen dimensions
try:
    screenWidth, screenHeight = pyautogui.size()
except Exception as e:
    print(f"Error getting screen size: {e}")
    print("Defaulting to 800x600 region at top-left. Please check pyautogui setup.")
    screenWidth, screenHeight = 800, 600 # Fallback values
    monitor_left = 0
    monitor_top = 40
    monitor_width = 800
    monitor_height = 600
else:
    # Calculate the region centered on the screen based on percentage
    monitor_width = int(screenWidth * REGION_PERCENTAGE)
    monitor_height = int(screenHeight * REGION_PERCENTAGE)
    monitor_left = int(screenWidth / 2 - monitor_width / 2)
    monitor_top = int(screenHeight / 2 - monitor_height / 2)
    # monitor_width = BOX_SIZE
    # monitor_height = BOX_SIZE

# Define the screen region to monitor (top-left x, y, width, height)
# TODO: Determine these coordinates
# MONITOR_REGION = {'top': 40, 'left': 0, 'width': 800, 'height': 600}
MONITOR_REGION = {
    'top': monitor_top,
    'left': monitor_left,
    'width': monitor_width,
    'height': monitor_height
}
print(f"Monitoring region set to: {MONITOR_REGION}")

# TODO: Define the target pixel color (R, G, B) or feature to track
TARGET_COLOR = (255, 0, 0) # Example: Bright Red

# TODO: Define the vertical movement threshold (in pixels)
MOVEMENT_THRESHOLD = 5

# TODO: Define the action cooldown (in seconds)
COOLDOWN = 1.0

# Control flag and key
running = False
toggle_key = 'ctrl+alt+s' # Key to start/stop the script
exit_key = 'ctrl+alt+q' # Key to exit completely

# --- State Variables ---
last_y = None
last_action_time = 0

# --- Helper Functions ---

def find_target_pixel(image_np):
    """
    Placeholder function to find the y-coordinate of the target pixel/feature.
    Needs implementation based on color or feature matching.
    Returns the y-coordinate (relative to the region) or None if not found.
    """
    # Example: Find first pixel matching TARGET_COLOR
    # This is a very basic example and likely needs refinement
    target_rgb = np.array(TARGET_COLOR, dtype=np.uint8)
    # image_np is BGRA, so compare RGB channels
    matches = np.where(np.all(image_np[:, :, :3] == target_rgb, axis=2))
    if matches[0].size > 0:
        return matches[0][0] # Return the y-coordinate of the first match
    return None

def perform_action():
    """Performs the desired action (e.g., right-click)."""
    print("Action triggered!")
    # pyautogui.rightClick()
    # Consider adding small random delays before/after click if needed

# --- Main Loop ---

print(f"Script inactive. Press '{toggle_key}' to start/stop. Press '{exit_key}' to quit.")

def toggle_running():
    global running, last_y
    running = not running
    last_y = None # Reset last position on toggle
    status = "Running" if running else "Stopped"
    print(f"\n--- Script {status} ---")

keyboard.add_hotkey(toggle_key, toggle_running)

with mss.mss() as sct:
    while True:
        if keyboard.is_pressed(exit_key):
            print("Exit key pressed. Exiting...")
            break

        if not running:
            time.sleep(0.1) # Sleep briefly when not running
            continue

        current_time = time.time()

        # 1. Screen Capture
        img = sct.grab(MONITOR_REGION)
        img_np = np.array(img) # Convert to numpy array (BGRA format)

        # 2. Pixel Monitoring
        current_y = find_target_pixel(img_np)

        if current_y is not None:
            print(f"Target found at y={current_y}", end='\r') # Use carriage return to overwrite line
            if last_y is not None:
                # 3. Movement Detection
                delta_y = current_y - last_y

                # 4. Threshold Trigger
                if abs(delta_y) > MOVEMENT_THRESHOLD:
                    print(f"\nMovement detected! Delta Y: {delta_y}")
                    # 5. Action Execution (with cooldown)
                    if current_time - last_action_time > COOLDOWN:
                        perform_action()
                        last_action_time = current_time
                        last_y = None # Reset last_y after action to prevent immediate re-trigger
                        print(f"Action performed. Cooling down for {COOLDOWN}s...")
                        time.sleep(COOLDOWN) # Enforce cooldown strictly after action
                    else:
                        print("Cooldown active...")
            # Update last known position if it was valid
            last_y = current_y
        else:
            print("Target not found in region...", end='\r')
            last_y = None # Reset if target is lost

        # Small delay to prevent high CPU usage
        # time.sleep(0.05)
        # Check roughly 3 times per second
        time.sleep(1/3)

print("\nScript finished.") 