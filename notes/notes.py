# ======================================================
#  PYTHON FUNDAMENTALS NOTES
# ======================================================
# This file contains comprehensive notes on Python fundamentals
# covering syntax, data types, control structures, and more

# =========================
#  1. NAMING CONVENTIONS
# =========================
# Python naming conventions help maintain code consistency and readability

# Snake Case: All lowercase with words separated by underscores
# Used for: variables, functions, methods, parameters
# This is the most common convention in Python
user_name = "john_doe"        # Variable using snake case
def calculate_total():        # Function using snake case
    pass

# Pascal Case (Upper Camel Case): Capitalize first letter of every word
# Used for: classes
# Helps distinguish class definitions from regular functions/variables
class UserProfile:           # Class definition using Pascal case
    pass

# Other naming conventions:
# - UPPER_SNAKE_CASE: For constants that are truly unchanging
MAX_USERS = 50              # Constant using UPPER_SNAKE_CASE

# - Private variables/methods: Prefix with underscore (convention only)
_private_variable = "hidden"  # Conventional way to indicate private variable

# - Boolean variables: Prefix with "is", "has", "can"
is_active = True            # Boolean prefixed with "is"
has_permission = False      # Boolean prefixed with "has"

# =========================
#  2. PYTHON INTRODUCTION
# =========================

# Python is a high-level, interpreted programming language known for its readability
# It's dynamically typed and supports multiple programming paradigms
# Python was created by Guido van Rossum and first released in 1991
# It emphasizes code readability with its notable use of significant whitespace
# Python is widely used in web development, data science, AI, and automation

# Python File Structure:
# 1. Imports
# 2. Constants
# 3. Class definitions
# 4. Function definitions
# 5. Main execution code

# =========================
#  3. VARIABLES & DATA TYPES
# =========================

# Variable Declaration - Python is dynamically typed
# No need to declare variable types explicitly
name = "John"              # String
age = 30                   # Integer
height = 1.75             # Float
is_student = True         # Boolean

# Data Types - Python has several built-in data types

# Numeric Types
integer = 42              # int - whole numbers
float_num = 3.14          # float - decimal numbers
complex_num = 1 + 2j      # complex - numbers with real and imaginary parts

# Sequence Types
string = "Hello"          # str - sequence of characters
list_example = [1, 2, 3]  # list - mutable sequence
tuple_example = (1, 2, 3) # tuple - immutable sequence
range_example = range(5)  # range - sequence of numbers

# Mapping Type
dict_example = {          # dict - key-value pairs
    "name": "John",
    "age": 30
}

# Set Types
set_example = {1, 2, 3}   # set - unordered collection of unique elements
frozen_set = frozenset([1, 2, 3])  # frozenset - immutable set

# Boolean Type
true_value = True         # bool - True or False
false_value = False

# None Type
none_value = None         # None - represents absence of a value

# Type checking and conversion
type(integer)             # Check type of variable
str(integer)              # Convert to string
int("42")                 # Convert to integer
float("3.14")             # Convert to float
bool(1)                   # Convert to boolean

# =========================
#  4. OPERATORS
# =========================

# Arithmetic operators
sum = 10 + 5              # Addition
difference = 10 - 5       # Subtraction
product = 10 * 5          # Multiplication
quotient = 10 / 5         # Division (returns float)
floor_quotient = 10 // 5  # Floor division (returns int)
remainder = 10 % 3        # Modulus
power = 10 ** 2           # Exponentiation

# Assignment operators
x = 10                    # Assignment
x += 5                    # Addition assignment
x -= 5                    # Subtraction assignment
x *= 2                    # Multiplication assignment
x /= 2                    # Division assignment
x %= 3                    # Modulus assignment
x **= 2                   # Exponentiation assignment

# Comparison operators
is_equal = 10 == 10       # Equal to
is_not_equal = 10 != 5    # Not equal to
is_greater = 10 > 5       # Greater than
is_less = 5 < 10          # Less than
is_greater_equal = 10 >= 10  # Greater than or equal to
is_less_equal = 5 <= 10   # Less than or equal to

# Logical operators
and_result = True and False  # Logical AND
or_result = True or False    # Logical OR
not_result = not True        # Logical NOT

# Identity operators
is_same = x is y           # is - checks if both variables point to same object
is_not_same = x is not y   # is not - checks if variables point to different objects

# Membership operators
in_list = 1 in [1, 2, 3]   # in - checks if value exists in sequence
not_in_list = 4 not in [1, 2, 3]  # not in - checks if value doesn't exist in sequence

# =========================
#  5. CONTROL FLOW
# =========================

# If statement
age = 18
if age >= 18:
    print("You are an adult")
elif age >= 13:
    print("You are a teenager")
else:
    print("You are a child")

# Ternary operator
status = "Adult" if age >= 18 else "Minor"

# Match statement (Python 3.10+)
match day:
    case "Monday":
        print("Start of work week")
    case "Friday":
        print("End of work week")
    case "Saturday" | "Sunday":
        print("Weekend!")
    case _:
        print("Midweek")

# =========================
#  6. LOOPS
# =========================

# For loop
for i in range(5):
    print(f"Iteration {i}")

# While loop
count = 0
while count < 5:
    print(f"Count: {count}")
    count += 1

# Break and continue
for i in range(10):
    if i == 3:
        continue  # Skip the rest of the current iteration
    if i == 8:
        break     # Exit the loop
    print(i)

# For-else loop
for i in range(5):
    if i == 3:
        break
else:
    print("Loop completed without break")

# =========================
#  7. FUNCTIONS
# =========================

# Function definition
def greet(name):
    """This is a docstring explaining the function."""
    return f"Hello, {name}!"

# Function with default parameters
def greet_with_default(name="Guest"):
    return f"Hello, {name}!"

# Function with variable arguments
def sum_numbers(*args):
    return sum(args)

# Function with keyword arguments
def person_info(**kwargs):
    return kwargs

# Lambda function (anonymous function)
square = lambda x: x * x

# Function annotations
def greet_typed(name: str) -> str:
    return f"Hello, {name}!"

# =========================
#  8. LISTS
# =========================

# Creating lists
fruits = ["Apple", "Banana", "Orange"]
mixed = [1, "two", True, None, {"name": "object"}, [1, 2]]

# List methods
fruits.append("Mango")        # Add element to end
fruits.pop()                  # Remove and return last element
fruits.insert(1, "Pear")      # Insert element at index
fruits.remove("Banana")       # Remove first occurrence of element
fruits.sort()                 # Sort list in place
fruits.reverse()              # Reverse list in place

# List comprehension
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]

# =========================
#  9. DICTIONARIES
# =========================

# Creating dictionaries
person = {
    "name": "John",
    "age": 30,
    "city": "New York"
}

# Dictionary methods
person["email"] = "john@example.com"  # Add new key-value pair
del person["age"]                     # Remove key-value pair
person.get("name")                    # Get value safely
person.keys()                         # Get all keys
person.values()                       # Get all values
person.items()                        # Get all key-value pairs

# Dictionary comprehension
squares_dict = {x: x**2 for x in range(5)}

# =========================
#  10. ERROR HANDLING
# =========================

# Try-except block
try:
    result = 10 / 0
except ZeroDivisionError as e:
    print(f"Error: {e}")
finally:
    print("This always executes")

# Custom exceptions
class ValidationError(Exception):
    pass

# Raising exceptions
def divide(a, b):
    if b == 0:
        raise ValueError("Division by zero")
    return a / b

# =========================
#  11. FILE HANDLING
# =========================

# Reading files
with open("file.txt", "r") as file:
    content = file.read()

# Writing files
with open("file.txt", "w") as file:
    file.write("Hello, World!")

# Appending to files
with open("file.txt", "a") as file:
    file.write("\nNew line")

# =========================
#  12. CLASSES
# =========================

# Class definition
class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

    def greet(self):
        return f"Hello, I'm {self.name}"

# Inheritance
class Employee(Person):
    def __init__(self, name, age, employee_id):
        super().__init__(name, age)
        self.employee_id = employee_id

# =========================
#  13. MODULES & PACKAGES
# =========================

# Importing modules
import math
from datetime import datetime
import random as rnd

# Creating modules
# Save as mymodule.py
"""
def greet(name):
    return f"Hello, {name}!"
"""

# Using modules
# import mymodule
# mymodule.greet("John")

# =========================
#  14. DECORATORS
# =========================

# Function decorator
def my_decorator(func):
    def wrapper(*args, **kwargs):
        print("Something is happening before the function is called.")
        result = func(*args, **kwargs)
        print("Something is happening after the function is called.")
        return result
    return wrapper

@my_decorator
def say_hello():
    print("Hello!")

# =========================
#  15. CONTEXT MANAGERS
# =========================

# Using context managers
with open("file.txt", "r") as file:
    content = file.read()

# Custom context manager
class MyContextManager:
    def __enter__(self):
        print("Entering context")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        print("Exiting context")

# =========================
#  16. ITERATORS & GENERATORS
# =========================

# Iterator
class CountDown:
    def __init__(self, start):
        self.start = start

    def __iter__(self):
        return self

    def __next__(self):
        if self.start <= 0:
            raise StopIteration
        self.start -= 1
        return self.start + 1

# Generator
def countdown(n):
    while n > 0:
        yield n
        n -= 1

# =========================
#  17. REGULAR EXPRESSIONS
# =========================

import re

# Basic regex patterns
pattern = r"\d+"  # Match one or more digits
text = "123abc456"
matches = re.findall(pattern, text)

# Common regex methods
re.search(pattern, text)    # Search for pattern
re.match(pattern, text)     # Match pattern at start
re.findall(pattern, text)   # Find all matches
re.sub(pattern, "X", text)  # Replace matches

# =========================
#  18. DATETIME HANDLING
# =========================

from datetime import datetime, timedelta

# Current time
now = datetime.now()

# Time arithmetic
future = now + timedelta(days=7)

# Formatting
formatted = now.strftime("%Y-%m-%d %H:%M:%S")

# =========================
#  19. JSON HANDLING
# =========================

import json

# Converting to JSON
data = {"name": "John", "age": 30}
json_string = json.dumps(data)

# Parsing JSON
parsed_data = json.loads(json_string)

# =========================
#  20. VIRTUAL ENVIRONMENTS
# =========================

# Creating virtual environment
# python -m venv myenv

# Activating virtual environment
# Windows: myenv\Scripts\activate
# Unix/MacOS: source myenv/bin/activate

# Installing packages
# pip install package_name

# Requirements file
# pip freeze > requirements.txt
# pip install -r requirements.txt

# =======================================================================
#  21. AUTOCLICKER PROJECT: GUI, THREADING, INPUT CONTROL & RESOURCES
# =======================================================================
# This section covers concepts from the AutoClicker project, focusing on
# CustomTkinter for GUI, threading for concurrency, pynput for input simulation,
# and managing resources for bundled applications.

# --- A. GUI Programming with CustomTkinter ---
# CustomTkinter is a Python UI library based on Tkinter, providing modern and customizable widgets.
# The AutoClicker project uses it for its user interface.

# Key imports for CustomTkinter and standard library features:
# import customtkinter as ctk
# import threading
# import time
# from pynput import mouse, keyboard
# import json
# import os
# import sys

# 1. Initializing the Application
#    - Set appearance mode and default color theme.
#    - Create the main application window (ctk.CTk).
#    - Set window title and initial geometry.
"""
ctk.set_appearance_mode("System")
ctk.set_default_color_theme("blue")
app = ctk.CTk()
app.title("Auto Clicker Example")
app.geometry("400x300")
"""

# 2. Tkinter Variables (e.g., ctk.StringVar)
#    - Used to link Python variables with widget properties (e.g., label text, entry content).
#    - Changes to the StringVar automatically update the widget, and vice-versa.
"""
status_var = ctk.StringVar(value="Status: Stopped")
status_label = ctk.CTkLabel(master=app, textvariable=status_var)
# To update the label: status_var.set("New Status")
"""

# 3. Widgets and Layout
#    - CustomTkinter offers various widgets: CTkFrame, CTkLabel, CTkEntry, CTkButton,
#      CTkRadioButton, CTkComboBox, CTkSwitch.
#    - The .grid() layout manager is used to arrange widgets in rows and columns.
#    - `sticky="ew"` makes a widget expand horizontally to fill its grid cell.
#    - `padx`, `pady` add padding around widgets.
#    - `columnspan` allows a widget to span multiple columns.
#    - `columnconfigure` and `rowconfigure` with `weight=1` allow grid cells to expand
#      when the window is resized.
"""
frame = ctk.CTkFrame(master=app)
frame.grid(row=0, column=0, padx=10, pady=10, sticky="nsew") # Sticky on all sides
app.grid_columnconfigure(0, weight=1) # Make column 0 expandable
app.grid_rowconfigure(0, weight=1)    # Make row 0 expandable

label = ctk.CTkLabel(master=frame, text="Click Interval:")
label.grid(row=0, column=0, padx=5, pady=5)

entry = ctk.CTkEntry(master=frame)
entry.grid(row=0, column=1, padx=5, pady=5, sticky="ew")
frame.grid_columnconfigure(1, weight=1) # Make column 1 in frame expandable
"""

# 4. Event Handling (Widget Commands)
#    - Widgets like buttons or comboboxes can trigger functions when an event occurs
#      (e.g., button click, selection change).
#    - The `command` parameter is often used, typically with a lambda function for simple actions
#      or to pass arguments.
"""
def on_button_click():
    print("Button clicked!")

button = ctk.CTkButton(master=app, text="Click Me", command=on_button_click)
button.grid(row=1, column=0)

# Command with lambda to pass arguments or call methods:
# item_var = ctk.StringVar()
# combobox = ctk.CTkComboBox(master=app, values=["A", "B"], variable=item_var,
#                            command=lambda choice: print(f"Selected: {choice}"))
"""

# 5. Updating GUI from Other Threads (app.after)
#    - Tkinter (and CustomTkinter) GUI updates must happen on the main thread.
#    - If a background thread needs to update the GUI (e.g., change a label),
#      it must use `app.after(delay_ms, callback_function)`.
#    - `delay_ms = 0` schedules the callback to run as soon as possible in the main event loop.
"""
# # In a background thread:
# def update_status_from_thread(new_status):
#     app.after(0, lambda: status_var.set(new_status)) # status_var is a ctk.StringVar

# # Example usage from a thread:
# import threading
# def worker_thread():
#     time.sleep(2)
#     update_status_from_thread("Updated from thread!")
# threading.Thread(target=worker_thread).start()
"""

# 6. Managing Widget States
#    - Widgets can be enabled or disabled using `widget.configure(state="disabled")` or
#      `widget.configure(state="normal")`.
#    - Useful for preventing user interaction during certain operations (e.g., setting a hotkey).
"""
# entry_widget.configure(state="disabled")
# entry_widget.configure(state="normal")
"""

# 7. Focus Management
#    - The AutoClicker manages focus for entry fields to ensure only one is active,
#      disabling others to guide input.
#    - Uses `<FocusIn>` and `<FocusOut>` event bindings.
"""
# def on_entry_focus_in(focused_widget, all_entries_list):
#     for widget in all_entries_list:
#         if widget is not focused_widget and widget.winfo_exists():
#             widget.configure(state="disabled")
#     focused_widget.configure(state="normal") # Ensure the focused one is normal
#     focused_widget.focus_set()

# def on_entry_focus_out(event, all_entries_list): # event object is passed by Tkinter
#     for widget in all_entries_list:
#         if widget.winfo_exists():
#             widget.configure(state="normal")

# # entry_hours.bind("<FocusIn>", lambda event, w=entry_hours: on_entry_focus_in(w, focusable_entry_widgets))
# # entry_hours.bind("<FocusOut>", lambda event: on_entry_focus_out(event, focusable_entry_widgets))
"""

# --- B. Multithreading for Concurrent Tasks ---
# The `threading` module allows concurrent execution of different parts of the program.
# AutoClicker uses threads for:
#   - The main click loop (`click_loop`).
#   - The hotkey listener (`start_hotkey_listener`).
#   - The auto-eat loop (`auto_eat_loop`).

# 1. Creating and Starting Threads
#    - `threading.Thread(target=function_name, daemon=True)`
#    - `target` is the function the thread will execute.
#    - `daemon=True` means the thread will exit automatically when the main program exits.
#      This is crucial for GUI applications so background threads don't keep the app alive.
#    - `thread.start()` begins execution of the thread.
"""
# def my_task():
#     for i in range(5):
#         print(f"Task running: {i}")
#         time.sleep(1)

# task_thread = threading.Thread(target=my_task, daemon=True)
# task_thread.start()
# # task_thread.join() # Use join() if the main thread needs to wait for this thread to complete
"""

# 2. Shared State and GUI Updates
#    - Global variables (e.g., `is_running`, `is_auto_eating`) are used to communicate state
#      between threads and the main GUI.
#    - CAUTION: Modifying shared data from multiple threads can lead to race conditions.
#      For complex applications, use `threading.Lock` or other synchronization primitives.
#      In AutoClicker, shared boolean flags are often read by multiple threads and written
#      by one or in response to GUI events, which is simpler but still requires care.
#    - As mentioned, GUI updates from threads MUST use `app.after()`.

# --- C. System Input Control with Pynput ---
# The `pynput` library allows controlling and monitoring input devices (mouse and keyboard).

# 1. Mouse Control (`pynput.mouse`)
#    - `mouse.Controller()` creates an object to control the mouse.
#    - `mouse_controller.click(mouse.Button.left, 1)` simulates a single left-click.
#    - `mouse_controller.press(mouse.Button.right)` simulates pressing the right mouse button.
#    - `mouse_controller.release(mouse.Button.right)` simulates releasing it.
#      (Used in AutoClicker for the eating action).
"""
# from pynput import mouse
# mouse_ctrl = mouse.Controller()
# mouse_ctrl.press(mouse.Button.left)
# time.sleep(0.1) # Hold click for a short duration
# mouse_ctrl.release(mouse.Button.left)
"""

# 2. Keyboard Listening (`pynput.keyboard`)
#    - `keyboard.Listener(on_press=callback_function)` creates a listener that calls
#      `callback_function` whenever a key is pressed.
#    - The callback `on_press(key)` receives the pressed key as an argument.
#    - `listener.join()` blocks the current thread until the listener stops. This is why
#      the hotkey listener runs in its own dedicated thread.
#    - Keys can be special (e.g., `keyboard.Key.f6`, `keyboard.Key.esc`) or character keys.
#    - `key.name` (e.g., 'f6', 'esc') or `key.char` (e.g., 'a', '1') can be used to identify keys.
#      The AutoClicker includes a `get_key_name(key)` helper for a user-friendly display.
"""
# from pynput import keyboard

# def on_key_press(key):
#     try:
#         print(f"Key pressed: {key.char}")
#     except AttributeError:
#         print(f"Special key pressed: {key.name}")
#     if key == keyboard.Key.esc:
#         print("Escape pressed, stopping listener.")
#         return False # Stop listener

# # This would typically run in a separate thread:
# # with keyboard.Listener(on_press=on_key_press) as listener:
# #     listener.join()
"""

# --- D. Handling Bundled Resources (PyInstaller & `sys._MEIPASS`) ---
# When a Python script is bundled into an executable (e.g., using PyInstaller),
# resource files (like images, data files) need to be accessed correctly.
# PyInstaller unpacks files to a temporary folder (`_MEIPASS`) at runtime.

# The `resource_path` function in AutoClicker addresses this:
"""
# import sys
# import os

# def resource_path(relative_path):
#     \"\"\" Get absolute path to resource, works for dev and for PyInstaller \"\"\"
#     try:
#         # PyInstaller creates a temp folder and stores path in _MEIPASS
#         base_path = sys._MEIPASS
#     except AttributeError: # Changed from generic Exception for specificity
#         # _MEIPASS is not set, running in development
#         base_path = os.path.abspath(".") # Use current working directory or script's directory
#         # If script is in projects/auto_clicker and json is also there,
#         # os.path.dirname(__file__) would be more robust for development.
#         # For AutoClicker's structure, os.path.abspath(".") works if run from project root
#         # or if foods.json is relative to CWD.
#         # A common pattern for dev: base_path = os.path.dirname(os.path.abspath(__file__))

#     return os.path.join(base_path, relative_path)

# # Usage:
# # foods_json_path = resource_path("foods.json")
# # icon_path = resource_path("my_icon.ico")
"""
# - `sys._MEIPASS`: An attribute set by PyInstaller at runtime, pointing to the temporary folder.
# - If `sys._MEIPASS` doesn't exist (AttributeError), it means the script is running in a normal
#   Python environment (development mode).
# - `os.path.abspath(".")` gives the path to the current working directory.
# - `os.path.join()` correctly combines paths for different operating systems.

# --- E. Advanced JSON Usage (Configuration & Default Data) ---
# While basic JSON loading/dumping is covered in section 19, AutoClicker shows a practical use:
# - Loading application data (food types and durations) from `foods.json`.
# - Handling cases where the JSON file might be missing or corrupted:
#   - If `foods.json` doesn't exist, create it with default values.
#   - If `foods.json` is unreadable (e.g., `json.JSONDecodeError`), use default values and
#     attempt to save these defaults back to the file.
# This pattern makes the application more resilient.

"""
# # Simplified from AutoClicker's load_food_data:
# foods_data_global = {}
# default_foods_global = {"DefaultFood": 1.0}
# foods_file_path_global = resource_path("foods.json") # Using the helper from above

# def load_app_data():
#     global foods_data_global
#     if os.path.exists(foods_file_path_global):
#         try:
#             with open(foods_file_path_global, 'r') as f:
#                 foods_data_global = json.load(f)
#             print(f"Loaded data from {foods_file_path_global}")
#         except json.JSONDecodeError:
#             print(f"Error decoding {foods_file_path_global}. Using defaults.")
#             foods_data_global = default_foods_global
#             _save_default_data(foods_file_path_global, default_foods_global)
#         except Exception as e: # Catch other potential file errors
#             print(f"Error loading {foods_file_path_global}: {e}. Using defaults.")
#             foods_data_global = default_foods_global
#     else:
#         print(f"'{foods_file_path_global}' not found. Creating with defaults.")
#         foods_data_global = default_foods_global
#         _save_default_data(foods_file_path_global, default_foods_global)

# def _save_default_data(file_path, data):
#     try:
#         with open(file_path, 'w') as f:
#             json.dump(data, f, indent=4)
#         print(f"Saved default data to {file_path}")
#     except Exception as e:
#         print(f"Error saving default data to {file_path}: {e}")

# # Call at startup:
# # load_app_data()
# # Then use foods_data_global in the application.
"""

# This covers key advanced topics and patterns from the AutoClicker project, integrating
# GUI development, concurrency, system interaction, and robust data handling.
