# Minecraft Pixel Movement Automation Project Plan

## Project Goal

Create a script that monitors a specific pixel or small region on the screen while playing Minecraft. If the monitored pixel(s) move vertically by a predetermined amount (indicating an event like a fishing bobber dipping), the script should automatically trigger an action (e.g., a right-click to reel in the fish).

## Core Components

1.  **Screen Capture:** Continuously capture images of a specific region of the screen where the event occurs.
2.  **Pixel Monitoring:** Identify and track the vertical position (y-coordinate) of a target pixel or feature within the captured region.
3.  **Movement Detection:** Calculate the change in the vertical position between consecutive screen captures.
4.  **Threshold Trigger:** Define a minimum vertical movement threshold that signifies the target event.
5.  **Action Execution:** Simulate a user input (like a mouse click or key press) when the movement threshold is exceeded.

## Development Steps

1.  **Choose Technology Stack:**
    *   **Language:** Python is highly recommended due to libraries well-suited for this task.
    *   **Key Libraries:**
        *   `mss` or `Pillow` (PIL Fork): For efficient screen capturing.
        *   `pyautogui` or `pydirectinput`: For simulating mouse clicks/keyboard inputs.
        *   `numpy`: Useful for numerical operations on image data (optional but helpful).
        *   `opencv-python`: For more advanced image processing if simple pixel tracking isn't robust enough (optional).

2.  **Setup:**
    *   Install Python.
    *   Install necessary libraries (`pip install mss Pillow pyautogui numpy`).

3.  **Screen Region Definition:**
    *   Determine the coordinates (top-left x, y, width, height) of the screen area to monitor. This might require some trial and error in-game.
    *   Consider making these coordinates configurable.

4.  **Pixel/Feature Identification:**
    *   Within the captured region, identify the specific pixel(s) to track. This could be based on:
        *   **Color:** Find a pixel with a unique, consistent color (e.g., part of the fishing line or bobber).
        *   **Feature:** If color isn't reliable, identify a small, distinct visual feature. (Requires `opencv-python`).
    *   Need a function to find the initial y-coordinate of this pixel/feature.

5.  **Monitoring Loop:**
    *   Start an infinite loop (with a way to break out, e.g., a hotkey).
    *   Inside the loop:
        *   Capture the defined screen region.
        *   Find the current y-coordinate of the target pixel/feature in the new capture.
        *   Compare the current y-coordinate with the previous one (or an initial baseline).
        *   Calculate the vertical displacement (`delta_y`).

6.  **Threshold Check and Action:**
    *   If `abs(delta_y)` is greater than the defined threshold:
        *   Execute the desired action (e.g., `pyautogui.rightClick()`).
        *   Potentially add a cooldown period before monitoring again.
        *   Update the reference y-coordinate.
    *   Add a small delay (`time.sleep(0.05)`) in the loop to prevent high CPU usage and allow the game state to update.

7.  **Calibration and Tuning:**
    *   Run the script while playing Minecraft.
    *   Adjust the screen region coordinates.
    *   Fine-tune the movement detection threshold. A threshold too low might trigger false positives; too high might miss the event.
    *   Adjust timing and cooldowns for optimal performance.

8.  **User Interface/Control (Optional):**
    *   Add a simple way to start/stop the script (e.g., monitoring for a specific key press).
    *   Consider a basic GUI (using `tkinter`, `PyQt`) to make configuration easier.

## Potential Challenges

*   **Changing Game Visuals:** Lighting changes, weather, different rod types, or Minecraft updates could affect pixel colors or features, requiring recalibration.
*   **Performance:** Screen capturing and processing can be CPU-intensive. Optimization might be needed.
*   **Accuracy:** Precisely timing the action after detection is crucial.
*   **Detection Robustness:** Simple color matching might fail. More advanced image recognition might be necessary.
*   **Anti-Cheat:** Be aware that automation scripts *can* be detected by servers or anti-cheat systems, potentially leading to bans. Use responsibly and primarily in single-player or on servers where it's permitted.

## Progress Log

*   **Initial Planning:** Outlined project goals, components, steps, and challenges in this document.
*   **File Creation:**
    *   Created `minecraft_auto_fisher.py` with basic structure and placeholder logic.
    *   Created `requirements.txt` with necessary libraries.
*   **Environment Setup:**
    *   Created Python virtual environment (`venv`).
    *   Updated root `.gitignore` to ignore `venv/`.
    *   Untracked `venv/` files from Git staging (`git rm --cached`).
    *   Activated `venv`.
    *   Upgraded `pip` within `venv`.
    *   Installed dependencies from `requirements.txt` into `venv`.
