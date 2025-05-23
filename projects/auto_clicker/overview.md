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
*   **Control & Status (Top of Window):**
    *   `CTkLabel` for Status: "Status: Stopped" / "Status: Running".
    *   This label should have a noticeable background color (e.g., a shade of blue) to clearly indicate the current status.
    *   Optional: A main `CTkButton` for Start/Stop as an alternative to the hotkey (can mirror hotkey state).
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
*   **Eating Feature Section (V2):**
    *   Label: "Eating Feature (Off-Hand - Java Edition only)"
    *   `CTkComboBox` for food type selection.
    *   Label to display selected food's eating duration.
    *   `CTkEntry` for "Eating Interval (minutes)" - for automated periodic eating.
    *   `CTkButton` to trigger the eat action (manual eat now).
    *   A small disclaimer label: "(For Minecraft: Java Edition only - Assumes food in off-hand)".

## Core Logic Outline

1.  **GUI Setup (`CustomTkinter`):**
    *   Create the main window (`app = ctk.CTk()`) **before** defining any Tkinter/CustomTkinter variables (e.g., `ctk.StringVar`, `ctk.IntVar`). This is crucial to avoid `RuntimeError: Too early to create variable`.
    *   Arrange widgets as planned according to the GUI Layout Plan.
    *   Link input fields and radio buttons to their respective Tkinter variables after both the main window and variables are defined.
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
    *   Mechanism for the "Set Hotkey" button: 
        *   Temporarily stops the main listener.
        *   Starts a temporary listener that records the next keypress.
        *   Updates the hotkey setting.
        *   Restarts the main listener.
        *   Crucially, upon entering the "listening" state for a new hotkey, all other interactive GUI elements (especially text input fields like click interval) should be temporarily disabled or unfocused. This prevents any key presses intended for the hotkey from being accidentally entered into other fields. Once the hotkey is set or the action is cancelled, these elements should revert to their normal state.
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

#### 1. Eating Feature (Assumes Food in Off-Hand - Minecraft: Java Edition only)
    *   This feature is designed specifically for Minecraft: Java Edition, assuming food is in the player's off-hand.
    *   **Automated Eating Action:** When triggered, the script will simulate holding the right mouse button for a duration specific to the selected off-hand food item.
    *   **Eating Interval:**
        *   A `CTkEntry` will allow the user to specify an interval in minutes.
        *   This interval is intended for an automated process that triggers the eating action periodically (implementation of this timer/loop is a further step).
    *   **Off-Hand Food Type Selection:**
        *   A GUI element (e.g., `CTkComboBox`) for the user to select their current off-hand food type from a list defined in a configuration file.
    *   **Data Storage:** Store food types and their eating durations in a JSON file (e.g., `foods.json`). This allows for easy viewing and manual modification of food data (e.g., `{"Most Foods": 1.61, "Kelp": 0.865}`).
    *   **Activation:** This feature can be triggered by a dedicated button in the GUI. (Future enhancement: could be a global hotkey).

#### 2. Improved Click Logic
    *   **Minimum Click Interval:** Refine the click scheduling logic to reliably support very short intervals, with a target minimum of approximately 3 milliseconds. This may involve optimizing the sleep mechanism or using a more precise timer if `time.sleep()` proves insufficient for such high frequencies.
    *   **Input Validation:** Stricter validation on interval inputs to prevent values that are too low to be feasible or could cause instability.
