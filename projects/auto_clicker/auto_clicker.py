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

# --- GUI Elements (Define BEFORE functions that use them) ---

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
set_hotkey_button = ctk.CTkButton(master=hotkey_frame, text="Set Hotkey", command=lambda: set_hotkey())
set_hotkey_button.grid(row=0, column=2, padx=10, pady=(5, 10), sticky="e")

# --- Status Frame ---
status_frame = ctk.CTkFrame(master=app)
status_frame.grid(row=3, column=0, padx=20, pady=(10, 20), sticky="nsew")
status_frame.grid_columnconfigure(0, weight=1)

# Variable to store the status text
status_var = ctk.StringVar(value="Status: Stopped") # Default value

status_label = ctk.CTkLabel(master=status_frame, textvariable=status_var, font=ctk.CTkFont(weight="bold"))
status_label.grid(row=0, column=0, padx=10, pady=10)

# --- Helper Functions ---
def get_key_name(key):
    """Returns a user-friendly string representation of a pynput key."""
    try:
        # Prefer key.char if it exists and is not None
        char = getattr(key, 'char', None)
        if char:
            return char
        # Otherwise use key.name for special keys
        if isinstance(key, keyboard.Key):
            return key.name.capitalize()
    except Exception:
        pass # Fallback if any attribute access fails
    return str(key)

# --- Core Functions ---
def set_hotkey():
    global is_setting_hotkey
    if is_setting_hotkey:
        return
    is_setting_hotkey = True
    # Safely update GUI from main thread or callback
    app.after(0, lambda: status_var.set("Status: Press the desired hotkey..."))
    app.after(0, lambda: set_hotkey_button.configure(state="disabled"))
    print("Waiting for new hotkey...")

def get_interval():
    """Gets the click interval from GUI entries and returns it in seconds."""
    try:
        h = int(entry_hours.get())
        m = int(entry_mins.get())
        s = int(entry_secs.get())
        ms = int(entry_ms.get())
        interval = max(0.001, h * 3600 + m * 60 + s + ms / 1000)
        return interval
    except ValueError:
        print("Invalid interval input. Please enter numbers.")
        # Safely update GUI from background thread
        app.after(0, lambda: status_var.set("Status: Invalid Interval!"))
        return None

def toggle_clicking():
    global is_running
    is_running = not is_running
    status = "Running" if is_running else "Stopped"
    print(f"Clicker {status}")
    # This function is called from the listener thread via on_press,
    # so schedule the GUI update on the main thread.
    app.after(0, lambda: status_var.set(f"Status: {status}"))

def click_loop():
    """Main loop for the auto-clicking thread."""
    global is_running
    last_error_time = 0

    while True:
        if not is_running:
            time.sleep(0.1)
            continue

        interval = get_interval()
        if interval is None:
            current_time = time.time()
            if current_time - last_error_time > 5:
                print("Stopping due to invalid interval.")
                last_error_time = current_time
            is_running = False # Stop the loop
            # Safely update GUI from this background thread
            app.after(0, lambda: status_var.set("Status: Stopped (Invalid Interval)"))
            time.sleep(0.5)
            continue

        button_to_click = mouse.Button.left if mouse_button_var.get() == "Left" else mouse.Button.right

        try:
            mouse_controller.click(button_to_click, 1)
            time.sleep(interval)
        except Exception as e:
            print(f"Error during click/sleep: {e}")
            time.sleep(0.1)

def on_press(key):
    global hotkey, is_setting_hotkey, is_running

    if is_setting_hotkey:
        if key == keyboard.Key.esc: # Allow Esc to cancel setting hotkey
             is_setting_hotkey = False
             app.after(0, lambda: set_hotkey_button.configure(state="normal"))
             current_status = "Running" if is_running else "Stopped"
             app.after(0, lambda: status_var.set(f"Status: {current_status}"))
             print("Hotkey setting cancelled.")
             return

        hotkey = key
        hotkey_name = get_key_name(key)
        # Safely update GUI from listener thread
        app.after(0, lambda: hotkey_display_var.set(f"Hotkey: {hotkey_name}"))
        is_setting_hotkey = False
        app.after(0, lambda: set_hotkey_button.configure(state="normal"))
        current_status = "Running" if is_running else "Stopped"
        app.after(0, lambda: status_var.set(f"Status: {current_status}"))
        print(f"New hotkey set to: {hotkey_name}")
        return

    if key == hotkey:
        toggle_clicking()

def start_hotkey_listener():
    global listener_thread
    with keyboard.Listener(on_press=on_press) as listener:
        listener.join()

# --- Start Threads ---
listener_thread = threading.Thread(target=start_hotkey_listener, daemon=True)
listener_thread.start()
click_thread = threading.Thread(target=click_loop, daemon=True)
click_thread.start()

# --- Run App ---
app.mainloop() 