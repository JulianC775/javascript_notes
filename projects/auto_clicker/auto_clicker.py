import customtkinter as ctk
import threading
import time
from pynput import mouse, keyboard

# --- Global Variables ---
is_running = False
click_thread = None
listener_thread = None
hotkey = keyboard.Key.f6 # Default hotkey

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
def set_hotkey():
    print("Hotkey setting logic goes here")

def toggle_clicking():
    global is_running
    is_running = not is_running
    status = "Running" if is_running else "Stopped"
    print(f"Clicker {status}")
    # Update GUI status label here later

def click_loop():
    print("Clicking loop logic goes here")
    pass # Placeholder

def on_press(key):
    global hotkey
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

# Frame for Status/Control

# --- Run App ---
app.mainloop() 