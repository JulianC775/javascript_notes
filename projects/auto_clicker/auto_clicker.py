import customtkinter as ctk
import threading
import time
from pynput import mouse, keyboard
import json
import os # For checking if foods.json exists

# --- Global Variables (Non-GUI specific or initialized after app) ---
is_running = False
click_thread = None
listener_thread = None
hotkey = keyboard.Key.f6 # Default hotkey
mouse_controller = mouse.Controller()
is_setting_hotkey = False
foods_data = {}
# selected_food_duration will be initialized after app is created
# mouse_button_var will be initialized after app is created

# List of widgets to disable/enable during hotkey setting
interactive_widgets = []


# --- GUI Setup ---
ctk.set_appearance_mode("System") # Modes: "System" (default), "Dark", "Light"
ctk.set_default_color_theme("blue") # Themes: "blue" (default), "green", "dark-blue"

app = ctk.CTk() # Initialize the main application window FIRST
app.title("Stylish Auto Clicker")
app.geometry("500x500")

# --- Initialize Tkinter Variables (Now that 'app' exists) ---
selected_food_duration = ctk.StringVar(value="0.0s") # To display eating duration with unit
mouse_button_var = ctk.StringVar(value="Left") # Default value for mouse button selection

# Configure grid layout
app.grid_columnconfigure(0, weight=1)
# app.grid_rowconfigure(4, weight=1) # Add this if status_frame should be at the bottom and expand

# --- GUI Elements (Define BEFORE functions that use them) ---

# --- Status Frame (Moved to top) ---
status_frame = ctk.CTkFrame(master=app)
status_frame.grid(row=0, column=0, padx=20, pady=(10, 10), sticky="new") # Adjusted row and pady
status_frame.grid_columnconfigure(0, weight=1)

# Variable to store the status text
status_var = ctk.StringVar(value="Status: Stopped") # Default value

status_label = ctk.CTkLabel(
    master=status_frame, 
    textvariable=status_var, 
    font=ctk.CTkFont(weight="bold"),
    fg_color=("blue", "dodgerblue"), # Example blue background (dark_mode, light_mode)
    text_color="white",
    corner_radius=8,
    padx=10,
    pady=5
)
status_label.grid(row=0, column=0, padx=0, pady=0, sticky="ew") # Label sticks to frame edges

# --- Interval Frame ---
interval_frame = ctk.CTkFrame(master=app)
interval_frame.grid(row=1, column=0, padx=20, pady=(0, 10), sticky="new") # Row 1, pady adjusted
interval_frame.grid_columnconfigure((1, 3, 5, 7), weight=1)

interval_label = ctk.CTkLabel(master=interval_frame, text="Click Interval", font=ctk.CTkFont(weight="bold"))
interval_label.grid(row=0, column=0, columnspan=8, padx=10, pady=(5, 10), sticky="w")

# Hours
entry_hours = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_hours.grid(row=1, column=1, padx=(0, 5), pady=5, sticky="ew")
entry_hours.insert(0, "0")
interactive_widgets.append(entry_hours)
hours_label = ctk.CTkLabel(master=interval_frame, text="hours")
hours_label.grid(row=1, column=2, padx=(0, 10), pady=5, sticky="w")

# Minutes
entry_mins = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_mins.grid(row=1, column=3, padx=(0, 5), pady=5, sticky="ew")
entry_mins.insert(0, "0")
interactive_widgets.append(entry_mins)
mins_label = ctk.CTkLabel(master=interval_frame, text="mins")
mins_label.grid(row=1, column=4, padx=(0, 10), pady=5, sticky="w")

# Seconds
entry_secs = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_secs.grid(row=1, column=5, padx=(0, 5), pady=5, sticky="ew")
entry_secs.insert(0, "0")
interactive_widgets.append(entry_secs)
secs_label = ctk.CTkLabel(master=interval_frame, text="secs")
secs_label.grid(row=1, column=6, padx=(0, 10), pady=5, sticky="w")

# Milliseconds
entry_ms = ctk.CTkEntry(master=interval_frame, width=50, justify='center')
entry_ms.grid(row=1, column=7, padx=(0, 5), pady=5, sticky="ew")
entry_ms.insert(0, "100")
interactive_widgets.append(entry_ms)
ms_label = ctk.CTkLabel(master=interval_frame, text="milliseconds")
ms_label.grid(row=1, column=8, padx=(0, 10), pady=5, sticky="w")

# --- Mouse Button Frame ---
mouse_button_frame = ctk.CTkFrame(master=app)
mouse_button_frame.grid(row=2, column=0, padx=20, pady=10, sticky="new") # Row 2
mouse_button_frame.grid_columnconfigure(0, weight=1)

mouse_label = ctk.CTkLabel(master=mouse_button_frame, text="Mouse Button", font=ctk.CTkFont(weight="bold"))
mouse_label.grid(row=0, column=0, columnspan=2, padx=10, pady=(5, 10), sticky="w")

# Variable to store the selected mouse button (already initialized above)

left_click_radio = ctk.CTkRadioButton(master=mouse_button_frame, text="Left Click", variable=mouse_button_var, value="Left")
left_click_radio.grid(row=1, column=0, padx=20, pady=10, sticky="w")
interactive_widgets.append(left_click_radio)

right_click_radio = ctk.CTkRadioButton(master=mouse_button_frame, text="Right Click", variable=mouse_button_var, value="Right")
right_click_radio.grid(row=1, column=1, padx=20, pady=10, sticky="w")
interactive_widgets.append(right_click_radio)

# --- Hotkey Frame ---
hotkey_frame = ctk.CTkFrame(master=app)
hotkey_frame.grid(row=3, column=0, padx=20, pady=10, sticky="new") # Row 3
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

# --- Eating Feature Frame ---
eating_frame = ctk.CTkFrame(master=app)
eating_frame.grid(row=4, column=0, padx=20, pady=10, sticky="new") # Row 4
eating_frame.grid_columnconfigure(1, weight=1)

eating_label = ctk.CTkLabel(master=eating_frame, text="Eating Feature (Off-Hand)", font=ctk.CTkFont(weight="bold"))
eating_label.grid(row=0, column=0, columnspan=3, padx=10, pady=(5, 10), sticky="w") # Adjusted columnspan

food_type_label = ctk.CTkLabel(master=eating_frame, text="Food Type:")
food_type_label.grid(row=1, column=0, padx=10, pady=5, sticky="w") # Adjusted row
food_type_combobox = ctk.CTkComboBox(master=eating_frame, values=[], command=lambda choice: update_food_duration_display(choice))
food_type_combobox.grid(row=1, column=1, columnspan=2, padx=(0,10), pady=5, sticky="ew") # Adjusted row
interactive_widgets.append(food_type_combobox)

eating_duration_label_text = ctk.CTkLabel(master=eating_frame, text="Eat Duration:")
eating_duration_label_text.grid(row=2, column=0, padx=10, pady=5, sticky="w") # Adjusted row
eating_duration_label_value = ctk.CTkLabel(master=eating_frame, textvariable=selected_food_duration)
eating_duration_label_value.grid(row=2, column=1, padx=(0,5), pady=5, sticky="w") # Adjusted row

# Eating Interval
eat_interval_label = ctk.CTkLabel(master=eating_frame, text="Eat Interval (mins):")
eat_interval_label.grid(row=3, column=0, padx=10, pady=5, sticky="w")
entry_eat_interval = ctk.CTkEntry(master=eating_frame, width=60, justify='center')
entry_eat_interval.grid(row=3, column=1, padx=(0,10), pady=5, sticky="ew")
entry_eat_interval.insert(0, "10") # Default to 10 minutes
interactive_widgets.append(entry_eat_interval)

eat_now_button = ctk.CTkButton(master=eating_frame, text="Eat Now (Hold Right Click)", command=lambda: perform_eat_action())
eat_now_button.grid(row=4, column=0, columnspan=3, padx=10, pady=10, sticky="ew") # Adjusted row
interactive_widgets.append(eat_now_button)

java_edition_disclaimer_label = ctk.CTkLabel(
    master=eating_frame, 
    text="(For Minecraft: Java Edition only - Assumes food in off-hand)", # Added "only"
    font=ctk.CTkFont(size=10),
    text_color="gray50"
)
java_edition_disclaimer_label.grid(row=5, column=0, columnspan=3, padx=10, pady=(0, 10), sticky="ew") # Adjusted row

# --- Helper Functions ---
def get_key_name(key):
    """Returns a user-friendly string representation of a pynput key."""
    try:
        # Prefer key.char if it exists and is not None
        char = getattr(key, 'char', None)
        if char:
            # Ensure key.char is a valid character to be used (e.g. not None or special unprintable chars if any)
            # This check is a bit tricky as pynput might give 'char' for some special keys too.
            # A more robust way might be to check its type or if it's in a known set of 'printable' chars.
            # For now, we assume if getattr gives a non-None char, it's intended as the character representation.
            if hasattr(key, 'char') and key.char is not None:
                 return key.char # Prefer char for letter/number keys
        # Otherwise use key.name for special keys
        if isinstance(key, keyboard.Key):
            return key.name.capitalize() # Fallback to name for special keys like F6, Shift_L etc.
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
    for widget in interactive_widgets:
        widget.configure(state="disabled")
    print("Waiting for new hotkey...")

def get_interval():
    """Gets the click interval from GUI entries and returns it in seconds."""
    try:
        h = int(entry_hours.get())
        m = int(entry_mins.get())
        s = int(entry_secs.get())
        ms = int(entry_ms.get())
        interval = max(0.003, h * 3600 + m * 60 + s + ms / 1000) # Changed minimum to 0.003
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
             for widget in interactive_widgets:
                 widget.configure(state="normal")
             # Restore status based on whether clicker is running or stopped
             current_status = "Running" if is_running else "Stopped"
             app.after(0, lambda: status_var.set(f"Status: {current_status}"))
             print("Hotkey setting cancelled.")
             return

        hotkey = key
        hotkey_name = get_key_name(key) # Use the refined get_key_name
        # Safely update GUI from listener thread
        app.after(0, lambda: hotkey_display_var.set(f"Hotkey: {hotkey_name}"))
        is_setting_hotkey = False
        app.after(0, lambda: set_hotkey_button.configure(state="normal"))
        for widget in interactive_widgets:
            widget.configure(state="normal")
        # Restore status based on whether clicker is running or stopped
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

# --- Eating Feature Functions ---
def load_food_data():
    """Loads food data from a JSON file (placeholder for now)."""
    global foods_data
    foods_file = "projects/auto_clicker/foods.json"
    default_foods = {
        "Most Foods": 1.61,
        "Kelp": 0.865
    }

    if os.path.exists(foods_file):
        try:
            with open(foods_file, 'r') as f:
                foods_data = json.load(f)
            print(f"Loaded food data from {foods_file}")
        except json.JSONDecodeError:
            print(f"Error decoding {foods_file}. Using default foods.")
            foods_data = default_foods
            _save_default_foods(foods_file, default_foods) # Attempt to save defaults if file was corrupt
        except Exception as e:
            print(f"Error loading {foods_file}: {e}. Using default foods.")
            foods_data = default_foods
    else:
        print(f"'{foods_file}' not found. Creating with default foods.")
        foods_data = default_foods
        _save_default_foods(foods_file, default_foods)

    if food_type_combobox: # Check if GUI element exists
        food_names = list(foods_data.keys())
        food_type_combobox.configure(values=food_names)
        if food_names:
            food_type_combobox.set(food_names[0])
            update_food_duration_display(food_names[0])
        else:
            food_type_combobox.set("") # Clear if no food data
            selected_food_duration.set("N/A")

def _save_default_foods(file_path, data):
    """Helper to save default food data to JSON."""
    try:
        with open(file_path, 'w') as f:
            json.dump(data, f, indent=4)
        print(f"Saved default food data to {file_path}")
    except Exception as e:
        print(f"Error saving default food data to {file_path}: {e}")

def update_food_duration_display(selected_food_name):
    """Updates the eating duration label based on selected food."""
    global foods_data, selected_food_duration
    if selected_food_name and selected_food_name in foods_data:
        duration = foods_data[selected_food_name]
        selected_food_duration.set(f"{duration:.3f}s") # Display with 3 decimal places and unit
    else:
        selected_food_duration.set("N/A")

def perform_eat_action():
    """Simulates holding right-click to eat food from off-hand."""
    food_type = food_type_combobox.get()

    if not food_type or food_type not in foods_data:
        print("No valid food type selected or food data missing.")
        app.after(0, lambda: status_var.set("Status: Select Food Type!"))
        return

    try:
        duration = foods_data[food_type]
    except KeyError:
        print(f"Error: Food type '{food_type}' not found in data.")
        app.after(0, lambda: status_var.set("Status: Food Data Error!"))
        return

    print(f"Attempting to eat: '{food_type}' for {duration:.3f}s")
    app.after(0, lambda: status_var.set(f"Status: Eating {food_type}..."))

    def _eat_action_thread():
        try:
            mouse_controller.press(mouse.Button.right)
            time.sleep(duration) # Hold right click for the food's duration
            mouse_controller.release(mouse.Button.right)
            print(f"Finished eating '{food_type}'.")
            # Update status on main thread after action
            app.after(0, lambda: status_var.set(f"Status: Finished Eating {food_type}"))
        except Exception as e:
            print(f"Error during eat action: {e}")
            app.after(0, lambda: status_var.set("Status: Error Eating!"))
        finally:
            # Revert to main clicker status after a short delay, or if eating was quick
            app.after(1000, lambda: app.after(0, lambda: status_var.set(f"Status: {'Running' if is_running else 'Stopped'}")) )

    threading.Thread(target=_eat_action_thread, daemon=True).start()


# --- Initialize & Start Threads ---
load_food_data() # Load food data on startup

listener_thread = threading.Thread(target=start_hotkey_listener, daemon=True)
listener_thread.start()
click_thread = threading.Thread(target=click_loop, daemon=True)
click_thread.start()

# --- Run App ---
app.mainloop() 