// ======================================================
//  JAVASCRIPT FUNDAMENTALS NOTES
// ======================================================
// This file contains comprehensive notes on JavaScript fundamentals
// covering syntax, data types, control structures, and more

// =========================
//  1. NAMING CONVENTIONS
// =========================
// JavaScript naming conventions help maintain code consistency and readability

// Camel Case: First word lowercase, subsequent words capitalize first letter
// Used for: variables, functions, methods, properties, parameters
// This is the most common convention in JavaScript
let userName = "john_doe";        // Variable using camel case
function calculateTotal() { }     // Function using camel case
const getUserData = () => { };    // Arrow function using camel case
object.propertyName = value;      // Object property using camel case

// Pascal Case (Upper Camel Case): Capitalize first letter of every word
// Used for: classes, constructor functions, React components
// Helps distinguish class definitions from regular functions/variables
class UserProfile { }                 // Class definition using Pascal case
function Person(name) { }             // Constructor function using Pascal case
const ButtonComponent = () => { };    // React component using Pascal case

// Other naming conventions:
// - UPPER_SNAKE_CASE: For constants that are truly unchanging
// Used for values that are known at compile time and never change
const MAX_USERS = 50;                 // Constant using UPPER_SNAKE_CASE

// - Private variables/methods: Prefix with underscore (convention only)
// JavaScript doesn't have true private fields (until class # syntax), so _ is used to signal intent
let _privateVariable = "hidden";      // Conventional way to indicate private variable

// - Boolean variables: Prefix with "is", "has", "can"
// Makes code more readable by explicitly indicating boolean nature
let isActive = true;                  // Boolean prefixed with "is"
let hasPermission = false;            // Boolean prefixed with "has"

// =========================
//  2. JAVASCRIPT INTRODUCTION
// =========================

// JavaScript is a high-level, interpreted programming language primarily used for web development
// It's single-threaded with non-blocking I/O, making it ideal for event-driven programming
// JavaScript was created in 10 days in May 1995 by Brendan Eich while at Netscape
// It allows you to implement complex features on web pages and make them interactive
// JavaScript is one of the core technologies of the web, alongside HTML and CSS

// Including JavaScript in HTML:
// 1. Internal JavaScript:
/*
<script>
    // JavaScript code here - embedded directly in HTML file
    // Executes when the parser reaches this point in the HTML document
</script>
*/

// 2. External JavaScript:
/*
<script src="script.js"></script>
<!-- External scripts are more maintainable and can be cached by browsers -->
<!-- Can be placed in <head> (with defer/async) or at end of <body> to ensure DOM is loaded -->
*/

// =========================
//  3. VARIABLES & DATA TYPES
// =========================

// Variable Declaration Methods - Different ways to create variables in JavaScript
// 1. var - OUTDATED/LEGACY: Function-scoped, hoisted with initial value of undefined
var oldVariable = "This is the older way to declare variables"; 
// Problems with var:
// - Function-scoped (not block-scoped), which can cause unexpected behavior
// - Variables are hoisted to the top of their scope and initialized as undefined
// - Can be redeclared multiple times in the same scope
// - Creates properties on the global object when declared globally
// Example of var problems:
// if (true) {
//   var scopeTest = "I'm visible outside the block"; 
// }
// console.log(scopeTest); // Works - var is not block-scoped

// 2. let - RECOMMENDED: Modern block-scoped variable that can be reassigned
let modernVariable = "Modern variable declaration";
// Benefits of let:
// - Block-scoped (only accessible within declaring block)
// - Hoisted but not initialized (in "temporal dead zone" until declaration)
// - Cannot be redeclared in the same scope
// - Does not create properties on the global object
// Example of let benefits:
// if (true) {
//   let blockScoped = "I'm only visible in this block";
// }
// console.log(blockScoped); // Error - let is block-scoped

// 3. const - RECOMMENDED: Block-scoped variable that cannot be reassigned
const constant = "Cannot be reassigned";
// Properties of const:
// - Must be initialized at declaration
// - Cannot be reassigned (but object/array contents can still be modified)
// - Same scoping rules as let (block-scoped)
// Example of const behavior:
// const obj = { prop: "value" };
// obj.prop = "new value"; // Valid - changing property
// obj = {}; // Error - cannot reassign const

// 4. No keyword (implicit global) - AVOID: Creates global variables
// implicitGlobal = "Never do this"; // Creates a property on the global object
// Always use let, const, or var (in legacy code only) to declare variables

// 5. Using Window/globalThis object - AVOID except for specific purposes
// window.explicitGlobal = "Also avoid"; // Browser-only, explicitly creates global property

// Best practice: Use const by default, let when reassignment is needed, avoid var completely

// Data Types - JavaScript has 8 basic data types (7 primitive + objects)

// Primitive types - immutable data types that are passed by value
let string = "This is a string";   // String - sequence of characters enclosed in quotes ('' or "")
                                   // Used for text, no size limit (limited by memory)
                                   // Has properties like .length and methods like .substring(), .toLowerCase()

let number = 42;                   // Number - 64-bit floating point format (IEEE 754 standard)
                                   // Range: ±5.0x10^-324 to ±1.7977x10^308
                                   // Integers are precise up to ±2^53-1 (9,007,199,254,740,991)
                                   // Special values: Infinity, -Infinity, NaN (Not a Number)

let decimal = 42.5;                // Also a Number - JavaScript doesn't distinguish between integers and floating-point
                                   // Decimal numbers use the same 64-bit floating point format

let boolean = true;                // Boolean - logical data type with only two values: true or false
                                   // Used for conditional logic, comparisons, and control flow

let nullValue = null;              // Null - represents intentional absence of any object value
                                   // Only one possible value: null
                                   // typeof null returns 'object' (a longstanding JavaScript bug)

let undefinedValue;                // Undefined - variable declared but not assigned a value
                                   // Only one possible value: undefined
                                   // Functions without return statements return undefined

let bigInt = 9007199254740991n;    // BigInt - for integers larger than Number.MAX_SAFE_INTEGER (±2^53-1)
                                   // Created by appending 'n' to an integer or using BigInt() constructor
                                   // No upper theoretical limit (only limited by available memory)
                                   // Cannot be mixed with Numbers in operations without explicit conversion

let symbol = Symbol("unique");     // Symbol - unique and immutable primitive value used as object property identifiers
                                   // Created using Symbol() function with optional description parameter
                                   // Every Symbol value is unique, even with the same description
                                   // Used for avoiding name collisions in object properties

// Complex types - passed by reference
let array = [1, 2, 3, "four", true];  // Array - ordered collection of values of any type
                                      // Zero-indexed, dynamic size, accessed using bracket notation
                                      // Has many built-in methods like push(), pop(), map(), filter()

let object = { name: "John", age: 30 }; // Object - collection of key-value pairs (properties)
                                        // Used to store related data and functionality
                                        // Foundation for JavaScript's object-oriented capabilities
                                        // Properties accessed via dot notation or bracket notation

let functionVar = function() { return "Hello"; }; // Function - callable object that executes a block of code
                                                  // Can be assigned to variables, passed as arguments, returned from other functions
                                                  // Functions are first-class citizens in JavaScript

// Type checking - methods to determine data types
console.log(typeof string);       // 'string' - typeof operator returns a string indicating the data type
console.log(typeof number);       // 'number' - works for primitive types but has limitations
console.log(typeof object);       // 'object' - doesn't distinguish between object types (arrays, null, etc.)
console.log(Array.isArray(array)); // true - special method to check if a value is an Array (typeof array returns 'object')

// Type conversion - changing from one data type to another
let numString = "42";                   // A string containing a number
let convertedNum = Number(numString);   // String to number conversion using Number() constructor 
                                        // Returns NaN if string can't be converted to a valid number

let strFromNum = String(convertedNum);  // Number to string conversion using String() constructor
                                        // Alternative: number.toString() method

let boolFromNum = Boolean(convertedNum); // Number to boolean conversion using Boolean() constructor
                                         // Falsy values: 0, NaN, "", null, undefined, false
                                         // All other values convert to true

// =========================
//  4. OPERATORS
// =========================

// Arithmetic operators - perform mathematical operations on values
let sum = 10 + 5;         // Addition operator (+) - adds values, returns their sum (15)
let difference = 10 - 5;  // Subtraction operator (-) - subtracts right value from left value (5)
let product = 10 * 5;     // Multiplication operator (*) - multiplies values, returns product (50)
let quotient = 10 / 5;    // Division operator (/) - divides left value by right value (2)
let remainder = 10 % 3;   // Modulus operator (%) - returns division remainder (1)
let exponent = 10 ** 2;   // Exponentiation operator (**) - raises left value to power of right value (100)

// Increment/Decrement operators - increase or decrease a value by 1
let counter = 0;
counter++;    // Increment operator (++) - increases value by 1 (post-increment: returns value then increments)
counter--;    // Decrement operator (--) - decreases value by 1 (post-decrement: returns value then decrements)
// Pre-increment (++counter) increments value then returns it
// Post-increment (counter++) returns value then increments it

// Assignment operators - assign values to variables
let x = 10;     // Assignment operator (=) - assigns right value to left variable
x += 5;         // Addition assignment (+=) - adds right value to variable and assigns result (x = x + 5; now x is 15)
x -= 5;         // Subtraction assignment (-=) - subtracts right value from variable (x = x - 5; now x is 10)
x *= 2;         // Multiplication assignment (*=) - multiplies variable by right value (x = x * 2; now x is 20)
x /= 2;         // Division assignment (/=) - divides variable by right value (x = x / 2; now x is 10)
x %= 3;         // Modulus assignment (%=) - assigns remainder of division to variable (x = x % 3; now x is 1)

// Comparison operators - compare values and return boolean
let isEqual = 10 == "10";              // Equal (==) - compares values, performs type coercion (true)
                                       // Type coercion converts the string "10" to number 10 before comparison

let isStrictEqual = 10 === "10";       // Strict equal (===) - compares values AND types, no coercion (false)
                                       // 10 is a number, "10" is a string, so they're not strictly equal

let isNotEqual = 10 != 5;              // Not equal (!=) - checks if values are not equal, with coercion (true)
let isStrictNotEqual = 10 !== "10";    // Strict not equal (!==) - checks if values OR types are different (true)

let isGreater = 10 > 5;                // Greater than (>) - checks if left value is greater than right (true)
let isLess = 5 < 10;                   // Less than (<) - checks if left value is less than right (true)
let isGreaterOrEqual = 10 >= 10;       // Greater than or equal (>=) - checks if left is greater or equal (true)
let isLessOrEqual = 5 <= 10;           // Less than or equal (<=) - checks if left is less or equal (true)

// Logical operators - perform logical operations and return boolean
let and = true && false;   // Logical AND (&&) - returns true if both operands are true, otherwise false (false)
                          // Short-circuits: if left operand is false, right operand isn't evaluated

let or = true || false;    // Logical OR (||) - returns true if either operand is true (true)
                          // Short-circuits: if left operand is true, right operand isn't evaluated

let not = !true;           // Logical NOT (!) - returns the opposite boolean value (false)
                          // Double negation (!!) can be used to convert any value to its boolean equivalent

// String operators - work with text
let firstNameEx = "John";
let lastNameEx = "Doe";
let fullName = firstNameEx + " " + lastNameEx;   // String concatenation (+) - joins strings together ("John Doe")
                                                // Plus operator becomes concatenation when any operand is a string

let template = `${firstNameEx} ${lastNameEx}`;   // Template literals (ES6) - string interpolation using backticks
                                                // Allows embedding expressions ${...} directly in strings
                                                // Supports multi-line strings without explicit newlines

// =========================
//  5. CONTROL FLOW
// =========================

// If statement - conditional execution based on boolean condition
let age = 18;
if (age >= 18) {                   // Evaluates condition in parentheses
    console.log("You are an adult"); // Executes if condition is true (age is 18 or higher)
} else if (age >= 13) {            // Optional additional condition, checked if previous conditions are false
    console.log("You are a teenager"); // Executed if age is between 13 and 17
} else {                           // Optional default case, runs if all conditions are false
    console.log("You are a child");   // Executed if age is less than 13
}

// Ternary operator - shorthand conditional expression
// Syntax: condition ? expressionIfTrue : expressionIfFalse
let status = age >= 18 ? "Adult" : "Minor";  // If age >= 18, status = "Adult", otherwise "Minor"
                                            // Shorter alternative to if-else for simple conditional assignments

// Switch statement - multi-way branch statement
let day = "Monday";
switch (day) {                            // Evaluates expression in parentheses once
    case "Monday":                        // Compares expression with case value using strict equality (===)
        console.log("Start of work week"); // Executes if match is found
        break;                            // Exits the switch statement (prevents fall-through to next case)
    case "Friday":
        console.log("End of work week");
        break;
    case "Saturday":                      // Multiple cases without break statements
    case "Sunday":                        // Fall-through: both cases execute the same code block
        console.log("Weekend!");
        break;
    default:                              // Optional default case, executes if no case matches
        console.log("Midweek");           // Like else in if statement
}

// =========================
//  6. LOOPS
// =========================

// For loop - most common loop with initialization, condition, and increment/decrement
// Syntax: for (initialization; condition; final-expression) { code block }
for (let i = 0; i < 5; i++) {          // i is initialized to 0, loop runs while i < 5, i increases by 1 after each iteration
    console.log(`Iteration ${i}`);     // Body executes 5 times with i values: 0, 1, 2, 3, 4
}                                      // let i is block-scoped to the loop (not available outside)

// While loop - repeats as long as condition is true
// Syntax: while (condition) { code block }
let count = 0;                     // Initialize counter before loop
while (count < 5) {                // Check condition before each iteration
    console.log(`Count: ${count}`); // Loop body
    count++;                       // Update counter (must be done manually to avoid infinite loop)
}                                  // Loop runs while count < 5 (5 times with values 0-4)

// Do-while loop - variant of while loop that executes at least once
// Syntax: do { code block } while (condition);
let counter2 = 0;
do {
    console.log(`Number: ${counter2}`); // Body executes first
    counter2++;                         // Then counter is updated
} while (counter2 < 5);                 // Condition checked after execution
                                       // Guarantees at least one execution even if condition is initially false

// For...of loop - iterates over iterable objects (arrays, strings, maps, sets)
// Syntax: for (variable of iterable) { code block }
let colors = ["red", "green", "blue"];
for (let color of colors) {            // In each iteration, color gets the current value from colors
    console.log(color);                // Simpler than for loop for iterating array elements
}                                      // No need to access by index or track count

// For...in loop - iterates over enumerable properties of an object
// Syntax: for (variable in object) { code block }
let person = { name: "John", age: 30, job: "Developer" };
for (let key in person) {                 // key gets each property name ("name", "age", "job")
    console.log(`${key}: ${person[key]}`); // Access value using bracket notation
}                                         // Careful: also iterates over inherited properties

// Breaking and continuing - control loop execution
for (let i = 0; i < 10; i++) {
    if (i === 3) continue;  // Skip the rest of the current iteration and move to next iteration
                           // The value 3 won't be logged
    if (i === 8) break;     // Exit the loop completely
                           // The values 8 and 9 won't be logged
    console.log(i);         // Outputs: 0, 1, 2, 4, 5, 6, 7
}

// =========================
//  7. FUNCTIONS
// =========================
//arrow syntax
// Arrow function with implicit return (no braces)
const greetArrowExample = (name) => `Hello, ${name}!`;  // Single expression is returned without 'return'

//function syntax
const greet = function(name) {
    return `Hello, ${name}!`;
};

// JavaScript offers multiple ways to declare functions, each with different behaviors

// 1. Function Declaration - Hoisted, named function
function greet(name) {                // Classic syntax, function name required
    return `Hello, ${name}!`;         // Can be called before its declaration (hoisted)
}                                     // Without return, function returns undefined

// 2. Function Expression - Not hoisted, can be anonymous or named
// 2a. Anonymous Function Expression
const sayHello = function(name) {       // Anonymous function assigned to variable
    return `Hello, ${name}!`;           // Must be defined before use (not hoisted)
};                                      // Semicolon needed as this is an assignment

// 2b. Named Function Expression 
const sayHi = function greetUser(name) { // Named function expression
    return `Hi, ${name}!`;              // Name is only available inside function for recursion
};                                       // External code uses variable name (sayHi)

// 3. Arrow Function (ES6) - No 'this' binding, shorter syntax
// 3a. Arrow function with implicit return (no braces)
const greetArrow = (name) => `Hello, ${name}!`;  // Single expression is returned without 'return'
                                                // No 'this' binding, inherits from parent scope

// 3b. Arrow function with block body (requires explicit return)
const greetArrowBlock = (name) => {
    // Multiple statements need braces
    const message = `Hello, ${name}!`;
    return message;  // Explicit return required with braces
};

// 3c. Arrow function with single parameter (can omit parentheses)
const squareFunc = x => x * x;  // Parentheses can be omitted with exactly one parameter

// 3d. Arrow function with no parameters (requires parentheses)
const greetSimple = () => "Hello!";  // Empty parentheses required with no parameters

// 4. Method definition in object literals (ES6)
const greeter = {
    name: "Friendly Greeter",
    greet(person) {              // Shorthand method definition (same as greet: function(person))
        return `Hello, ${person}!`;
    }
};

// 5. Class methods (ES6) - methods in class definitions
class Greeter {
    constructor(name) {
        this.name = name;
    }
    
    greet(person) {              // Method in a class
        return `${this.name} says hello to ${person}!`;
    }
    
    // Static method belongs to class itself, not instances
    static create(name) {
        return new Greeter(name);
    }
}

// 6. Generator functions (ES6) - functions that can yield multiple values
function* idGenerator() {        // Asterisk marks it as a generator
    let id = 0;
    while (true) {
        yield id++;              // yield returns a value and pauses execution
    }
}

// 7. Async functions (ES2017) - functions that return promises
async function fetchData() {      // async keyword makes function return a promise
    try {
        const response = await fetch('https://api.example.com/data');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
    }
}

// 8. Immediately Invoked Function Expression (IIFE) - self-executing function
(function() {                           // Function expression wrapped in parentheses
    let privateVar = "I'm private";     // Variables inside are not accessible from outside
    console.log("This runs immediately!"); 
})();                                   // Parentheses immediately invoke the function

// 9. Function constructor - AVOID except for very specific cases
// const dynamicFn = new Function('a', 'b', 'return a + b');  // Creates function from string
// console.log(dynamicFn(2, 3));  // 5

// Best practices:
// - Use function declarations for core functions that need hoisting
// - Use arrow functions for callbacks and short methods
// - Use method shorthand in objects
// - Avoid the Function constructor (security and performance issues)
// - Prefer named functions for better debugging and stack traces

// Default parameters - provide fallback values for parameters
function greetWithDefault(name = "Guest") {     // If name argument is undefined, "Guest" is used
    return `Hello, ${name}!`;                   // Allows function to be called without arguments
}                                               // greetWithDefault() returns "Hello, Guest!"

// Rest parameters - represents indefinite number of arguments as an array
function sum(...numbers) {                      // ...numbers collects all arguments into an array
    return numbers.reduce((total, num) => total + num, 0); // Process the array using array methods
}                                               // Useful for functions with variable argument count
console.log(sum(1, 2, 3, 4));                   // Passes four arguments, collected into [1, 2, 3, 4], result: 10

// Function scope - variables declared inside function are only accessible inside that function
let globalVar = "I'm global";              // Variable declared outside any function (global scope)
function testScope() {
    let localVar = "I'm local";            // Variable declared inside function (local scope)
    console.log(globalVar);                // Can access global variables from inner scope
    console.log(localVar);                 // Can access local variables
}
// console.log(localVar);                  // Error: localVar is not defined in this scope

// Callback functions - functions passed as arguments to other functions
// Fundamental for asynchronous programming in JavaScript
function processUserInput(callback) {        // Takes function as parameter
    let name = "John";                       // In real case, this might come from user input
    callback(name);                          // Calls the provided function with name as argument
}

processUserInput(function(name) {            // Passing anonymous function as callback
    console.log(`Hello, ${name}`);           // Will be executed when callback is called in processUserInput
});

// =========================
//  8. ARRAYS
// =========================

// Creating arrays - ordered, indexed collections of values
let fruits = ["Apple", "Banana", "Orange"];     // Array literal - most common way to create arrays
                                               // Elements can be of any type and mixed

let mixed = [1, "two", true, null, {name: "object"}, [1, 2]];  // Array with mixed data types
                                                             // Can contain primitives, objects, and other arrays

let arrayConstructor = new Array(1, 2, 3);   // Array constructor - alternative way to create arrays
                                            // Caution: new Array(5) creates array with 5 empty slots

// Accessing elements - array elements are accessed by index (zero-based)
let firstFruit = fruits[0];                 // Access first element (index 0) - "Apple"
let lastFruit = fruits[fruits.length - 1];  // Access last element - "Orange"
                                           // length property returns the number of elements

// Array methods - built-in functions for array manipulation
fruits.push("Mango");        // push() - adds one or more elements to end of array
                            // Returns new array length, modifies original array

fruits.pop();                // pop() - removes last element from array
                            // Returns removed element, modifies original array

fruits.unshift("Strawberry"); // unshift() - adds one or more elements to beginning of array
                             // Returns new array length, modifies original array

fruits.shift();              // shift() - removes first element from array
                            // Returns removed element, modifies original array

fruits.splice(1, 1, "Pear");  // splice() - changes array by removing and/or adding elements
                             // First argument: start index
                             // Second argument: delete count
                             // Additional arguments: elements to add
                             // Returns removed elements, modifies original array

let newFruits = fruits.slice(1, 3);   // slice() - extracts section of array without modifying original
                                     // First argument: start index (inclusive)
                                     // Second argument: end index (exclusive)
                                     // Returns new array with extracted elements

let combined = fruits.concat(["Kiwi", "Peach"]);  // concat() - joins arrays into new array
                                                 // Does not modify original arrays
                                                 // Returns new combined array

let joinedString = fruits.join(", ");   // join() - creates string from array elements
                                       // Argument: separator between elements
                                       // Returns string with all elements joined

let index = fruits.indexOf("Banana");   // indexOf() - finds index of element in array
                                       // Returns first matching index or -1 if not found

// Iterating over arrays - different ways to process array elements
fruits.forEach(function(fruit) {       // forEach() - executes function for each element
    console.log(fruit);                // First parameter: current element
});                                    // Additional parameters: index, array

// Higher-order array methods - functional programming approaches
let numbers = [1, 2, 3, 4, 5];

// Map - transform each element according to a function
let doubled = numbers.map(num => num * 2);  // map() - creates new array with results of calling function on each element
                                           // Returns new array of same length with transformed elements
                                           // Original array remains unchanged
                                           // Result: [2, 4, 6, 8, 10]

// Filter - create new array with elements that pass test
let evens = numbers.filter(num => num % 2 === 0);  // filter() - creates new array with elements that pass test function
                                                  // Function should return boolean value
                                                  // Returns new array with matching elements only
                                                  // Original array remains unchanged
                                                  // Result: [2, 4]

// Reduce - reduce array to single value
let sum2 = numbers.reduce((total, num) => total + num, 0);  // reduce() - applies function to accumulator and each element
                                                           // First parameter: callback function with accumulator and current value
                                                           // Second parameter: initial accumulator value (0 in this case)
                                                           // Returns final accumulated value
                                                           // Result: 15 (1+2+3+4+5)

// Sort - arranges elements in place
let sortedNumbers = [5, 2, 8, 1].sort((a, b) => a - b);  // sort() - sorts elements in place and returns array
                                                        // Without argument, sorts as strings lexicographically
                                                        // Callback function for numeric sorting:
                                                        // - Return negative: a comes before b
                                                        // - Return positive: b comes before a
                                                        // - Return 0: order unchanged
                                                        // Result: [1, 2, 5, 8]

// =========================
//  9. OBJECTS
// =========================

// Creating objects - collections of key-value pairs
let user = {
    firstName: "John",             // Object literal - most common way to create objects
    lastName: "Doe",               // Properties are key-value pairs
    age: 30,                       // Keys are strings (quotation marks optional if valid identifier)
    email: "john@example.com",     // Values can be any data type
    isAdmin: false,
    address: {                     // Nested object as property value
        street: "123 Main St",
        city: "Anytown"
    },
    greet: function() {            // Method - function stored as property
        return `Hello, I'm ${this.firstName}`; // this refers to current object
    }
};

// Accessing properties - two ways to access object properties
console.log(user.firstName);      // Dot notation - simpler, more common
                                 // Only works with valid identifiers as property names

console.log(user["lastName"]);    // Bracket notation - more flexible
                                 // Works with any string as property name
                                 // Required when property names have spaces or special characters
                                 // Also allows dynamic property access: user[propertyName]

// Adding/modifying properties - objects are mutable
user.phone = "123-456-7890";     // Add new property - create property if it doesn't exist
user.age = 31;                   // Modify existing property - update value if property exists

// Deleting properties - remove properties from objects
delete user.isAdmin;             // delete operator - removes property from object
                                // Returns true if property could be deleted, false otherwise

// Object methods - built-in functions for object manipulation
console.log(user.greet());                // Method call - invoking function stored as object property
                                         // 'this' refers to the object the method belongs to

console.log(Object.keys(user));           // Object.keys() - returns array of property names (keys)
                                         // Includes only own enumerable properties

console.log(Object.values(user));         // Object.values() - returns array of property values
                                         // Same order as Object.keys()

console.log(Object.entries(user));        // Object.entries() - returns array of [key, value] pairs
                                         // Useful for iterating through object properties

// Object destructuring - extract multiple properties in a single statement
let { firstName: fName, lastName: lName, age: userAge } = user;  // Extract properties with renaming
                                                                // Creates variables fName, lName, userAge
                                                                // Without renaming: let { firstName, lastName } = user;

// Spread operator - copy properties from one object to another
let clonedUser = { ...user };           // Shallow copy - creates new object with same properties
                                       // Only copies own enumerable properties
                                       // Nested objects are still referenced, not deeply copied

let extendedUser = { ...user, role: "editor" };  // Copy properties and add new ones
                                                // Existing properties come first, can be overridden by later properties

// Object constructor - function used to create multiple similar objects
function Person(name, age) {            // Constructor function - conventionally capitalized
    this.name = name;                   // 'this' refers to the new object being created
    this.age = age;                     // Properties assigned to 'this' become object properties
    this.greet = function() {           // Methods assigned to 'this' become object methods
        return `Hello, I'm ${this.name}`;
    };
}

let john = new Person("John", 30);      // 'new' operator creates new object
                                       // Calls Person constructor with new object as 'this'
                                       // Returns the created object

// =========================
//  10. ERROR HANDLING
// =========================

// Try...catch statement - handle errors without stopping program execution
try {
    // Code that may throw an error
    let result = nonExistentFunction();  // This function doesn't exist - will throw ReferenceError
} catch (error) {
    // Code that executes if error occurs in try block
    console.error("An error occurred:", error.message);  // error object contains details about the error
                                                        // Common properties: message, name, stack
} finally {
    // Code that always executes, regardless of whether error occurred
    console.log("This always executes");  // Used for cleanup operations (closing files, connections)
                                         // Executes even if try or catch contain return statement
}

// Throwing errors - create and trigger custom errors
function divide(a, b) {
    if (b === 0) {
        // throw statement creates error object and triggers error handling
        throw new Error("Division by zero");  // Error is built-in error constructor
                                            // Program execution stops here unless caught
    }
    return a / b;
}

// Custom errors - extend Error class for application-specific errors
class ValidationError extends Error {  // Inherit from built-in Error class
    constructor(message) {
        super(message);               // Call parent constructor
        this.name = "ValidationError"; // Customize error name
    }
}

// =========================
//  11. ASYNCHRONOUS JAVASCRIPT
// =========================

// Callbacks - functions passed as arguments to be executed later
function fetchData(callback) {                  // Function that will execute asynchronously
    setTimeout(() => {                          // setTimeout schedules function to run after delay
        callback("Data received");              // Call the callback function with result
    }, 1000);                                   // 1000ms (1 second) delay
}

fetchData(function(data) {                      // Passing callback function to handle result
    console.log(data);                          // Executes when data is ready (after 1 second)
});                                             // Program continues execution without waiting

// Promises - objects representing eventual completion or failure of async operation
let promise = new Promise((resolve, reject) => {  // Promise constructor takes executor function
    let success = true;                          // Simulating async operation result
    if (success) {
        resolve("Operation successful");         // If operation succeeds, call resolve with result
    } else {
        reject("Operation failed");              // If operation fails, call reject with error
    }
});                                              // Promise is immediately in "pending" state

promise
    .then(result => console.log(result))         // .then() registers callback for fulfilled promise
                                                // Receives value passed to resolve()
    .catch(error => console.error(error));       // .catch() registers callback for rejected promise
                                                // Receives value passed to reject()

// Chaining promises - sequence asynchronous operations
fetch('https://api.example.com/data')            // fetch() returns promise for HTTP response
    .then(response => response.json())           // .then() returns new promise for parsed JSON
    .then(data => console.log(data))             // Chain another .then() to handle parsed data
    .catch(error => console.error('Error:', error)); // Single catch handles errors in any previous step

// Async/await - syntactic sugar for working with promises
async function fetchUserData() {                 // async keyword makes function return promise
    try {
        let response = await fetch('https://api.example.com/user');  // await pauses execution until promise resolves
                                                                    // Returns resolved value (not promise)
        let userData = await response.json();                       // Can await multiple promises in sequence
        return userData;                                            // Return value is wrapped in resolved promise
    } catch (error) {
        console.error('Error:', error);                             // try/catch works with await for error handling
    }
}

// =========================
//  12. ES6+ FEATURES
// =========================

// Let and const (block-scoped variables)
{
    var varVariable = "var";         // Function-scoped, can be redeclared, hoisted with initialization as undefined
    let letVariable = "let";         // Block-scoped, cannot be redeclared in same scope, hoisted without initialization
    const constVariable = "const";   // Block-scoped, cannot be reassigned, must be initialized at declaration
}
console.log(varVariable);            // "var" - accessible outside block
// console.log(letVariable);         // Error: letVariable is not defined - block-scoped variables not accessible outside

// Template literals - string interpolation and multi-line strings
let name = "Alice";
let greeting = `Hello, ${name}! Today is ${new Date().toLocaleDateString()}.`;  // Backticks for template literals
                                                                               // ${} for embedding expressions
                                                                               // Supports multi-line strings without \n

// Destructuring - extract values from arrays or properties from objects
let [first, second, ...rest] = [1, 2, 3, 4, 5];  // Array destructuring
                                                // first = 1, second = 2, rest = [3, 4, 5]
                                                // ...rest is rest parameter syntax for remaining elements

let { title, author, year = 2023 } = { title: "Book", author: "Author" };  // Object destructuring with default value
                                                                          // title = "Book", author = "Author", year = 2023
                                                                          // Default value used if property undefined

// Spread operator - expand iterables into individual elements
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5];           // Spread array elements: [1, 2, 3, 4, 5]
                                      // Useful for array concatenation, cloning, function arguments

let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 };         // Spread object properties: { a: 1, b: 2, c: 3 }
                                      // Useful for object cloning and merging

// Default parameters - provide fallback values for function parameters
function greet2(name = "Guest") {     // Parameter has default value if undefined or omitted
    return `Hello, ${name}!`;         // Makes functions more robust to missing arguments
}

// Arrow functions - concise syntax for function expressions
const multiply = (a, b) => a * b;     // Parentheses around parameters, arrow, expression body
                                     // Implicit return with expression body (no braces)
                                     // More concise than regular function expressions

const square = x => x * x;            // Single parameter can omit parentheses
const greet3 = () => "Hello!";        // Empty parameter list requires parentheses

// Classes - syntactic sugar over prototype-based inheritance
class Animal {                        // class keyword defines class
    constructor(name) {               // constructor method called when creating instances
        this.name = name;             // Initialize instance properties
    }
    
    speak() {                         // Method defined in class body (prototype method)
        return `${this.name} makes a sound`;  // All instances share these methods
    }
}

class Dog extends Animal {            // extends keyword for inheritance
    constructor(name, breed) {
        super(name);                  // super calls parent class constructor
        this.breed = breed;           // Add subclass-specific properties
    }
    
    speak() {                         // Override parent method
        return `${this.name} barks`;  // Method with same name replaces parent version
    }
}

let dog = new Dog("Rex", "German Shepherd");  // Create instance with new operator

// Modules (in browser with type="module" or Node.js)
/*
// Exporting - make variables, functions, classes available to other modules
export const PI = 3.14159;                    // Named export - can export multiple items
export function square(x) { return x * x; }   // Function export
export default class Person { ... }           // Default export - main export of module

// Importing - use exports from other modules
import { PI, square } from './math.js';       // Named imports - curly braces required
import Person from './person.js';             // Default import - no curly braces
import * as utils from './utils.js';          // Namespace import - all exports as properties
*/

// Optional chaining - safely access nested properties without error
let deepObject = { a: { b: { c: 42 } } };
let value = deepObject?.a?.b?.c;      // ?. returns undefined if any property in chain is null/undefined
                                     // Without optional chaining: deepObject.a.b.c throws error if a or b is null/undefined
                                     // Introduced in ES2020

// Nullish coalescing - provide default for null/undefined only
let text = null;
let displayText = text ?? "Default text";  // ?? returns right side only if left side is null or undefined
                                          // Different from || which returns right side for all falsy values (0, "", false, etc.)
                                          // Introduced in ES2020
















//










