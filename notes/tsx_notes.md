# TypeScript & React Native (TSX) Notes

## Intermediate Level with Emphasis on Mobile App Development (React Native with Expo)

### Note for Examples in This Document:
- Vanilla TypeScript examples can often be tested directly in a TypeScript playground (e.g., typescriptlang.org/play) or compiled with `tsc`.
- React Native (TSX) component examples are intended to be used within an Expo or React Native project.
- You would typically create a new .tsx file in your project (e.g., MyComponent.tsx), paste the component code, import necessary modules (like React, View, Text from 'react-native'), and then import and render your component in App.tsx or another screen.
- This notes file itself, containing multiple component definitions and examples, is not meant to be compiled as a single application.

---

## I. Introduction to TypeScript

### 1. What is TypeScript?
- TypeScript is a free and open-source programming language developed and maintained by Microsoft.
- It is a strict syntactical superset of JavaScript. This means that any valid JavaScript code is also valid TypeScript code.
- TypeScript adds optional static typing to JavaScript.
- Browsers and Node.js cannot execute TypeScript directly. It needs to be compiled (transpiled) into plain JavaScript first.
- The TypeScript compiler (`tsc`) performs this transpilation and also checks for type errors.

### 2. Why use TypeScript?
- **Static Typing:** Catch errors during development (at compile time) rather than at runtime.
  ```javascript
  // Example: JavaScript might allow `let x = 5; x = "hello";`
  // TypeScript would flag `x = "hello";` as an error if `x` was declared as `let x: number = 5;`
  ```
- **Improved Code Readability and Maintainability:** Types make code easier to understand and refactor.
- **Better Tooling:** Enhanced autocompletion, type checking, and refactoring capabilities in code editors (like VS Code).
- **Scalability:** Helps manage large codebases by providing structure and preventing common errors.
- **Rich Configuration:** `tsconfig.json` allows fine-grained control over the compiler options.

### 3. Relationship to JavaScript (ES5, ES6/ES2015+)
- TypeScript can compile down to various versions of JavaScript (e.g., ES5, ES6, ES2017, etc.), making it compatible with older browsers/environments.
- It often supports newer JavaScript features before they are widely available, transpiling them to older compatible syntax.

---

## II. Setting Up TypeScript for React Native (Expo)

### 1. Expo and TypeScript
- Expo has excellent built-in support for TypeScript.
- When creating a new Expo project, you can often choose a TypeScript template:
  ```bash
  npx create-expo-app MyTSApp -t expo-template-tabs-typescript
  ```
- Or, if you created a JS project, you can add TypeScript manually.

### 2. `tsconfig.json`
This file is the heart of a TypeScript project. It specifies:
- The root files and compiler options required to compile the project.
- **Compiler Options (`compilerOptions`)**:
  - `target`: Specifies the ECMAScript target version (e.g., "es5", "es6", "esnext").
  - `module`: Specifies module code generation (e.g., "commonjs", "esnext").
  - `jsx`: Crucial for React/React Native. Usually set to "react-native" or "preserve".
  - `lib`: List of library files to be included in the compilation (e.g., ["dom", "esnext"]).
  - `allowJs`: Allows JavaScript files to be compiled.
  - `skipLibCheck`: Skips type checking of all declaration files (`*.d.ts`).
  - `strict`: Enables all strict type-checking options (highly recommended: `true`).
  - `baseUrl` & `paths`: For setting up module path aliases.
  - `esModuleInterop`: Enables interoperability between CommonJS and ES modules.
  - `resolveJsonModule`: Allows importing .json files.

**Example Expo tsconfig.json:**
```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./*"]
    }
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts"
  ]
}
```

### 3. Declaration Files (`.d.ts`)
- TypeScript uses declaration files to provide type information for JavaScript libraries that don't have built-in types.
- Many popular libraries have community-maintained type definitions available through the `@types/` scope on npm (e.g., `npm install @types/react @types/react-native`).
- Expo usually handles these for core React Native and Expo SDK packages.
- You can also write your own `.d.ts` files for untyped JavaScript code or to describe the shape of global variables.

---

## III. Core TypeScript Concepts

### 1. Basic Types (Primitives)

#### Boolean
```typescript
let isActive: boolean = true;
let isEnabled = false; // Type inference: boolean
```

#### Number
```typescript
let age: number = 30;
let price: number = 19.99;
let quantity = 100; // Type inference: number
```

#### String
```typescript
let firstName: string = "Alice";
let message: string = `Hello, ${firstName}!`;
let lastName = 'Smith'; // Type inference: string
```

### 2. Arrays
```typescript
let scores: number[] = [10, 20, 30];
let names: Array<string> = ["Bob", "Charlie"];
let mixed = [1, "two", true]; // Type inference: (string | number | boolean)[]
```

### 3. Tuples
Arrays with a fixed number of elements whose types are known, but need not be the same.

```typescript
let userProfile: [string, number, boolean];
userProfile = ["Alice", 30, true];
// userProfile = [30, "Alice", true]; // Error: Type mismatch
// userProfile = ["Alice", 30];       // Error: Incorrect number of elements

console.log("Tuple example:", userProfile[0]); // Alice
```

### 4. Enums

#### Numeric enums (default, auto-incrementing from 0)
```typescript
enum Direction {
    Up,    // 0
    Down,  // 1
    Left,  // 2
    Right  // 3
}
let currentDirection: Direction = Direction.Up;
console.log("Numeric Enum:", currentDirection, Direction.Right); // 0, 3
```

#### Initialized numeric enums
```typescript
enum HttpStatus {
    OK = 200,
    BadRequest = 400,
    NotFound = 404,
    InternalServerError = 500
}
let responseStatus: HttpStatus = HttpStatus.OK;
console.log("Initialized Enum:", responseStatus); // 200
```

#### String enums
```typescript
enum LogLevel {
    INFO = "INFO",
    WARN = "WARNING",
    ERROR = "ERROR",
    DEBUG = "DEBUG"
}
let appLogLevel: LogLevel = LogLevel.INFO;
console.log("String Enum:", appLogLevel); // "INFO"
```

### 5. `any`
Represents any kind of value. Use sparingly as it opts out of type checking.

```typescript
let dynamicValue: any = 4;
dynamicValue = "Now I am a string";
dynamicValue = { key: "value" };
// No type checking errors for dynamicValue, but you lose type safety.
```

### 6. `unknown`
A type-safe counterpart of `any`.

```typescript
let mysteryValue: unknown = "I could be anything";
// mysteryValue.toUpperCase(); // Error: Object is of type 'unknown'.
if (typeof mysteryValue === 'string') {
    console.log("Unknown as string:", mysteryValue.toUpperCase()); // OK, type guard
}
```

### 7. `void`
Represents the absence of any type. Typically used as the return type of functions that do not return a value.

```typescript
function logMessage(message: string): void {
    console.log(message);
    // No return statement, or `return;` or `return undefined;`
}
```

### 8. `null` and `undefined`
```typescript
let nullableString: string | null = "Hello";
nullableString = null;
// nullableString = undefined; // Error if undefined is not part of the union

let undefinedValue: number | undefined;
undefinedValue = 100;
undefinedValue = undefined;
```

### 9. `never`
Represents the type of values that never occur.

```typescript
function throwError(message: string): never {
    throw new Error(message);
}

function infiniteLoop(): never {
    while (true) {}
}
```

### 10. Object Types
```typescript
let person: { name: string; age: number; isStudent?: boolean }; // isStudent is optional
person = { name: "David", age: 25 };
person = { name: "Eve", age: 22, isStudent: true };
```

---

## IV. Type Assertions (Type Casting)

Sometimes you'll have more information about the type of a value than TypeScript does.

```typescript
let someValue: any = "this is a string";

// Angle-bracket syntax (less common in .tsx files due to conflict with JSX tags)
let strLength: number = (<string>someValue).length;

// `as` syntax (recommended, especially in .tsx files)
let strLengthAs: number = (someValue as string).length;
console.log("String length via 'as':", strLengthAs);
```

**Note:** Be careful with type assertions. If you assert a type that is incorrect, it can lead to runtime errors.

---

## V. Functions in TypeScript

### 1. Typed Parameters and Return Types
```typescript
function add(x: number, y: number): number {
    return x + y;
}

// Anonymous function with types
const multiply = function(a: number, b: number): number {
    return a * b;
};

// Arrow function with types
const subtract = (a: number, b: number): number => {
    return a - b;
};
```

### 2. Optional Parameters
Add a `?` after the parameter name. Optional parameters must come after required parameters.

```typescript
function greet(name: string, greeting?: string): string {
    if (greeting) {
        return `${greeting}, ${name}!`;
    }
    return `Hello, ${name}!`;
}
console.log(greet("Alice"));                // Hello, Alice!
console.log(greet("Bob", "Good morning")); // Good morning, Bob!
```

### 3. Default Parameter Values
```typescript
function power(base: number, exponent: number = 2): number {
    return Math.pow(base, exponent);
}
console.log("Power (default exponent):", power(3));    // 9 (3^2)
console.log("Power (specified exponent):", power(2, 5)); // 32 (2^5)
```

### 4. Rest Parameters
```typescript
function sumAll(...numbers: number[]): number {
    let total = 0;
    for (const num of numbers) {
        total += num;
    }
    return total;
}
console.log("Sum of 1,2,3:", sumAll(1, 2, 3));         // 6
console.log("Sum of 10,20,30,40:", sumAll(10, 20, 30, 40)); // 100
```

### 5. Function Types
```typescript
let myAddFunction: (x: number, y: number) => number;

myAddFunction = function(num1: number, num2: number): number {
    return num1 + num2;
};
console.log("Using function type variable:", myAddFunction(7, 8));
```

---

## VI. Interfaces

### 1. Describing Object Shapes
```typescript
interface User {
    id: number;
    username: string;
    email: string;
    isAdmin?: boolean; // Optional property
    readonly apiKey: string; // Readonly property
}

let user1: User = {
    id: 1,
    username: "john_doe",
    email: "john.doe@example.com",
    apiKey: "ABC123XYZ"
};

function displayUser(user: User): void {
    console.log(`ID: ${user.id}, Username: ${user.username}, Email: ${user.email}`);
    if (user.isAdmin) {
        console.log("User is an admin.");
    }
}
```

### 2. Function Types in Interfaces
```typescript
interface SearchFunction {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunction;
mySearch = function(src, sub) { // Parameter names don't have to match
    return src.search(sub) > -1;
};
```

### 3. Class Types (Implementing an Interface)
```typescript
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
```

### 4. Extending Interfaces
```typescript
interface Shape {
    color: string;
}

interface Square extends Shape {
    sideLength: number;
}

let mySquare: Square = { color: "blue", sideLength: 10 };
```

---

## VII. Classes in TypeScript

### 1. Basic Class Definition
```typescript
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
```

### 2. Inheritance
```typescript
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
```

### 3. Access Modifiers
- `public` (default): Members are accessible from anywhere.
- `private`: Members are only accessible within the defining class.
- `protected`: Members are accessible within the defining class and by instances of derived classes.

```typescript
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
}
```

### 4. Parameter Properties
```typescript
class Student {
    // `public readonly name: string;` and `this.name = name;` are done automatically.
    constructor(public readonly id: number, public name: string, private major: string) {}

    getMajor(): string {
        return this.major;
    }
}
```

---

## VIII. Generics

### 1. Generic Functions
```typescript
function identity<T>(arg: T): T {
    return arg;
}

let outputString = identity<string>("myString"); // Explicitly set T to string
let outputNumber = identity(100); // Type inference: T becomes number
```

### 2. Generic Interfaces
```typescript
interface GenericIdentityFn<T> {
    (arg: T): T;
}

let myGenericIdentity: GenericIdentityFn<number> = identity;
```

### 3. Generic Classes
```typescript
class GenericNumber<T> {
    zeroValue: T | undefined;
    add: ((x: T, y: T) => T) | undefined;
}

let myGenericNumber = new GenericNumber<number>();
myGenericNumber.zeroValue = 0;
myGenericNumber.add = function(x, y) { return x + y; };
```

### 4. Generic Constraints
```typescript
interface Lengthwise {
    length: number;
}

function loggingIdentityWithConstraint<T extends Lengthwise>(arg: T): T {
    console.log("Constrained generic, length:", arg.length); // Now we know .length exists
    return arg;
}
```

---

## IX. Advanced Types

### 1. Type Aliases
```typescript
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
```

### 2. Union Types (`|`)
```typescript
function printId(id: string | number) {
    console.log("ID: " + id);
    if (typeof id === "string") {
        // TypeScript knows id is a string here
        console.log(id.toUpperCase());
    }
}
```

### 3. Intersection Types (`&`)
```typescript
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
```

### 4. Literal Types
```typescript
type ButtonSize = "small" | "medium" | "large";
let myButtonSize: ButtonSize = "medium";
```

### 5. Utility Types
```typescript
// Partial<Type>: Constructs a type with all properties of Type set to optional
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>): Todo {
    return { ...todo, ...fieldsToUpdate };
}

// Pick<Type, Keys>: Constructs a type by picking properties
type UserSummary = Pick<UserProfile, "id" | "name" | "email">;

// Omit<Type, Keys>: Constructs a type by omitting properties
type UserEditableFields = Omit<UserProfile, "id">;
```

---

## X. TypeScript with React & JSX (TSX)

### 1. Basic Functional Component
```tsx
import React from 'react';
import { View, Text } from 'react-native';

// Define props type
interface GreetingProps {
    name: string;
    enthusiasmLevel?: number; // Optional prop
}

const Greeting: React.FC<GreetingProps> = ({ name, enthusiasmLevel = 1 }) => {
    if (enthusiasmLevel <= 0) {
        throw new Error('You could be a little more enthusiastic. :D');
    }

    return (
        <View>
            <Text>Hello {name}{'!'.repeat(enthusiasmLevel)}</Text>
        </View>
    );
};
```

### 2. Children Prop
```tsx
interface ContainerProps {
    title: string;
    children: React.ReactNode;
}

const Container: React.FC<ContainerProps> = ({ title, children }) => {
    return (
        <View>
            <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
            {children}
        </View>
    );
};
```

---

## XI. React Native Components with TypeScript

### Example: Custom Button Component
```tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, GestureResponderEvent, ViewStyle, TextStyle } from 'react-native';

interface MyButtonProps {
    title: string;
    onPress: (event: GestureResponderEvent) => void;
    color?: string;
    style?: ViewStyle;
    textStyle?: TextStyle;
    disabled?: boolean;
}

const MyButton: React.FC<MyButtonProps> = ({ title, onPress, color, style, textStyle, disabled }) => {
    const buttonStyles = [styles.button, style];
    if (color) {
        buttonStyles.push({ backgroundColor: color });
    }
    if (disabled) {
        buttonStyles.push(styles.disabledButton);
    }

    return (
        <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled} activeOpacity={0.7}>
            <Text style={[styles.text, textStyle, disabled && styles.disabledText]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007bff',
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

export default MyButton;
```

---

## XII. State Management with TypeScript

### useState with TypeScript
```tsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';

const Counter: React.FC = () => {
    const [count, setCount] = useState<number>(0);
    const [message, setMessage] = useState<string | null>(null);

    const increment = () => setCount(prevCount => prevCount + 1);
    const decrement = () => setCount(count - 1);
    const showMessage = () => setMessage("Current count is: " + count);

    return (
        <View style={{ alignItems: 'center', padding: 20 }}>
            <Text style={{ fontSize: 24, marginVertical: 10 }}>Count: {count}</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '60%', marginVertical: 10 }}>
                <Button title="Decrement" onPress={decrement} />
                <Button title="Increment" onPress={increment} />
            </View>
            <Button title="Show Message" onPress={showMessage} />
            {message && <Text style={{ marginTop: 10, color: 'blue' }}>{message}</Text>}
        </View>
    );
};
```

### Typing State for Objects
```tsx
interface UserProfileState {
    name: string;
    email: string;
    isVerified: boolean;
}

const [userProfile, setUserProfile] = useState<UserProfileState>({
    name: "Initial User",
    email: "user@example.com",
    isVerified: false,
});

// To update state for objects:
setUserProfile(prevProfile => ({ ...prevProfile, isVerified: true }));
```

---

## XIII. Working with Data

### Typing FlatList
```tsx
import React from 'react';
import { View, Text, FlatList, ListRenderItemInfo } from 'react-native';

interface ListItem {
    id: string;
    title: string;
    description?: string;
}

const sampleData: ListItem[] = [
    { id: '1', title: 'First Item', description: 'This is the first item.' },
    { id: '2', title: 'Second Item' },
    { id: '3', title: 'Third Item', description: 'Another description here.' },
];

const TypedFlatList: React.FC = () => {
    const renderItem = ({ item, index }: ListRenderItemInfo<ListItem>) => (
        <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#ccc' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{index + 1}. {item.title}</Text>
            {item.description && <Text style={{ fontSize: 14, color: 'gray' }}>{item.description}</Text>}
        </View>
    );

    return (
        <FlatList<ListItem>
            data={sampleData}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
        />
    );
};
```

### Typing API Calls
```tsx
interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}

async function fetchPosts(): Promise<Post[]> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=5');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: Post[] = await response.json();
        return data;
    } catch (error) {
        console.error("Failed to fetch posts:", error);
        return [];
    }
}

// Usage in component:
// useEffect(() => {
//     fetchPosts().then(fetchedPosts => {
//         setPosts(fetchedPosts);
//     });
// }, []);
```

---

## XIV. Navigation with TypeScript (Conceptual)

### React Navigation Type Safety
```tsx
// Define stack parameters
export type RootStackParamList = {
    Home: undefined;
    Profile: { userId: string; anotherParam?: number };
    Settings: { settingId: string } | undefined;
};

// Type screen components
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
    return (
        <Button 
            title="Go to Profile" 
            onPress={() => navigation.navigate('Profile', { userId: '123' })} 
        />
    );
};

type ProfileScreenProps = NativeStackScreenProps<RootStackParamList, 'Profile'>;
const ProfileScreen: React.FC<ProfileScreenProps> = ({ route, navigation }) => {
    const { userId } = route.params;
    return <Text>Profile of User ID: {userId}</Text>;
};
```

---

## XV. Best Practices & Common Patterns

1. **Enable `strict` mode** in `tsconfig.json`
2. **Avoid `any`** as much as possible. Use `unknown` if the type is truly unknown
3. **Type your function parameters and return values**
4. **Use Interfaces or Type Aliases** for complex object shapes
5. **Leverage Utility Types** (`Partial`, `Readonly`, `Pick`, etc.)
6. **Keep types close to the code** they describe
7. **Use `ReadonlyArray<T>`** or `readonly T[]` for arrays that should not be mutated
8. **Be consistent with naming conventions** (e.g., `Props` for prop interfaces)

---

## XVI. Further Learning & Resources

1. [Official TypeScript Documentation](https://typescriptlang.org/docs)
2. [Official React Native Documentation (TypeScript section)](https://reactnative.dev/docs/typescript)
3. [Official Expo Documentation (TypeScript section)](https://docs.expo.dev/guides/typescript/)
4. [React TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react)
5. Online Courses and Tutorials (Udemy, Pluralsight, egghead.io, YouTube channels, etc.)
