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
