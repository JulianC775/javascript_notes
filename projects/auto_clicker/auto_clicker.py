import customtkinter as ctk
import threading
import time
from pynput import mouse, keyboard

# --- Global Variables ---
is_running = False
click_thread = None
listener_thread = None
hotkey = keyboard.Key.f6 # Default hotkey
mouse_controller = mouse.Controller() # Create mouse controller instance
is_setting_hotkey = False # Flag to indicate if we are waiting for a new hotkey

# --- GUI Setup ---
ctk.set_appearance_mode("System") # Modes: "System" (default), "Dark", "Light"
ctk.set_default_color_theme("blue") # Themes: "blue" (default), "green", "dark-blue"

app = ctk.CTk()
app.title("Stylish Auto Clicker")
app.geometry("500x350") # Initial size, adjust as needed

# Configure grid layout
app.grid_columnconfigure(0, weight=1)
# Add row configurations as needed when adding more sections

# --- Placeholder Functions (to be implemented) ---
def get_key_name(key):
    """Returns a user-friendly string representation of a pynput key."""
    if isinstance(key, keyboard.KeyCode):
        return key.char
    elif isinstance(key, keyboard.Key):
        # Capitalize special key names (e.g., f6, ctrl_l -> F6, Ctrl_L)
        return key.name.capitalize()
    return str(key)

def set_hotkey():
    global is_setting_hotkey
    if is_setting_hotkey: # Avoid triggering multiple times
        return

    is_setting_hotkey = True
    status_var.set("Status: Press the desired hotkey...")
    set_hotkey_button.configure(state="disabled") # Disable button
    print("Waiting for new hotkey...")

def get_interval():
    """Gets the click interval from GUI entries and returns it in seconds."""
    try:
        h = int(entry_hours.get())
        m = int(entry_mins.get())
        s = int(entry_secs.get())
        ms = int(entry_ms.get())
        # Prevent division by zero or negative intervals
        interval = max(0.001, h * 3600 + m * 60 + s + ms / 1000)
        return interval
    except ValueError:
        print("Invalid interval input. Please enter numbers.")
        status_var.set("Status: Invalid Interval!") # Give feedback
        return None # Indicate error

def toggle_clicking():
    global is_running, click_thread
    is_running = not is_running
    status = "Running" if is_running else "Stopped"
    print(f"Clicker {status}")
    # Update GUI status label here later
    status_var.set(f"Status: {status}") # Update the status label

def click_loop():
    """Main loop for the auto-clicking thread."""
    global is_running
    last_error_time = 0

    while True:
        if not is_running:
            time.sleep(0.1) # Sleep briefly when stopped
            continue

        interval = get_interval()
        if interval is None:
            # Handle error - stop clicking if interval is invalid
            # Debounce error message printing
            current_time = time.time()
            if current_time - last_error_time > 5:
                print("Stopping due to invalid interval.")
                last_error_time = current_time
            is_running = False # Stop the loop
            status_var.set("Status: Stopped (Invalid Interval)")
            time.sleep(0.5) # Short sleep before checking again
            continue

        button_to_click = mouse.Button.left if mouse_button_var.get() == "Left" else mouse.Button.right

        try:
            mouse_controller.click(button_to_click, 1) # Click once
            time.sleep(interval) # Wait for the specified interval
        except Exception as e:
            print(f"Error during click/sleep: {e}")
            # Consider stopping or just logging
            time.sleep(0.1) # Prevent tight loop on error

def on_press(key):
    global hotkey, is_setting_hotkey, is_running

    if is_setting_hotkey:
        hotkey = key # Set the new hotkey
        hotkey_name = get_key_name(key)
        hotkey_display_var.set(f"Hotkey: {hotkey_name}") # Update label
        is_setting_hotkey = False # Reset flag
        set_hotkey_button.configure(state="normal") # Re-enable button
        # Reset status to current running state
        current_status = "Running" if is_running else "Stopped"
        status_var.set(f"Status: {current_status}")
        print(f"New hotkey set to: {hotkey_name}")
        return # Don't process as toggle

    # --- Normal Hotkey Toggle --- (Only if not setting hotkey)
    if key == hotkey:
        toggle_clicking()

def start_hotkey_listener():
    global listener_thread
    # Ensure the listener runs in the background
    with keyboard.Listener(on_press=on_press) as listener:
        listener.join() # Keep listener thread alive

# --- Start Threads ---
# Start listener in a daemon thread so it exits when the main app closes
listener_thread = threading.Thread(target=start_hotkey_listener, daemon=True)
listener_thread.start()

# Start the clicking thread
click_thread = threading.Thread(target=click_loop, daemon=True)
click_thread.start()

# --- GUI Elements (to be added) ---

# --- Interval Frame ---
interval_frame = ctk.CTkFrame(master=app)
interval_frame.grid(row=0, column=0, padx=20, pady=(20, 10), sticky="new") # Place it top, stretch horizontally
interval_frame.grid_columnconfigure((1, 3, 5, 7), weight=1) # Make entry columns expand slightly

interval_label = ctk.CTkLabel(master=interval_frame, text="Click Interval", font=ctk.CTkFont(weight="bold"))
interval_label.grid(row=0, column=0, columnspan=8, padx=10, pady=(5, 10), sticky="w")

# Hours
entry_hours = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_hours.grid(row=1, column=1, padx=(0, 5), pady=5, sticky="ew")
entry_hours.insert(0, "0")
hours_label = ctk.CTkLabel(master=interval_frame, text="hours")
hours_label.grid(row=1, column=2, padx=(0, 10), pady=5, sticky="w")

# Minutes
entry_mins = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_mins.grid(row=1, column=3, padx=(0, 5), pady=5, sticky="ew")
entry_mins.insert(0, "0")
mins_label = ctk.CTkLabel(master=interval_frame, text="mins")
mins_label.grid(row=1, column=4, padx=(0, 10), pady=5, sticky="w")

# Seconds
entry_secs = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_secs.grid(row=1, column=5, padx=(0, 5), pady=5, sticky="ew")
entry_secs.insert(0, "0")
secs_label = ctk.CTkLabel(master=interval_frame, text="secs")
secs_label.grid(row=1, column=6, padx=(0, 10), pady=5, sticky="w")

# Milliseconds
entry_ms = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_ms.grid(row=1, column=7, padx=(0, 5), pady=5, sticky="ew")
entry_ms.insert(0, "100")
ms_label = ctk.CTkLabel(master=interval_frame, text="milliseconds")
ms_label.grid(row=1, column=8, padx=(0, 10), pady=5, sticky="w")

# --- Mouse Button Frame ---
mouse_button_frame = ctk.CTkFrame(master=app)
mouse_button_frame.grid(row=1, column=0, padx=20, pady=10, sticky="new")
mouse_button_frame.grid_columnconfigure(0, weight=1)

mouse_label = ctk.CTkLabel(master=mouse_button_frame, text="Mouse Button", font=ctk.CTkFont(weight="bold"))
mouse_label.grid(row=0, column=0, columnspan=2, padx=10, pady=(5, 10), sticky="w")

# Variable to store the selected mouse button
mouse_button_var = ctk.StringVar(value="Left") # Default value

radio_left = ctk.CTkRadioButton(master=mouse_button_frame, text="Left Click", variable=mouse_button_var, value="Left")
radio_left.grid(row=1, column=0, padx=20, pady=10, sticky="w")

radio_right = ctk.CTkRadioButton(master=mouse_button_frame, text="Right Click", variable=mouse_button_var, value="Right")
radio_right.grid(row=1, column=1, padx=20, pady=10, sticky="w")

# radio_middle = ctk.CTkRadioButton(master=mouse_button_frame, text="Middle Click", variable=mouse_button_var, value="Middle")
# radio_middle.grid(row=1, column=2, padx=20, pady=10, sticky="w") # Uncomment if Middle is needed

# --- Hotkey Frame ---
hotkey_frame = ctk.CTkFrame(master=app)
hotkey_frame.grid(row=2, column=0, padx=20, pady=10, sticky="new")
hotkey_frame.grid_columnconfigure(1, weight=1)

# Label to display the current hotkey
# Use a StringVar to make the label easily updatable
hotkey_display_var = ctk.StringVar(value=f"Hotkey: {hotkey.name.capitalize()}") # Display default
hotkey_label = ctk.CTkLabel(master=hotkey_frame, text="Current Hotkey:", font=ctk.CTkFont(weight="bold"))
hotkey_label.grid(row=0, column=0, padx=10, pady=(5, 10), sticky="w")

hotkey_value_label = ctk.CTkLabel(master=hotkey_frame, textvariable=hotkey_display_var)
hotkey_value_label.grid(row=0, column=1, padx=5, pady=(5, 10), sticky="w")

# Button to set a new hotkey
set_hotkey_button = ctk.CTkButton(master=hotkey_frame, text="Set Hotkey", command=set_hotkey)
set_hotkey_button.grid(row=0, column=2, padx=10, pady=(5, 10), sticky="e")

# --- Status Frame ---
status_frame = ctk.CTkFrame(master=app)
status_frame.grid(row=3, column=0, padx=20, pady=(10, 20), sticky="nsew")
status_frame.grid_columnconfigure(0, weight=1)

# Variable to store the status text
status_var = ctk.StringVar(value="Status: Stopped") # Default value

status_label = ctk.CTkLabel(master=status_frame, textvariable=status_var, font=ctk.CTkFont(weight="bold"))
status_label.grid(row=0, column=0, padx=10, pady=10)

# --- Run App ---
app.mainloop() 