// ======================================================
//  JAVASCRIPT FUNDAMENTALS NOTES
// ======================================================

// =========================
//  1. JAVASCRIPT INTRODUCTION
// =========================

// JavaScript is a high-level, interpreted programming language primarily used for web development
// It allows you to implement complex features on web pages and make them interactive
// JavaScript is one of the core technologies of the web, alongside HTML and CSS

// Including JavaScript in HTML:
// 1. Internal JavaScript:
/*
<script>
    // JavaScript code here
</script>
*/

// 2. External JavaScript:
/*
<script src="script.js"></script>
*/

// =========================
//  2. VARIABLES & DATA TYPES
// =========================

// Variable declarations
var oldVariable = "This is the older way to declare variables"; // Function-scoped, can be redeclared
let modernVariable = "Modern variable declaration"; // Block-scoped
const constant = "Cannot be reassigned"; // Block-scoped constant

// Data Types

// Primitive types
let string = "This is a string"; // String
let number = 42; // Number
let decimal = 42.5; // Also a number
let boolean = true; // Boolean (true or false)
let nullValue = null; // Null (explicit absence of value)
let undefinedValue; // Undefined (variable declared but not assigned)
let bigInt = 9007199254740991n; // BigInt for large integers
let symbol = Symbol("unique"); // Symbol (unique and immutable)

// Complex types
let array = [1, 2, 3, "four", true]; // Array
let object = { name: "John", age: 30 }; // Object
let functionVar = function() { return "Hello"; }; // Function

// Type checking
console.log(typeof string); // 'string'
console.log(typeof number); // 'number'
console.log(typeof object); // 'object'
console.log(Array.isArray(array)); // true - special check for arrays

// Type conversion
let numString = "42";
let convertedNum = Number(numString); // String to number
let strFromNum = String(convertedNum); // Number to string
let boolFromNum = Boolean(convertedNum); // Number to boolean (0 is false, all other numbers are true)

// =========================
//  3. OPERATORS
// =========================

// Arithmetic operators
let sum = 10 + 5; // Addition
let difference = 10 - 5; // Subtraction
let product = 10 * 5; // Multiplication
let quotient = 10 / 5; // Division
let remainder = 10 % 3; // Modulus (remainder)
let exponent = 10 ** 2; // Exponentiation (10 squared)

// Increment/Decrement
let counter = 0;
counter++; // Increment by 1
counter--; // Decrement by 1

// Assignment operators
let x = 10;
x += 5; // Same as: x = x + 5;
x -= 5; // Same as: x = x - 5;
x *= 2; // Same as: x = x * 2;
x /= 2; // Same as: x = x / 2;
x %= 3; // Same as: x = x % 3;

// Comparison operators
let isEqual = 10 == "10"; // Equal in value (true)
let isStrictEqual = 10 === "10"; // Equal in value and type (false)
let isNotEqual = 10 != 5; // Not equal (true)
let isStrictNotEqual = 10 !== "10"; // Not equal in value or type (true)
let isGreater = 10 > 5; // Greater than
let isLess = 5 < 10; // Less than
let isGreaterOrEqual = 10 >= 10; // Greater than or equal
let isLessOrEqual = 5 <= 10; // Less than or equal

// Logical operators
let and = true && false; // Logical AND (false)
let or = true || false; // Logical OR (true)
let not = !true; // Logical NOT (false)

// String operators
let firstNameEx = "John";
let lastNameEx = "Doe";
let fullName = firstNameEx + " " + lastNameEx; // String concatenation
let template = `${firstNameEx} ${lastNameEx}`; // Template literals (ES6)

// =========================
//  4. CONTROL FLOW
// =========================

// If statement
let age = 18;
if (age >= 18) {
    console.log("You are an adult");
} else if (age >= 13) {
    console.log("You are a teenager");
} else {
    console.log("You are a child");
}

// Ternary operator
let status = age >= 18 ? "Adult" : "Minor";

// Switch statement
let day = "Monday";
switch (day) {
    case "Monday":
        console.log("Start of work week");
        break;
    case "Friday":
        console.log("End of work week");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Weekend!");
        break;
    default:
        console.log("Midweek");
}

// =========================
//  5. LOOPS
// =========================

// For loop
for (let i = 0; i < 5; i++) {
    console.log(`Iteration ${i}`);
}

// While loop
let count = 0;
while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}

// Do-while loop (executes at least once)
let counter2 = 0;
do {
    console.log(`Number: ${counter2}`);
    counter2++;
} while (counter2 < 5);

// For...of loop (for iterables like arrays)
let colors = ["red", "green", "blue"];
for (let color of colors) {
    console.log(color);
}

// For...in loop (for object properties)
let person = { name: "John", age: 30, job: "Developer" };
for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}

// Breaking and continuing
for (let i = 0; i < 10; i++) {
    if (i === 3) continue; // Skip this iteration
    if (i === 8) break; // Exit the loop
    console.log(i);
}

// =========================
//  6. FUNCTIONS
// =========================

// Function declaration
function greet(name) {
    return `Hello, ${name}!`;
}

// Function expression
const sayHello = function(name) {
    return `Hello, ${name}!`;
};

// Arrow function (ES6)
const greetArrow = (name) => `Hello, ${name}!`;

// Default parameters
function greetWithDefault(name = "Guest") {
    return `Hello, ${name}!`;
}

// Rest parameters
function sum(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Function scope
let globalVar = "I'm global";
function testScope() {
    let localVar = "I'm local";
    console.log(globalVar); // Accessible
    console.log(localVar); // Accessible
}
// console.log(localVar); // Error: localVar is not defined

// Immediately Invoked Function Expression (IIFE)
(function() {
    let privateVar = "I'm private";
    console.log("This runs immediately!");
})();

// Callback functions
function processUserInput(callback) {
    let name = "John"; // In real case, this might come from user input
    callback(name);
}

processUserInput(function(name) {
    console.log(`Hello, ${name}`);
});

// =========================
//  7. ARRAYS
// =========================

// Creating arrays
let fruits = ["Apple", "Banana", "Orange"];
let mixed = [1, "two", true, null, {name: "object"}, [1, 2]];
let arrayConstructor = new Array(1, 2, 3);

// Accessing elements
let firstFruit = fruits[0]; // "Apple"
let lastFruit = fruits[fruits.length - 1]; // "Orange"

// Array methods
fruits.push("Mango"); // Add to end
fruits.pop(); // Remove from end
fruits.unshift("Strawberry"); // Add to beginning
fruits.shift(); // Remove from beginning
fruits.splice(1, 1, "Pear"); // Remove 1 element at index 1 and insert "Pear"
let newFruits = fruits.slice(1, 3); // Copy elements from index 1 to 2 (3 non-inclusive)
let combined = fruits.concat(["Kiwi", "Peach"]); // Combine arrays
let joinedString = fruits.join(", "); // Join array elements into string
let index = fruits.indexOf("Banana"); // Find element index

// Iterating over arrays
fruits.forEach(function(fruit) {
    console.log(fruit);
});

// Map, filter, reduce
let numbers = [1, 2, 3, 4, 5];

// Map - transform each element
let doubled = numbers.map(num => num * 2); // [2, 4, 6, 8, 10]

// Filter - create new array with elements that pass test
let evens = numbers.filter(num => num % 2 === 0); // [2, 4]

// Reduce - reduce array to single value
let sum2 = numbers.reduce((total, num) => total + num, 0); // 15

// Sort
let sortedNumbers = [5, 2, 8, 1].sort((a, b) => a - b); // [1, 2, 5, 8]

// =========================
//  8. OBJECTS
// =========================

// Creating objects
let user = {
    firstName: "John",
    lastName: "Doe",
    age: 30,
    email: "john@example.com",
    isAdmin: false,
    address: {
        street: "123 Main St",
        city: "Anytown"
    },
    greet: function() {
        return `Hello, I'm ${this.firstName}`;
    }
};

// Accessing properties
console.log(user.firstName); // Dot notation
console.log(user["lastName"]); // Bracket notation

// Adding/modifying properties
user.phone = "123-456-7890"; // Add new property
user.age = 31; // Modify existing property

// Deleting properties
delete user.isAdmin;

// Object methods
console.log(user.greet()); // Method call
console.log(Object.keys(user)); // Get array of property names
console.log(Object.values(user)); // Get array of values
console.log(Object.entries(user)); // Get array of [key, value] pairs

// Object destructuring
let { firstName: fName, lastName: lName, age: userAge } = user; // Extract properties (with rename)

// Spread operator
let clonedUser = { ...user }; // Shallow copy
let extendedUser = { ...user, role: "editor" }; // Copy and add property

// Object constructor
function Person(name, age) {
    this.name = name;
    this.age = age;
    this.greet = function() {
        return `Hello, I'm ${this.name}`;
    };
}

let john = new Person("John", 30);

// =========================
//  9. ERROR HANDLING
// =========================

// Try...catch statement
try {
    // Code that may throw an error
    let result = nonExistentFunction();
} catch (error) {
    console.error("An error occurred:", error.message);
} finally {
    console.log("This always executes");
}

// Throwing errors
function divide(a, b) {
    if (b === 0) {
        throw new Error("Division by zero");
    }
    return a / b;
}

// Custom errors
class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "ValidationError";
    }
}

// =========================
//  10. ASYNCHRONOUS JAVASCRIPT
// =========================

// Callbacks
function fetchData(callback) {
    setTimeout(() => {
        callback("Data received");
    }, 1000);
}

fetchData(function(data) {
    console.log(data);
});

// Promises
let promise = new Promise((resolve, reject) => {
    let success = true;
    if (success) {
        resolve("Operation successful");
    } else {
        reject("Operation failed");
    }
});

promise
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Chaining promises
fetch('https://api.example.com/data')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));

// Async/await
async function fetchUserData() {
    try {
        let response = await fetch('https://api.example.com/user');
        let userData = await response.json();
        return userData;
    } catch (error) {
        console.error('Error:', error);
    }
}

// =========================
//  11. ES6+ FEATURES
// =========================

// Let and const (block-scoped variables)
{
    var varVariable = "var"; // Function-scoped
    let letVariable = "let"; // Block-scoped
    const constVariable = "const"; // Block-scoped, cannot be reassigned
}
console.log(varVariable); // "var"
// console.log(letVariable); // Error: letVariable is not defined

// Template literals
let name = "Alice";
let greeting = `Hello, ${name}! Today is ${new Date().toLocaleDateString()}.`;

// Destructuring
let [first, second, ...rest] = [1, 2, 3, 4, 5]; // Array destructuring
let { title, author, year = 2023 } = { title: "Book", author: "Author" }; // Object destructuring with default

// Spread operator
let arr1 = [1, 2, 3];
let arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
let obj1 = { a: 1, b: 2 };
let obj2 = { ...obj1, c: 3 }; // { a: 1, b: 2, c: 3 }

// Default parameters
function greet2(name = "Guest") {
    return `Hello, ${name}!`;
}

// Arrow functions
const multiply = (a, b) => a * b;
const square = x => x * x; // Single parameter
const greet3 = () => "Hello!"; // No parameters

// Classes
class Animal {
    constructor(name) {
        this.name = name;
    }
    
    speak() {
        return `${this.name} makes a sound`;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
    
    speak() {
        return `${this.name} barks`;
    }
}

let dog = new Dog("Rex", "German Shepherd");

// Modules (in browser with type="module" or Node.js)
/*
// Exporting
export const PI = 3.14159;
export function square(x) { return x * x; }
export default class Person { ... }

// Importing
import { PI, square } from './math.js';
import Person from './person.js';
import * as utils from './utils.js';
*/

// Optional chaining
let deepObject = { a: { b: { c: 42 } } };
let value = deepObject?.a?.b?.c; // 42 (no error if any property is undefined)

// Nullish coalescing
let text = null;
let displayText = text ?? "Default text"; // "Default text" (uses default if null or undefined)
















//










