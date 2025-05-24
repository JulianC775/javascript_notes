//--------------------------------------------------------------------------------
//|                      TYPESCRIPT & REACT NATIVE (TSX) NOTES                    |
//--------------------------------------------------------------------------------
//| Intermediate Level with Emphasis on Mobile App Development (React Native with Expo) |
//--------------------------------------------------------------------------------

// NOTE FOR EXAMPLES IN THIS DOCUMENT:
// - Vanilla TypeScript examples can often be tested directly in a TypeScript playground (e.g., typescriptlang.org/play) or compiled with `tsc`.
// - React Native (TSX) component examples are intended to be used within an Expo or React Native project.
//   You would typically create a new .tsx file in your project (e.g., MyComponent.tsx),
//   paste the component code, import necessary modules (like React, View, Text from 'react-native'),
//   and then import and render your component in App.tsx or another screen.
// - This notes file itself, containing multiple component definitions and examples, is not meant to be compiled as a single application.

//================================================================================
// I. INTRODUCTION TO TYPESCRIPT
//================================================================================

// 1. What is TypeScript?
//    - TypeScript is a free and open-source programming language developed and maintained by Microsoft.
//    - It is a strict syntactical superset of JavaScript. This means that any valid JavaScript code is also valid TypeScript code.
//    - TypeScript adds optional static typing to JavaScript.
//    - Browsers and Node.js cannot execute TypeScript directly. It needs to be compiled (transpiled) into plain JavaScript first.
//      The TypeScript compiler (`tsc`) performs this transpilation and also checks for type errors.

// 2. Why use TypeScript?
//    - Static Typing: Catch errors during development (at compile time) rather than at runtime.
//      // Example: JavaScript might allow `let x = 5; x = "hello";`
//      // TypeScript would flag `x = "hello";` as an error if `x` was declared as `let x: number = 5;`
//    - Improved Code Readability and Maintainability: Types make code easier to understand and refactor.
//    - Better Tooling: Enhanced autocompletion, type checking, and refactoring capabilities in code editors (like VS Code).
//    - Scalability: Helps manage large codebases by providing structure and preventing common errors.
//    - Rich Configuration: `tsconfig.json` allows fine-grained control over the compiler options.

// 3. Relationship to JavaScript (ES5, ES6/ES2015+)
//    - TypeScript can compile down to various versions of JavaScript (e.g., ES5, ES6, ES2017, etc.), making it compatible with older browsers/environments.
//    - It often supports newer JavaScript features before they are widely available, transpiling them to older compatible syntax.

//================================================================================
// II. SETTING UP TYPESCRIPT FOR REACT NATIVE (EXPO)
//================================================================================

// 1. Expo and TypeScript
//    - Expo has excellent built-in support for TypeScript.
//    - When creating a new Expo project, you can often choose a TypeScript template:
//      // `npx create-expo-app MyTSApp -t expo-template-tabs-typescript` (example with tabs template)
//      // Or, if you created a JS project, you can add TypeScript manually.

// 2. `tsconfig.json`
//    - This file is the heart of a TypeScript project. It specifies:
//        - The root files and compiler options required to compile the project.
//        - Compiler Options (`compilerOptions`):
//            - `target`: Specifies the ECMAScript target version (e.g., "es5", "es6", "esnext").
//            - `module`: Specifies module code generation (e.g., "commonjs", "esnext").
//            - `jsx`: Crucial for React/React Native. Usually set to "react-native" or "preserve".
//                     Expo typically configures this as "react-native".
//            - `lib`: List of library files to be included in the compilation (e.g., ["dom", "esnext"]).
//            - `allowJs`: Allows JavaScript files to be compiled.
//            - `skipLibCheck`: Skips type checking of all declaration files (`*.d.ts`).
//            - `strict`: Enables all strict type-checking options (highly recommended: `true`).
//              Includes `noImplicitAny`, `strictNullChecks`, `strictFunctionTypes`, etc.
//            - `baseUrl` & `paths`: For setting up module path aliases.
//            - `esModuleInterop`: Enables interoperability between CommonJS and ES modules.
//            - `resolveJsonModule`: Allows importing .json files.
//    - Expo projects usually come with a pre-configured `tsconfig.json`.

// Example snippet from a typical Expo tsconfig.json:
/*
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"], // Example path alias
    }
  },
  "include": [
    "** /*.ts",
    "** /*.tsx",
    ".expo/types/** /*.ts",
    "expo-env.d.ts"
  ]
}
*/

// 3. Declaration Files (`.d.ts`)
//    - TypeScript uses declaration files to provide type information for JavaScript libraries that don't have built-in types.
//    - Many popular libraries have community-maintained type definitions available through the `@types/` scope on npm
//      (e.g., `npm install @types/react @types/react-native`).
//    - Expo usually handles these for core React Native and Expo SDK packages.
//    - You can also write your own `.d.ts` files for untyped JavaScript code or to describe the shape of global variables.

//================================================================================
// III. CORE TYPESCRIPT CONCEPTS
//================================================================================

// 1. Basic Types (Primitives)
//    - `boolean`: Represents `true` or `false`.
let isActive: boolean = true;
let isEnabled = false; // Type inference: boolean

//    - `number`: Represents all numbers (integer and floating-point).
let age: number = 30;
let price: number = 19.99;
let quantity = 100; // Type inference: number

//    - `string`: Represents textual data (single or double quotes, or backticks for template literals).
let firstName: string = "Alice";
let message: string = `Hello, ${firstName}!`;
let lastName = 'Smith'; // Type inference: string

// 2. Arrays
//    - `type[]` or `Array<type>`
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Bob", "Charlie"];
let mixed = [1, "two", true]; // Type inference: (string | number | boolean)[]

// 3. Tuples
//    - Arrays with a fixed number of elements whose types are known, but need not be the same.
let userProfile: [string, number, boolean];
userProfile = ["Alice", 30, true];
// userProfile = [30, "Alice", true]; // Error: Type mismatch
// userProfile = ["Alice", 30];       // Error: Incorrect number of elements

console.log("Tuple example:", userProfile[0]); // Alice

// 4. `enum` (Enumerations)
//    - A way of giving more friendly names to sets of numeric or string values.
//    - Numeric enums (default, auto-incrementing from 0)
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}
let currentDirection: Direction = Direction.Up;
console.log("Numeric Enum:", currentDirection, Direction.Right); // 0, 3

//    - Initialized numeric enums
enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}
let responseStatus: HttpStatus = HttpStatus.OK;
console.log("Initialized Enum:", responseStatus); // 200

//    - String enums (each member must be constant-initialized with a string literal)
enum LogLevel {
    INFO = "INFO",
    WARN = "WARNING",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
let appLogLevel: LogLevel = LogLevel.INFO;
console.log("String Enum:", appLogLevel); // "INFO"

// 5. `any`
//    - Represents any kind of value. Use sparingly as it opts out of type checking for that variable.
//    - Useful when you don't know the type of a value (e.g., from a dynamic source or third-party library without types).
let dynamicValue: any = 4;
dynamicValue = "Now I am a string";
dynamicValue = { key: "value" };
// No type checking errors for dynamicValue, but you lose type safety.

// 6. `unknown`
//    - A type-safe counterpart of `any`.
//    - You can assign any value to `unknown`, but you can't operate on an `unknown` value without first performing a type check or assertion.
let mysteryValue: unknown = "I could be anything";
// mysteryValue.toUpperCase(); // Error: Object is of type 'unknown'.
if (typeof mysteryValue === 'string') {
    console.log("Unknown as string:", mysteryValue.toUpperCase()); // OK, type guard
}

// 7. `void`
//    - Represents the absence of any type. Typically used as the return type of functions that do not return a value.
function logMessage(message: string): void {
    console.log(message);
    // No return statement, or `return;` or `return undefined;`
}
logMessage("This function returns void.");

// 8. `null` and `undefined`
//    - In TypeScript, `null` and `undefined` are their own types.
//    - By default (if `strictNullChecks` is off in tsconfig.json), `null` and `undefined` can be assigned to any type.
//    - With `strictNullChecks: true` (recommended), `null` and `undefined` can only be assigned to `any`, `unknown`, or their respective types.
//      You must explicitly indicate if a type can be `null` or `undefined` using a union type.
let nullableString: string | null = "Hello";
nullableString = null;
// nullableString = undefined; // Error if undefined is not part of the union

let undefinedValue: number | undefined;
undefinedValue = 100;
undefinedValue = undefined;

// 9. `never`
//    - Represents the type of values that never occur.
//    - Used for functions that never return (e.g., always throw an exception or have an infinite loop) or variables in impossible states.
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}

// 10. Object Types
//     - TypeScript uses interfaces or type aliases to define the shape of objects.
//     - Inline object type definition:
let person: { name: string; age: number; isStudent?: boolean }; // isStudent is optional
person = { name: "David", age: 25 };
person = { name: "Eve", age: 22, isStudent: true };
console.log("Person object:", person);

//================================================================================
// IV. TYPE ASSERTIONS (TYPE CASTING)
//================================================================================

// - Sometimes you'll have more information about the type of a value than TypeScript does.
// - Type assertions are like type casts in other languages but perform no special checking or restructuring of data.
// - They have no runtime impact and are purely used by the compiler.
// - Two syntaxes: `as` keyword (preferred with JSX) or angle-bracket syntax.

let someValue: any = "this is a string";

// Angle-bracket syntax (less common in .tsx files due to conflict with JSX tags)
// let strLength: number = (<string>someValue).length;

// `as` syntax (recommended, especially in .tsx files)
let strLengthAs: number = (someValue as string).length;
console.log("String length via 'as':", strLengthAs);

// Example with DOM elements (more relevant for web, but illustrates the concept)
// const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
// if (myCanvas) {
//   const context = myCanvas.getContext("2d");
// }

// Note: Be careful with type assertions. If you assert a type that is incorrect, it can lead to runtime errors.

//================================================================================
// V. FUNCTIONS IN TYPESCRIPT
//================================================================================

// 1. Typed Parameters and Return Types
function add(x: number, y: number): number {
    return x + y;
}
let sum: number = add(5, 3);
console.log("Sum from typed function:", sum);

// Anonymous function with types
const multiply = function(a: number, b: number): number {
    return a * b;
};
console.log("Product:", multiply(4, 5));

// Arrow function with types
const subtract = (a: number, b: number): number => {
    return a - b;
};
console.log("Difference:", subtract(10, 4));

// 2. Optional Parameters
//    - Add a `?` after the parameter name.
//    - Optional parameters must come after required parameters.
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}
console.log(greet("Alice"));                // Hello, Alice!
console.log(greet("Bob", "Good morning")); // Good morning, Bob!

// 3. Default Parameter Values
//    - If a parameter has a default value, it becomes optional.
//    - TypeScript infers the type from the default value.
function power(base: number, exponent: number = 2): number {
    return Math.pow(base, exponent);
}
console.log("Power (default exponent):", power(3));    // 9 (3^2)
console.log("Power (specified exponent):", power(2, 5)); // 32 (2^5)

// 4. Rest Parameters
//    - Allows a function to accept an indefinite number of arguments as an array.
//    - Must be the last parameter in the function signature.
function sumAll(...numbers: number[]): number {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}
console.log("Sum of 1,2,3:", sumAll(1, 2, 3));         // 6
console.log("Sum of 10,20,30,40:", sumAll(10, 20, 30, 40)); // 100

// 5. Function Types (Defining the shape of a function)
//    - Describes the parameters and return type of a function.
let myAddFunction: (x: number, y: number) => number;

myAddFunction = function(num1: number, num2: number): number {
    return num1 + num2;
};
// myAddFunction = function(s1: string, s2: string): string { return s1+s2; }; // Error: Type mismatch
console.log("Using function type variable:", myAddFunction(7, 8));

// Can also be used with type aliases (see later)

// 6. `this` and Arrow Functions
//    - In regular JavaScript functions, `this` can be tricky and its value depends on how the function is called.
//    - Arrow functions do not have their own `this` binding. They capture the `this` value of the enclosing lexical context.
//    - This behavior is particularly useful in classes and for callbacks.

class Handler {
    info: string = "Event handled";
    onClickBad(this: Handler, e: Event) {
        // `this` here can be problematic if not bound correctly or if called from a different context
        // console.log(this.info); // `this` might be undefined or window in some JS scenarios
    }
    onClickGood = (e?: any) => {
        // Arrow function captures `this` from the Handler instance
        console.log("Arrow function 'this':", this.info);
    }
}
let h = new Handler();
h.onClickGood(); // `this` correctly refers to `h` instance

// In React Native, arrow functions are commonly used for event handlers to ensure `this` refers to the component instance.

//================================================================================
// VI. INTERFACES
//================================================================================

// 1. What is an Interface?
//    - A way to define a "contract" for the shape of an object or a class.
//    - Focuses on *what* an object should have, not *how* it's implemented.
//    - Can describe the structure of objects, function types, and class implementations.

// 2. Describing Object Shapes
interface User {
    id: number;
    username: string;
    email: string;
    isAdmin?: boolean; // Optional property
    readonly apiKey: string; // Readonly property (can only be set during initialization)
}

let user1: User = {
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    apiKey: "ABC123XYZ"
};

// user1.apiKey = "newKey"; // Error: Cannot assign to 'apiKey' because it is a read-only property.
user1.isAdmin = true;
console.log("User Interface example:", user1);

function displayUser(user: User): void {
    console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
    if (user.isAdmin) {
        console.log("User is an admin.");
    }
}
displayUser(user1);

// 3. Optional Properties (`?`)
//    - Properties marked with `?` do not have to be present on objects of that type.

// 4. Readonly Properties (`readonly`)
//    - Properties that cannot be changed after an object is first created.

// 5. Function Types in Interfaces
interface SearchFunction {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunction;
mySearch = function(src, sub) { // Parameter names don't have to match
    return src.search(sub) > -1;
};
console.log("Search function interface:", mySearch("hello world", "world")); // true

// 6. Indexable Types (Describing objects that can be indexed, like arrays or dictionaries)
interface StringArray {
    [index: number]: string; // Index signature for numeric index returning string
}
let myArray: StringArray = ["Apple", "Banana"];
console.log("StringArray example:", myArray[0]);

interface Dictionary {
    [key: string]: any; // Index signature for string key returning any value
    length: number; // Can have other properties, but they must conform to index signature if string
}
let myDict: Dictionary = { "name": "Config", "value": 100, length: 2 };
console.log("Dictionary example:", myDict["name"]);

// 7. Class Types (Implementing an Interface)
//    - Interfaces can be implemented by classes to ensure the class adheres to the contract.
interface ClockInterface {
    currentTime: Date;
    setTime(d: Date): void;
}

class DigitalClock implements ClockInterface {
    currentTime: Date = new Date();
    setTime(d: Date) {
        this.currentTime = d;
    }
    constructor(h: number, m: number) { /* ... */ }
}

// 8. Extending Interfaces
//    - Interfaces can extend other interfaces, inheriting their members.
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let mySquare: Square = { color: "blue", sideLength: 10 };
console.log("Extended interface example:", mySquare);

// 9. Hybrid Types (Objects that act as both a function and an object with additional properties)
interface Counter {
    (start: number): string; // Call signature (function part)
    interval: number;         // Property part
    reset(): void;            // Method part
}

function getCounter(): Counter {
    let counter = ((start: number) => `Started at ${start}`) as Counter;
    counter.interval = 123;
    counter.reset = () => { console.log("Counter reset"); };
    return counter;
}

let c = getCounter();
console.log(c(10));      // Started at 10
console.log(c.interval); // 123
c.reset();             // Counter reset

//================================================================================
// VII. CLASSES IN TYPESCRIPT
//================================================================================

// 1. Basic Class Definition
class Greeter {
    // Properties (member variables)
    greeting: string;

    // Constructor
    constructor(message: string) {
        this.greeting = message;
    }

    // Methods
    greet(): string {
        return "Hello, " + this.greeting;
    }
}

let greeterInstance = new Greeter("world");
console.log("Class instance greeting:", greeterInstance.greet()); // Hello, world

// 2. Inheritance
//    - Using the `extends` keyword.
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName; }
    move(distanceInMeters: number = 0) {
        console.log(`${this.name} moved ${distanceInMeters}m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super(name); } // Call superclass constructor
    move(distanceInMeters = 5) { // Override method
        console.log("Slithering...");
        super.move(distanceInMeters); // Call superclass method
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name); }
    move(distanceInMeters = 45) {
        console.log("Galloping...");
        super.move(distanceInMeters);
    }
}

let sam = new Snake("Sammy the Python");
let tom: Animal = new Horse("Tommy the Palomino"); // Polymorphism

sam.move();
tom.move(34);

// 3. Access Modifiers (Control visibility of class members)
//    - `public` (default): Members are accessible from anywhere.
//    - `private`: Members are only accessible within the defining class.
//    - `protected`: Members are accessible within the defining class and by instances of derived classes (subclasses).

class Person {
    public name: string; // Explicitly public
    private age: number;
    protected id: string;

    constructor(name: string, age: number, id: string) {
        this.name = name;
        this.age = age;
        this.id = id;
    }

    public getDetails(): string {
        return `Name: ${this.name}, Age: ${this.age}`; // Can access private age within the class
    }

    private getSecretId(): string {
        return this.id + "_secret";
    }
}

class Employee extends Person {
    department: string;

    constructor(name: string, age: number, id: string, department: string) {
        super(name, age, id);
        this.department = department;
    }

    public getEmployeeDetails(): string {
        // this.age; // Error: 'age' is private and only accessible within class 'Person'.
        return `Name: ${this.name}, Department: ${this.department}, ID (protected): ${this.id}`;
    }
}

let personObj = new Person("Alice", 30, "P123");
console.log(personObj.name); // Alice (public)
// console.log(personObj.age); // Error: 'age' is private.
console.log(personObj.getDetails());

let empObj = new Employee("Bob", 40, "E456", "Engineering");
console.log(empObj.getEmployeeDetails());

// 4. Readonly Modifier (`readonly`)
//    - Properties marked `readonly` can only be set in their declaration or in the constructor.
class Octopus {
    readonly name: string;
    readonly numberOfLegs: number = 8;
    constructor(theName: string) {
        this.name = theName;
    }
    // setName(newName: string) {
    //     this.name = newName; // Error: Cannot assign to 'name' because it is a read-only property.
    // }
}
let dad = new Octopus("Man with the 8 strong legs");
// dad.name = "New Name"; // Error
console.log("Readonly example:", dad.name);

// 5. Parameter Properties (Shorthand for declaring and initializing members in constructor)
class Student {
    // `public readonly name: string;` and `this.name = name;` are done automatically.
    constructor(public readonly id: number, public name: string, private major: string) {}

    getMajor(): string {
        return this.major;
    }
}
let student = new Student(101, "Carol", "Computer Science");
console.log(`Student: ${student.name} (ID: ${student.id}), Major: ${student.getMajor()}`);

// 6. Static Properties and Methods
//    - Members that belong to the class itself, not to instances of the class.
//    - Accessed using `ClassName.memberName`.
class Grid {
    static origin = { x: 0, y: 0 };
    scale: number;

    constructor(scale: number) {
        this.scale = scale;
    }

    calculateDistanceFromOrigin(point: { x: number; y: number; }): number {
        let xDist = (point.x - Grid.origin.x);
        let yDist = (point.y - Grid.origin.y);
        return Math.sqrt(xDist * xDist + yDist * yDist) / this.scale;
    }

    static createDefaultGrid(): Grid {
        return new Grid(1.0);
    }
}

let grid1 = new Grid(1.0);
let grid2 = new Grid(5.0);
console.log("Static origin:", Grid.origin);
console.log("Distance (grid1):", grid1.calculateDistanceFromOrigin({ x: 10, y: 10 }));
let defaultGrid = Grid.createDefaultGrid();
console.log("Default grid scale:", defaultGrid.scale);

// 7. Abstract Classes and Methods
//    - Abstract classes cannot be instantiated directly.
//    - They may contain abstract methods (methods without an implementation) that must be implemented by derived classes.
abstract class Department {
    constructor(public name: string) {}

    printName(): void {
        console.log("Department name: " + this.name);
    }

    abstract printMeeting(): void; // Must be implemented in derived class
}

class AccountingDepartment extends Department {
    constructor() {
        super("Accounting and Auditing"); // constructors in derived classes must call super()
    }

    printMeeting(): void {
        console.log("The Accounting Department meets each Monday at 10am.");
    }

    generateReports(): void {
        console.log("Generating accounting reports...");
    }
}

let department: Department; // OK to create a reference to an abstract type
// department = new Department("Abstract"); // Error: Cannot create an instance of an abstract class.
department = new AccountingDepartment();
department.printName();
department.printMeeting();
// department.generateReports(); // Error: Method doesn't exist on Department abstract type. Need to cast or use specific type.
if (department instanceof AccountingDepartment) {
    department.generateReports();
}

//================================================================================
// VIII. ENUMS (Revisited - More Detail)
//================================================================================

// (Covered basic enums earlier, can add more details if needed like computed members, reverse mappings for numeric enums)

// Reverse mapping for numeric enums:
console.log("Direction[0]:", Direction[0]); // "Up"

//================================================================================
// IX. GENERICS
//================================================================================

// 1. What are Generics?
//    - Allow you to write reusable code components (functions, classes, interfaces) that can work over a variety of types
//      rather than a single one, while still maintaining type safety.

// 2. Generic Functions
//    - `T` is a type variable, a placeholder for the actual type.
function identity<T>(arg: T): T {
    return arg;
}

let outputString = identity<string>("myString"); // Explicitly set T to string
let outputNumber = identity(100); // Type inference: T becomes number
console.log("Generic function (string):", outputString);
console.log("Generic function (number):", outputNumber);

function loggingIdentity<T>(arg: T[]): T[] {
    console.log("Array length:", arg.length); // We know arg is an array, so .length is fine
    return arg;
}
loggingIdentity([1,2,3]);

// 3. Generic Interfaces
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myGenericIdentity: GenericIdentityFn<number> = identity; // identity function matches this interface for number
console.log("Generic interface usage:", myGenericIdentity(99));

// 4. Generic Classes
class GenericNumber<T> {
    zeroValue: T | undefined;
    add: ((x: T, y: T) => T) | undefined;
    // Note: Cannot directly use arithmetic operators on generic type T unless constrained.
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
console.log("Generic class add:", myGenericNumber.add(5, 10));

let stringGeneric = new GenericNumber<string>();
stringGeneric.zeroValue = "";
stringGeneric.add = (x, y) => x + y;
console.log("Generic class concat:", stringGeneric.add("hello ", "world"));

// 5. Generic Constraints
//    - Limit the types that can be used with a generic type variable.
interface Lengthwise {
    length: number;
}

function loggingIdentityWithConstraint<T extends Lengthwise>(arg: T): T {
    console.log("Constrained generic, length:", arg.length); // Now we know .length exists
    return arg;
}

loggingIdentityWithConstraint("hello"); // String has length
loggingIdentityWithConstraint([1, 2, 3]); // Array has length
loggingIdentityWithConstraint({ length: 10, value: 3 }); // Object with length property
// loggingIdentityWithConstraint(123); // Error: number does not have a 'length' property.

// 6. Using Type Parameters in Generic Constraints
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let objX = { a: 1, b: "hello", c: true };
let valA = getProperty(objX, "a"); // number
let valB = getProperty(objX, "b"); // string
// let valD = getProperty(objX, "d"); // Error: Argument of type '"d"' is not assignable to parameter of type '"a" | "b" | "c"'.
console.log("getProperty generic:", valA, valB);

//================================================================================
// X. ADVANCED TYPES (Selection for Intermediate)
//================================================================================

// 1. Type Aliases
//    - Create a new name for a type. Does not create a new distinct type.
//    - Useful for more readable code, especially with complex types like unions or tuples.
type Point = {
    x: number;
    y: number;
};
type ID = string | number;

let p1: Point = { x: 10, y: 20 };
let userId: ID = "user123";
userId = 456;

// Type alias for a function type
type GreetFunction = (name: string) => void;
const greetUser: GreetFunction = (name) => console.log(`Hello, ${name}`);
greetUser("Type Alias Func");

// 2. Union Types (`|`)
//    - Allows a variable to be one of several types.
function printId(id: string | number) {
    console.log("ID: " + id);
    if (typeof id === "string") {
        // TypeScript knows id is a string here
        console.log(id.toUpperCase());
    }
}
printId(101);
printId("abc");

// 3. Intersection Types (`&`)
//    - Combines multiple types into one. The new type has all members of all types.
interface Draggable {
    drag: () => void;
}

interface Resizable {
    resize: () => void;
}

type UIWidget = Draggable & Resizable; // Must have both drag and resize methods

let widget: UIWidget = {
    drag: () => console.log("Dragging..."),
    resize: () => console.log("Resizing...")
};
widget.drag();
widget.resize();

// 4. Literal Types
//    - Allows you to specify the exact value a string, number, or boolean must have.
let specificString: "option1" | "option2" = "option1";
// specificString = "option3"; // Error

type ButtonSize = "small" | "medium" | "large";
let myButtonSize: ButtonSize = "medium";

// 5. `null` and `undefined` in Union Types (with strictNullChecks)
//    (Covered this in basic types, reinforcing its importance)

// 6. Type Guards and Narrowing
//    - `typeof` type guard (for primitives)
//    - `instanceof` type guard (for checking if an object is an instance of a class)
//    - Equality narrowing (`===`, `!==`, `==`, `!=`)
//    - `in` operator guard (checking if an object has a property)

function processValue(value: string | number | Date) {
    if (typeof value === 'string') {
        console.log("Value is string:", value.toUpperCase());
    } else if (typeof value === 'number') {
        console.log("Value is number:", value.toFixed(2));
    } else if (value instanceof Date) {
        console.log("Value is Date:", value.toISOString());
    }
}
processValue("test");
processValue(123.456);
processValue(new Date());

interface Bird {
    fly(): void;
    layEggs(): void;
}
interface Fish {
    swim(): void;
    layEggs(): void;
}
function getPet(): Bird | Fish { /* ... */ return { fly: () => {}, layEggs: () => {} } as Bird; }
let pet = getPet();
// if (pet.fly) { ... } // Error: Property 'fly' does not exist on type 'Fish'.
if ("fly" in pet) { // `in` operator guard
    pet.fly();
} else {
    pet.swim();
}

// User-Defined Type Guards (functions returning `parameterName is Type`)
function isFish(p: Bird | Fish): p is Fish { // Type predicate
    return (p as Fish).swim !== undefined;
}
if (isFish(pet)) {
    pet.swim();
} else {
    pet.fly();
}

// 7. Utility Types (A selection)
//    - `Partial<Type>`: Constructs a type with all properties of Type set to optional.
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}
function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
}
const todo1: Todo = { title: "Learn TS", description: "Study advanced types", completed: false };
const updatedTodo = updateTodo(todo1, { description: "Finish study guide" });
console.log("Partial Utility Type:", updatedTodo);

//    - `Readonly<Type>`: Constructs a type with all properties of Type set to `readonly`.
const readonlyTodo: Readonly<Todo> = { ...todo1 };
// readonlyTodo.title = "New Title"; // Error

//    - `Pick<Type, Keys>`: Constructs a type by picking the set of properties `Keys` from `Type`.
interface UserProfile { id: number; name: string; email: string; bio?: string; }
type UserSummary = Pick<UserProfile, "id" | "name" | "email">;
const summary: UserSummary = { id: 1, name: "Summary User", email: "s@example.com" };

//    - `Omit<Type, Keys>`: Constructs a type by picking all properties from Type and then removing Keys.
type UserEditableFields = Omit<UserProfile, "id">;
// const editable: UserEditableFields = { name: "Edit", email: "e@e.com", bio: "bio" };

//================================================================================
// XI. MODULES IN TYPESCRIPT
//================================================================================

// - Any file containing a top-level `import` or `export` is considered a module.
// - Modules are executed within their own scope, not in the global scope.
// - `export` keyword: Makes variables, functions, classes, or interfaces available to other modules.
// - `import` keyword: Allows you to use exported members from other modules.

// --- In a file named `mathUtils.ts` (example) ---
/*
export const PI = 3.14159;
export function add(a: number, b: number): number {
    return a + b;
}
export interface MathConfig { defaultPrecision: number; }
*/

// --- In another file (e.g., `app.ts` or a .tsx file) ---
/*
import { PI, add as sumNumbers, MathConfig } from './mathUtils'; // Can rename with 'as'
// import * as MathUtils from './mathUtils'; // Import all exports as an object

console.log(PI);
console.log(sumNumbers(5,3));
const config: MathConfig = { defaultPrecision: 2 };
// console.log(MathUtils.PI) // If using import *
*/

// Default Exports
// --- In `myClass.ts` ---
/*
export default class MySpecialClass {
    constructor() { console.log("MySpecialClass instantiated"); }
}
*/
// --- In `app.ts` ---
/*
import MyDefaultExportedClass from './myClass'; // Name can be different
let instance = new MyDefaultExportedClass();
*/

// For React Native, module resolution uses Node.js style (CommonJS usually under the hood with Metro bundler,
// but you write ES6 import/export syntax).

//================================================================================
// XII. TYPESCRIPT WITH REACT & JSX (TSX) - FUNDAMENTALS
//================================================================================

// 1. Why `.tsx` files?
//    - As explained before, `.tsx` extension is required for files that contain JSX syntax.

// 2. Basic Functional Component with TypeScript
import React from 'react'; // Always needed for JSX
// For React Native, you'd import components from 'react-native'
// import { View, Text } from 'react-native';

// Define props type
interface GreetingProps {
    name: string;
    enthusiasmLevel?: number; // Optional prop
}

// `React.FC` (FunctionComponent) is a generic type for functional components.
// It provides type checking for props and (optionally) children.
const Greeting: React.FC<GreetingProps> = (props) => {
    const { name, enthusiasmLevel = 1 } = props; // Destructure props with default for optional

    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    // In a .tsx file, this JSX is understood
    return (
        // In React Native, you would use <View>, <Text>, etc.
        // This is a web example for simplicity here, replace with RN components for app dev.
        React.createElement('div', null, // Simulating JSX for this .ts file, in .tsx it would be <div>
            React.createElement('div', null, `Hello ${name}${'!'.repeat(enthusiasmLevel)}`)
        )
        // Example of what it would look like in a React Native .tsx file:
        // <View>
        //   <Text>Hello {name}{'!'.repeat(enthusiasmLevel)}</Text>
        // </View>
    );
};

// Usage (this would typically be in another component or App.tsx)
// const App = () => {
//     return <Greeting name="TypeScript User" enthusiasmLevel={3} />;
// };

// 3. Typing Props
//    - Always define an interface or type alias for your component's props.
//    - Makes component usage type-safe and self-documenting.

// 4. `children` prop
//    - `React.FC` automatically includes `children?: React.ReactNode` in the props type.
//    - If you don't use `React.FC` or need to be more specific:
interface ContainerProps {
    title: string;
    children: React.ReactNode; // React.ReactNode can be JSX, string, number, null, etc.
}
const Container: React.FC<ContainerProps> = ({ title, children }) => {
    return React.createElement('div', null, 
        React.createElement('h1', null, title),
        children
    );
    // RN Example:
    // <View>
    //   <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
    //   {children}
    // </View>
};

//================================================================================
// XIII. REACT NATIVE COMPONENTS WITH TYPESCRIPT (Specific Examples)
//================================================================================

// Note: The following examples assume you have a React Native project setup.
// They would typically be in their own .tsx files within your project.
// Ensure necessary imports are included when you copy them.

// --- Example: MyButton.tsx ---
import React from 'react'; // Make sure React is imported for JSX
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';

interface MyButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void; // Typed event handler
    color?: string; // Optional color prop
    style?: ViewStyle; // Allow custom styles for the button container
    textStyle?: TextStyle; // Allow custom styles for the text
    disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({ title, onPress, color, style, textStyle, disabled }) => {
    const buttonStyles = [styles_MyButton.button, style]; // Renamed styles to avoid global clashes
    if (color) {
        buttonStyles.push({ backgroundColor: color });
    }
    if (disabled) {
        buttonStyles.push(styles_MyButton.disabledButton);
    }

    const textStylesToApply = [styles_MyButton.text, textStyle];
    if (disabled) {
        textStylesToApply.push(styles_MyButton.disabledText);
    }

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled} activeOpacity={0.7}>
            <Text style={textStylesToApply}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles_MyButton = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff', // Default color
        marginVertical: 5,
    },
    text: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    disabledText: {
        color: '#666666',
    }
});

// To use this component in your app:
// import MyButton from './components/MyButton'; // Adjust path as needed
// <MyButton title="Click Me" onPress={() => console.log("Button pressed")} />


// --- Example: ProfileCard.tsx ---
// import React from 'react'; // Already imported or would be in its own file
import { View, Image, StyleSheet as StyleSheet_ProfileCard, ImageSourcePropType } from 'react-native'; // Renamed StyleSheet
// import { Text } from 'react-native'; // Assuming Text is also needed and imported

interface ProfileCardProps {
    name: string;
    age: number;
    bio?: string;
    avatarSource: ImageSourcePropType; // e.g., require('../assets/avatar.png') or { uri: '...' }
}

const ProfileCard: React.FC<ProfileCardProps> = ({ name, age, bio, avatarSource }) => {
    return (
        <View style={styles_ProfileCard.cardContainer}>
            <Image source={avatarSource} style={styles_ProfileCard.avatar} />
            <Text style={styles_ProfileCard.name}>{name}</Text>
            <Text style={styles_ProfileCard.age}>Age: {age}</Text>
            {bio && <Text style={styles_ProfileCard.bio}>{bio}</Text>}
        </View>
    );
};

const styles_ProfileCard = StyleSheet_ProfileCard.create({
    cardContainer: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // for Android shadow
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    age: {
        fontSize: 16,
        color: 'gray',
    },
    bio: {
        fontSize: 14,
        color: 'darkgray',
        marginTop: 8,
        textAlign: 'center',
    }
});

// To use:
// import ProfileCard from './components/ProfileCard';
// <ProfileCard name="Jane Doe" age={28} avatarSource={require('../assets/icon.png')} bio="Loves coding!" />


//================================================================================
// XIV. STATE MANAGEMENT WITH TYPESCRIPT (`useState`)
//================================================================================

// --- Example: Counter.tsx ---
import { useState } from 'react'; // React already imported
// import { View, Text, Button, StyleSheet as StyleSheet_Counter } from 'react-native'; // Renamed StyleSheet
import { Button, StyleSheet as StyleSheet_Counter } from 'react-native'; // View and Text might be imported already or globally available in some contexts

const Counter: React.FC = () => {
    // `useState` infers the type from the initial value (0 is a number).
    // So, `count` is of type `number`, and `setCount` expects a `number` or a function `(prevState: number) => number`.
    const [count, setCount] = useState<number>(0); // Explicitly typing state with <number> is good practice

    const [message, setMessage] = useState<string | null>(null);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(count - 1); // Direct new value
    const showMessage = () => setMessage("Current count is: " + count);

    return (
        <View style={styles_Counter.container}>
            <Text style={styles_Counter.countText}>Count: {count}</Text>
            <View style={styles_Counter.buttonRow}>
                <Button title="Decrement" onPress={decrement} />
                <Button title="Increment" onPress={increment} />
            </View>
            <Button title="Show Message" onPress={showMessage} />
            {message && <Text style={styles_Counter.messageText}>{message}</Text>}
        </View>
    );
};

const styles_Counter = StyleSheet_Counter.create({
    container: { alignItems: 'center', padding: 20 },
    countText: { fontSize: 24, marginVertical: 10 },
    buttonRow: { flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginVertical: 10 },
    messageText: { marginTop: 10, color: 'blue' }
});

// To use:
// import Counter from './components/Counter';
// <Counter />


// Typing state for objects:
interface UserProfileState_Demo {
    name: string;
    email: string;
    isVerified: boolean;
}

const [userProfile_demo, setUserProfile_demo] = useState<UserProfileState_Demo>({
    name: "Initial User",
    email: "user@example.com",
    isVerified: false,
});

// To update state for objects:
// setUserProfile_demo(prevProfile => ({ ...prevProfile, isVerified: true }));
// setUserProfile_demo({ ...userProfile_demo, name: "New Name" }); // This also works


//================================================================================
// XV. HANDLING EVENTS WITH TYPESCRIPT
//================================================================================

// - React Native event handlers often have specific event types.
// - e.g., `GestureResponderEvent` for `onPress` on `TouchableOpacity` or `Button`.
// - `NativeSyntheticEvent<TextInputChangeEventData>` for `onChange` on `TextInput`.

// Refer back to the `MyButtonProps` example for `onPress: (event: GestureResponderEvent) => void;`

// --- Example: TextInputHandler.tsx ---
// import React, { useState } from 'react'; // Already imported
import { TextInput, NativeSyntheticEvent, TextInputChangeEventData, StyleSheet as StyleSheet_TextInputHandler } from 'react-native';
// import { View, Text, Button } from 'react-native'; // Assuming these are available or imported

const TextInputHandler: React.FC = () => {
    const [text_TextInputHandler, setText_TextInputHandler] = useState<string>(''); // Renamed to avoid global clash
    const [submittedText_TextInputHandler, setSubmittedText_TextInputHandler] = useState<string>('');

    // onChange event gives NativeSyntheticEvent<TextInputChangeEventData>
    // const handleChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    //     setText_TextInputHandler(event.nativeEvent.text);
    // };

    // onChangeText is simpler as it directly gives the string value
    const handleChangeText = (newText: string) => {
        setText_TextInputHandler(newText);
    };

    const handleSubmit = () => {
        setSubmittedText_TextInputHandler(text_TextInputHandler);
        setText_TextInputHandler(''); // Clear input after submit
    };

    return (
        <View style={styles_TextInputHandler.container}>
            <TextInput
                style={styles_TextInputHandler.input}
                placeholder="Enter some text..."
                value={text_TextInputHandler}
                onChangeText={handleChangeText} // Preferred for simplicity
                // onChange={handleChange} // More detailed event object
                onSubmitEditing={handleSubmit} // For when return/submit key is pressed
            />
            <Button title="Submit" onPress={handleSubmit} />
            {submittedText_TextInputHandler ? <Text style={styles_TextInputHandler.submitted}>You submitted: {submittedText_TextInputHandler}</Text> : null}
        </View>
    );
};

const styles_TextInputHandler = StyleSheet_TextInputHandler.create({
    container: { padding: 20 },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingHorizontal: 8,
    },
    submitted: {
        marginTop: 10,
        color: 'green',
        fontSize: 16,
    }
});

// To use:
// import TextInputHandler from './components/TextInputHandler';
// <TextInputHandler />


//================================================================================
// XVI. STYLING IN REACT NATIVE WITH TYPESCRIPT
//================================================================================

// - `StyleSheet.create` from React Native helps validate your styles and can provide minor optimizations.
// - TypeScript can help type your style objects to ensure they conform to `ViewStyle`, `TextStyle`, `ImageStyle` etc.

// --- Example: TypedStylesComponent.tsx ---
// import React from 'react'; // Already imported
// import { View, Text, StyleSheet as StyleSheet_TypedStyles, ViewStyle, TextStyle } from 'react-native'; // Renamed
import { StyleSheet as StyleSheet_TypedStyles, ViewStyle as RNViewStyle, TextStyle as RNTextStyle } from 'react-native'; // View and Text might be available

interface ComponentStyles_Typed {
    container: RNViewStyle; // Using aliased import for clarity
    titleText: RNTextStyle;
    bodyText: RNTextStyle;
}

const styles_TypedStyles = StyleSheet_TypedStyles.create<ComponentStyles_Typed>({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f0f0f0',
    },
    titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    bodyText: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24, // numbers are fine for lineHeight
    }
});
// If you don't explicitly type with StyleSheet.create<ComponentStyles_Typed>,
// TypeScript will often infer the types correctly based on the properties used.
// However, explicit typing can catch errors if you misspell a style property
// or use a value of an incorrect type for a specific style property.

const TypedStylesComponent: React.FC = () => {
    return (
        <View style={styles_TypedStyles.container}>
            <Text style={styles_TypedStyles.titleText}>Styled Title</Text>
            <Text style={styles_TypedStyles.bodyText}>
                This component demonstrates how to use TypeScript with StyleSheet.create
                for more robust and maintainable styling in React Native.
            </Text>
        </View>
    );
};

// To use:
// import TypedStylesComponent from './components/TypedStylesComponent';
// <TypedStylesComponent />


//================================================================================
// XVII. WORKING WITH DATA (e.g., FlatList, API calls with types)
//================================================================================

// 1. Typing `FlatList` data
// --- Example: TypedFlatList.tsx ---
// import React from 'react'; // Already imported
import { FlatList, ListRenderItemInfo, StyleSheet as StyleSheet_FlatList } from 'react-native';
// import { View, Text } from 'react-native';

// Define the type for each item in the list
interface ListItem_FlatList {
    id: string;
    title: string;
    description?: string;
}

const sampleData_FlatList: ListItem_FlatList[] = [
    { id: '1', title: 'First Item', description: 'This is the first item.' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item', description: 'Another description here.' },
    { id: '4', title: 'Fourth Item' },
];

const TypedFlatList: React.FC = () => {

    // renderItem function gets type information for `item` and `index`
    const renderItem_FlatList = ({ item, index }: ListRenderItemInfo<ListItem_FlatList>) => (
        <View style={styles_FlatList.itemContainer}>
            <Text style={styles_FlatList.itemTitle}>{index + 1}. {item.title}</Text>
            {item.description && <Text style={styles_FlatList.itemDescription}>{item.description}</Text>}
        </View>
    );

    return (
        <FlatList<ListItem_FlatList> // Specify the type of data for FlatList
            data={sampleData_FlatList}
            renderItem={renderItem_FlatList}
            keyExtractor={(item) => item.id} // Key extractor should return a string
            // ListHeaderComponent={<Text style={styles_FlatList.header}>My Todo List</Text>}
        />
    );
};

const styles_FlatList = StyleSheet_FlatList.create({
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        padding: 10,
        textAlign: 'center',
        backgroundColor: '#eee'
    },
    itemContainer: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        backgroundColor: 'white'
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 14,
        color: 'gray',
        marginTop: 4,
    }
});

// To use:
// import TypedFlatList from './components/TypedFlatList';
// <TypedFlatList />


// 2. Typing API calls (e.g., with `fetch` and `async/await`)
interface Post_API {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function fetchPosts_API(): Promise<Post_API[]> { // Return type is a Promise resolving to Post_API[]
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post_API[] = await response.json(); // Assert or validate data type
        console.log("Fetched posts:", data);
        return data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return []; // Return empty array or throw error as appropriate
    }
}

// Example usage (typically inside a useEffect in a component):
/*
useEffect(() => {
    fetchPosts_API().then(fetchedPosts => {
        // setPosts(fetchedPosts); // Assuming you have a useState for posts
        console.log("Posts would be set in component state.");
    });
}, []);
*/

//================================================================================
// XVIII. NAVIGATION WITH TYPESCRIPT (Conceptual Overview)
//================================================================================

// - Popular libraries like React Navigation have excellent TypeScript support.
// - You typically define types for your navigation stack parameters.

// --- Conceptual Example with React Navigation ---
// Note: This is highly conceptual and requires @react-navigation/native and @react-navigation/native-stack
// and other setup. Refer to official React Navigation docs for full TS integration.

// 1. Define a type for your stack parameters (usually in a dedicated types file or navigation file)
/*
export type RootStackParamList_Nav = {
    Home_Nav: undefined; // No params for Home screen
    Profile_Nav: { userId: string; anotherParam?: number }; // Profile screen expects a userId string
    Settings_Nav: { settingId: string } | undefined; // Settings screen can have settingId or no params
};
*/

// 2. Create the navigator using the defined param list type
/*
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack_Nav = createNativeStackNavigator<RootStackParamList_Nav>();
*/

// 3. Use in your Navigator component (e.g., App.tsx or a dedicated AppNavigator.tsx)
/*
import { NavigationContainer } from '@react-navigation/native';
// Assume HomeScreen_Nav, ProfileScreen_Nav, SettingsScreen_Nav are defined components

// function AppNavigator_Example() {
//   return (
//     <NavigationContainer>
//       <Stack_Nav.Navigator initialRouteName="Home_Nav">
//         <Stack_Nav.Screen name="Home_Nav" component={HomeScreen_Nav} />
//         <Stack_Nav.Screen name="Profile_Nav" component={ProfileScreen_Nav} />
//         <Stack_Nav.Screen name="Settings_Nav" component={SettingsScreen_Nav} />
//       </Stack_Nav.Navigator>
//     </NavigationContainer>
//   );
// }
*/

// 4. Type screen components and navigation props
/*
import { NativeStackScreenProps } from '@react-navigation/native-stack';
// Assuming React, View, Text, Button are imported from react and react-native

type HomeScreenProps_Nav = NativeStackScreenProps<RootStackParamList_Nav, 'Home_Nav'>;
const HomeScreen_Nav: React.FC<HomeScreenProps_Nav> = ({ navigation }) => {
  return <Button title="Go to Profile" onPress={() => navigation.navigate('Profile_Nav', { userId: '123' })} />;
};

type ProfileScreenProps_Nav = NativeStackScreenProps<RootStackParamList_Nav, 'Profile_Nav'>;
const ProfileScreen_Nav: React.FC<ProfileScreenProps_Nav> = ({ route, navigation }) => {
  const { userId } = route.params;
  return <Text>Profile of User ID: {userId}</Text>;
};
*/

// Refer to React Navigation documentation for detailed TypeScript usage.

//================================================================================
// XIX. BEST PRACTICES & COMMON PATTERNS
//================================================================================

// 1. Enable `strict` mode in `tsconfig.json` (or individual strict flags like `strictNullChecks`, `noImplicitAny`).
// 2. Avoid `any` as much as possible. Use `unknown` if the type is truly unknown and perform type checks.
// 3. Type your function parameters and return values.
// 4. Use Interfaces or Type Aliases for complex object shapes.
// 5. Leverage Utility Types (`Partial`, `Readonly`, `Pick`, etc.) to create new types from existing ones.
// 6. Keep types close to the code they describe. For components, define prop types in the same file or a nearby `types.ts`.
// 7. Use `ReadonlyArray<T>` or `readonly T[]` for arrays that should not be mutated.
// 8. Be consistent with your naming conventions (e.g., `IProps` or `Props` for prop interfaces).

//================================================================================
// XX. FURTHER LEARNING & RESOURCES
//================================================================================

// 1. Official TypeScript Documentation: typescriptlang.org/docs
// 2. Official React Native Documentation (TypeScript section): reactnative.dev/docs/typescript
// 3. Official Expo Documentation (TypeScript section): docs.expo.dev/guides/typescript/
// 4. React TypeScript Cheatsheets: github.com/typescript-cheatsheets/react
// 5. Online Courses and Tutorials (Udemy, Pluralsight, egghead.io, YouTube channels, etc.)

// --- End of TypeScript & React Native (TSX) Notes Template ---
