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
# Frame for Interval
# Frame for Mouse Button
# Frame for Hotkey
# Frame for Status/Control

# --- Run App ---
app.mainloop() 