# Project: Stylish Auto Clicker

## Goal

To create a visually appealing desktop application (GUI) for automating mouse clicks at user-defined intervals, controllable via a global hotkey.

## Core Features

1.  **Graphical User Interface (GUI):** A standalone window for settings and control.
2.  **Click Interval Configuration:**
    *   Separate input fields for Hours, Minutes, Seconds, and Milliseconds.
    *   Interface similar to the provided reference image.
3.  **Mouse Button Selection:** Allow the user to choose between Left or Right mouse clicks.
4.  **Start/Stop Control:**
    *   A global hotkey (configurable by the user) to toggle the auto-clicking on and off.
    *   Visual feedback within the GUI (e.g., status label, button state).
5.  **Aesthetic Design:** Utilize a modern GUI toolkit or theme to avoid a plain/boring appearance.
6.  **Background Operation:** Clicking should occur via a background thread so the GUI remains responsive.

## Proposed Technology Stack

*   **Language:** Python 3.x
*   **GUI Library:** `CustomTkinter` (Provides modern-looking widgets based on Tkinter, easier to style than standard Tkinter). Alternatives: PyQt/PySide (more powerful but complex), Kivy (good for touch, different aesthetic).
*   **Input/Mouse Control:** `pynput` (Good for handling global hotkeys and simulating mouse events cross-platform).
*   **Threading:** Python's built-in `threading` module (To run the clicker loop and hotkey listener without blocking the GUI).

## GUI Layout Plan

*   **Main Window:** Themed using `CustomTkinter` (e.g., dark mode).
*   **Click Interval Section:**
    *   Label: "Click Interval"
    *   Four `CTkEntry` widgets arranged horizontally.
    *   Labels ("hours", "mins", "secs", "milliseconds") next to each entry box.
    *   Default values (e.g., 0, 0, 0, 100).
*   **Mouse Button Section:**
    *   Label: "Mouse Button"
    *   `CTkRadioButton` group for "Left", "Right", "Middle". Default to "Left".
*   **Hotkey Section:**
    *   Label displaying the current hotkey (e.g., "Hotkey: F6"). Default to a sensible key (like F6).
    *   `CTkButton`: "Set Hotkey". Clicking this enters a "listening" state until the user presses the desired key combination.
*   **Control & Status:**
    *   `CTkLabel` for Status: "Status: Stopped" / "Status: Running" (Color change optional).
    *   Optional: A main `CTkButton` for Start/Stop as an alternative to the hotkey (can mirror hotkey state).

## Core Logic Outline

1.  **GUI Setup (`CustomTkinter`):**
    *   Create the main window and arrange widgets as planned.
    *   Link input fields and radio buttons to variables.
2.  **Interval Calculation:**
    *   Function to read values from the four interval entry boxes.
    *   Validate input (ensure numbers).
    *   Convert hours, minutes, seconds, milliseconds into a single interval value in seconds (float).
3.  **Clicking Thread:**
    *   A function `click_loop()` designed to run in a separate thread (`threading.Thread`).
    *   Contains a `while True` loop.
    *   Inside the loop:
        *   Check a global flag (`is_running`). If `False`, `time.sleep()` briefly and `continue`.
        *   If `True`, perform the selected mouse click using `pynput.mouse.Controller`.
        *   `time.sleep()` for the calculated interval.
4.  **Hotkey Listener (`pynput`):**
    *   A function `toggle_clicking()` that flips the `is_running` flag and updates the GUI status label.
    *   A function `on_press(key)` for the listener. Checks if the pressed key matches the configured hotkey. If yes, call `toggle_clicking()`.
    *   A function `start_hotkey_listener()` to run the `pynput.keyboard.Listener` in a separate thread.
    *   Mechanism for the "Set Hotkey" button: Temporarily stops the main listener, starts a temporary listener that records the next keypress, updates the hotkey setting, and restarts the main listener.
5.  **State Management:**
    *   Use a global boolean variable (`is_running`) controlled by the hotkey/button.
    *   Ensure thread safety if needed, although simple flag toggling might be okay here.
6.  **Initialization:**
    *   Start the GUI main loop.
    *   Start the hotkey listener thread.
    *   Start the clicking thread.

## Aesthetics Plan

*   Use `CustomTkinter`'s built-in themes ("dark-blue", "blue", "green").
*   Ensure consistent padding and spacing between widgets.
*   Use clear, readable fonts.
*   Consider subtle animations or color changes for button presses/state changes if `CustomTkinter` supports them easily.

## Potential Future Enhancements

*   Click location options (current position, fixed coordinates).
*   Click repetition limit (stop after N clicks).
*   Random interval variation.
*   Saving/Loading hotkey and interval settings.
*   Packaging the application into an executable (`pyinstaller`).

## Version 2 - Beta

### New Features

#### 1. Eating Feature
    *   **Food Slot Selection:** Allow the user to specify a hotkey slot number (e.g., 1-9) where their food item is located in-game.
    *   **Automated Eating Action:** When triggered, the script will simulate:
        *   Pressing the corresponding number key to select the food slot.
        *   Holding the right mouse button for a duration specific to the food item.
    *   **Food Type Configuration:**
        *   A GUI element (e.g., `CTkComboBox` or `CTkOptionMenu`) for the user to select their current food type from a predefined list.
        *   An entry box or a dedicated interface for managing food types and their respective "eating durations".
    *   **Data Storage:** Store food types and their eating durations. JSON is a viable option for this, allowing for easy addition and modification of food data (e.g., `{"Steak": 5.2, "Cooked Fish": 3.5}`).
    *   **Activation:** This feature could be triggered by a separate global hotkey or integrated into the main clicker logic (e.g., eat when idle).

#### 2. Improved Click Logic
    *   **Minimum Click Interval:** Refine the click scheduling logic to reliably support very short intervals, with a target minimum of approximately 3 milliseconds. This may involve optimizing the sleep mechanism or using a more precise timer if `time.sleep()` proves insufficient for such high frequencies.
    *   **Input Validation:** Stricter validation on interval inputs to prevent values that are too low to be feasible or could cause instability.
