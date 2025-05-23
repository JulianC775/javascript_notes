/*
--------------------------------------------------------------------------------
|                            JAVA NOTES TEMPLATE                             |
--------------------------------------------------------------------------------
| Intermediate Level with Emphasis on Application Development                |
--------------------------------------------------------------------------------
*/

/*
================================================================================
I. INTRODUCTION TO JAVA
================================================================================
*/

// 1. What is Java?
//    - History and Evolution
//    - Key Features:
//        - Object-Oriented
//        - Platform Independent (Write Once, Run Anywhere - WORA)
//        - Robust and Secure
//        - High Performance (JIT Compilation)
//        - Multithreaded
//        - Statically Typed
//    - Java Virtual Machine (JVM) - How it works, role of bytecode
//    - Java Development Kit (JDK) vs. Java Runtime Environment (JRE)
//    - Different Java Editions (SE, EE, ME - though ME is less common now)

// 2. Setting up the Java Development Environment
//    - Installing the JDK (Oracle JDK, OpenJDK distributions like Adoptium Temurin, Amazon Corretto)
//    - Setting JAVA_HOME and Path environment variables
//    - Choosing an Integrated Development Environment (IDE):
//        - IntelliJ IDEA (Community/Ultimate)
//        - Eclipse IDE for Java Developers
//        - Visual Studio Code with Java extensions
//    - Verifying installation (java -version, javac -version)

// 3. Your First Java Program - "Hello, World!"
//    public class HelloWorld {
//        public static void main(String[] args) {
//            System.out.println("Hello, World!");
//            // Explanation of:
//            // - public class HelloWorld: Class declaration
//            // - public static void main(String[] args): Main method entry point
//            //   - public: Access modifier
//            //   - static: Belongs to the class, not an instance
//            //   - void: Doesn't return a value
//            //   - main: Special name recognized by JVM
//            //   - String[] args: Command-line arguments
//            // - System.out.println(): Printing to the console
//        }
//    }

// 4. Compilation and Execution Process
//    - Writing source code (.java file)
//    - Compiling with `javac` (e.g., `javac HelloWorld.java`) -> Generates bytecode (.class file)
//    - Running with `java` (e.g., `java HelloWorld`) -> JVM executes bytecode

/*
================================================================================
II. JAVA SYNTAX AND BASIC CONSTRUCTS
================================================================================
*/

// 1. Variables and Data Types
//    - Primitive Data Types:
//        - byte (8-bit integer)
//        - short (16-bit integer)
//        - int (32-bit integer)
//        - long (64-bit integer, use L suffix, e.g., 100L)
//        - float (32-bit floating-point, use F suffix, e.g., 3.14F)
//        - double (64-bit floating-point, default for decimals)
//        - char (16-bit Unicode character, single quotes, e.g., 'A')
//        - boolean (true or false)
//    - Reference Data Types (Objects and Arrays):
//        - String (immutable sequence of characters)
//        - Arrays
//        - Custom Objects (Instances of classes)
//    - Variable Declaration and Initialization:
//        // int age;
//        // age = 30;
//        // String name = "Java";
//    - Naming Conventions (camelCase for variables and methods, PascalCase for classes)
//    - Literals (integer, floating-point, character, string, boolean)
//    - Scope of Variables (local, instance, class/static)
//    - `var` keyword for local variable type inference (Java 10+)

// 2. Operators
//    - Arithmetic Operators (+, -, *, /, %)
//    - Assignment Operators (=, +=, -=, *=, /=, %=)
//    - Unary Operators (+, -, ++, --, !)
//    - Relational Operators (==, !=, >, <, >=, <=)
//    - Logical Operators (&&, ||, !) - Short-circuiting
//    - Bitwise Operators (&, |, ^, ~, <<, >>, >>>) - Less common in typical app dev, but good to know
//    - Ternary Operator (condition ? expr1 : expr2)
//    - Operator Precedence

// 3. Control Flow Statements
//    - Conditional Statements:
//        - `if` statement
//        - `if-else` statement
//        - `if-else if-else` ladder
//        - Nested `if` statements
//        - `switch` statement (with `case`, `break`, `default`)
//          // Switch expressions (Java 14+)
//    - Looping Statements:
//        - `for` loop (initialization; condition; iteration)
//        - `while` loop (condition)
//        - `do-while` loop (executes at least once)
//        - Enhanced `for` loop (for-each loop, for collections and arrays)
//    - Branching Statements:
//        - `break` (terminate loop or switch)
//        - `continue` (skip current iteration, proceed to next)
//        - `return` (exit method, optionally return a value)

// 4. Arrays
//    - Declaration: `int[] numbers;` or `int numbers[];`
//    - Initialization:
//        // `numbers = new int[5];`
//        // `int[] otherNumbers = {1, 2, 3, 4, 5};`
//    - Accessing Elements (using index, 0-based)
//    - Array Length (`numbers.length`)
//    - Multi-dimensional Arrays (e.g., `int[][] matrix = new int[3][3];`)
//    - `java.util.Arrays` utility class (e.g., `sort()`, `toString()`, `copyOf()`)

// 5. Strings
//    - `String` class (immutable)
//        // String str1 = "Hello";
//        // String str2 = new String("World");
//    - Common String methods:
//        // length(), charAt(), substring(), equals(), equalsIgnoreCase(),
//        // startsWith(), endsWith(), indexOf(), lastIndexOf(), toUpperCase(),
//        // toLowerCase(), trim(), replace(), split(), format(), isEmpty(), join() (Java 8+)
//    - String Concatenation (+ operator, `concat()` method) - Be mindful of performance in loops
//    - `StringBuilder` class (mutable, for efficient string modifications)
//    - `StringBuffer` class (mutable, thread-safe version of StringBuilder)
//    - String Interning and String Pool

// 6. Type Casting
//    - Implicit Casting (Widening conversion, e.g., `int` to `long`)
//    - Explicit Casting (Narrowing conversion, e.g., `double` to `int`, requires explicit cast)
//        // double d = 10.5;
//        // int i = (int) d;

// 7. Comments
//    - Single-line comments: `// This is a comment`
//    - Multi-line comments: `/* This is a multi-line comment */`
//    - Javadoc comments: `/** Documentation comment for methods, classes etc. */`

/*
================================================================================
III. OBJECT-ORIENTED PROGRAMMING (OOP) IN JAVA - FUNDAMENTALS
================================================================================
*/

// 1. Introduction to OOP Concepts
//    - Encapsulation (Bundling data and methods, data hiding using private)
//    - Abstraction (Hiding complex implementation, showing essential features)
//    - Inheritance (Reusability, IS-A relationship)
//    - Polymorphism (One name, many forms, e.g., method overriding/overloading)

// 2. Classes and Objects
//    - Defining a Class:
//        // Blueprint for objects
//        // Syntax: access_modifier class ClassName { ... }
//        // Example:
//        // public class Dog {
//        //     // Fields (Instance Variables / State)
//        //     String name;
//        //     String breed;
//        //     int age;
//        //
//        //     // Methods (Behavior)
//        //     void bark() { System.out.println("Woof!"); }
//        //     void fetch() { System.out.println(name + " is fetching."); }
//        // }
//    - Creating Objects (Instantiation):
//        // `ClassName objectName = new ClassName();`
//        // `Dog myDog = new Dog();`
//    - Accessing Members (Fields and Methods) using the dot operator (`.`)
//        // `myDog.name = "Buddy";`
//        // `myDog.bark();`
//    - Constructors:
//        - Special methods used to initialize objects.
//        - Same name as the class.
//        - No explicit return type.
//        - Default constructor (if no constructor is defined).
//        - Parameterized constructors.
//        - Constructor overloading.
//        // public class Car {
//        //     String model;
//        //     public Car() { this.model = "Unknown"; } // Default
//        //     public Car(String model) { this.model = model; } // Parameterized
//        // }
//    - `this` keyword:
//        - Refers to the current instance of the class.
//        - Used to differentiate instance variables from local variables (parameters).
//        - Can be used to call another constructor from a constructor (constructor chaining: `this(...)`).
//    - `new` keyword: Allocates memory for an object.
//    - Garbage Collection (Automatic memory management, System.gc() - suggestion)

// 3. Access Modifiers
//    - `public`: Accessible from any other class.
//    - `private`: Accessible only within the same class (key for encapsulation).
//    - `protected`: Accessible within the same package and by subclasses (even if in different packages).
//    - Default (Package-private): Accessible only within the same package (if no modifier is specified).
//    - Getters and Setters (Accessor and Mutator methods) for controlled access to private fields.

// 4. `static` Keyword
//    - Static Variables (Class Variables):
//        - Shared among all instances of the class.
//        - Belongs to the class, not to any specific object.
//        // `static int instanceCount = 0;`
//    - Static Methods (Class Methods):
//        - Can be called without creating an object of the class (using `ClassName.methodName()`).
//        - Cannot access instance variables or instance methods directly (only static members).
//        - `main` method is static.
//    - Static Blocks:
//        - Executed when the class is loaded into memory (once).
//        // `static { ... }`
//    - Static Imports:
//        // `import static java.lang.Math.PI;`

// 5. Packages
//    - Organizing classes and interfaces into namespaces.
//    - `package` keyword at the top of the .java file.
//        // `package com.example.myapp.model;`
//    - Directory structure should match package structure.
//    - Importing classes from other packages:
//        - `import packageName.ClassName;` (Specific class)
//        - `import packageName.*;` (All public classes/interfaces in the package - use with caution)
//    - Standard Java API packages (e.g., `java.lang` - automatically imported, `java.util`, `java.io`).
//    - CLASSPATH environment variable: Tells JVM where to find .class files.

/*
================================================================================
IV. OBJECT-ORIENTED PROGRAMMING (OOP) IN JAVA - INTERMEDIATE
================================================================================
*/

// 1. Inheritance (IS-A relationship)
//    - `extends` keyword:
//        // `class Subclass extends Superclass { ... }`
//    - Single Inheritance (Java supports single inheritance for classes).
//    - `super` keyword:
//        - Refers to the immediate parent class object.
//        - `super.member` (to access parent's members).
//        - `super()` (to call parent's constructor - must be the first statement in subclass constructor).
//    - Method Overriding:
//        - Redefining a method of the superclass in the subclass with the same signature.
//        - `@Override` annotation (recommended for compile-time check).
//        - Rules for overriding (access modifier cannot be more restrictive, return type compatibility).
//    - `final` keyword:
//        - `final` variable: Constant (cannot be changed after initialization).
//        - `final` method: Cannot be overridden by subclasses.
//        - `final` class: Cannot be subclassed (inherited from).
//    - The `Object` class:
//        - Root of the class hierarchy in Java. Every class implicitly extends `Object`.
//        - Common methods: `toString()`, `equals()`, `hashCode()`, `getClass()`, `finalize()`.
//        - Overriding `equals()` and `hashCode()` (important for collections).
//          // Contract between equals() and hashCode().
//    - "Composition over Inheritance" principle (HAS-A relationship, prefer using instances of other classes).

// 2. Polymorphism (Many Forms)
//    - Runtime Polymorphism (Dynamic Method Dispatch):
//        - Achieved through method overriding.
//        - A reference variable of a superclass type can refer to an object of its subclass.
//        - The actual method called is determined at runtime based on the object type.
//        // Superclass ref = new Subclass();
//        // ref.overriddenMethod(); // Calls Subclass's version
//    - Compile-time Polymorphism (Method Overloading):
//        - Multiple methods in the same class with the same name but different parameters (number, type, or order of parameters).
//    - `instanceof` operator:
//        - Checks if an object is an instance of a particular class or interface.
//        // `if (animal instanceof Dog) { ... }`
//        - Useful for downcasting safely after checking type.
//    - Upcasting and Downcasting.

// 3. Abstraction
//    - Hiding implementation details and showing only functionality.
//    - Abstract Classes:
//        - Cannot be instantiated.
//        - Declared with the `abstract` keyword.
//        - Can have abstract methods (methods without a body) and concrete methods.
//        - If a class has at least one abstract method, the class must be declared abstract.
//        - Subclasses must implement all abstract methods of the parent abstract class or be declared abstract themselves.
//        // `abstract class Shape { abstract void draw(); }`
//    - Abstract Methods:
//        - Declared without an implementation (no body, ends with a semicolon).
//        // `abstract void calculateArea();`

// 4. Interfaces
//    - A blueprint of a class. Specifies what a class must do, not how.
//    - Declared using the `interface` keyword.
//    - By default, all methods in an interface are `public abstract` (before Java 8).
//    - By default, all fields in an interface are `public static final` (constants).
//    - A class `implements` an interface.
//        // `class MyClass implements MyInterface { ... }`
//    - A class can implement multiple interfaces (achieving a form of multiple inheritance).
//    - An interface can extend other interfaces.
//    - Java 8+ features in interfaces:
//        - `default` methods: Provide a default implementation in the interface.
//                           Classes implementing the interface can use it or override it.
//        - `static` methods: Utility methods belonging to the interface, called using `InterfaceName.staticMethod()`.
//    - Marker Interfaces (e.g., `java.io.Serializable`) - No methods, just mark a class.
//    - Functional Interfaces (Java 8+): An interface with exactly one abstract method.
//        - `@FunctionalInterface` annotation (optional but good practice).
//        - Used with lambda expressions.

// 5. Inner Classes (Nested Classes)
//    - Defining a class within another class.
//    - Types:
//        - Member Inner Class (Non-static nested class):
//            - Associated with an instance of the outer class.
//            - Can access all members (including private) of the outer class.
//        - Static Nested Class:
//            - Declared `static`.
//            - Not associated with an instance of the outer class.
//            - Can only access static members of the outer class.
//            - Behaves much like a regular top-level class but is namespaced within the outer class.
//        - Local Inner Class:
//            - Defined within a method block.
//            - Scope is limited to the block.
//            - Can access local variables of the enclosing block (if they are final or effectively final).
//        - Anonymous Inner Class:
//            - A class without a name, defined and instantiated in a single expression.
//            - Often used for event handlers or implementing interfaces with few methods.
//            // new Runnable() { @Override public void run() { ... } };

// 6. Enums (Enumerations)
//    - A special data type that enables for a variable to be a set of predefined constants.
//    - `enum` keyword.
//    // `public enum Day { SUNDAY, MONDAY, TUESDAY, ... }`
//    - Enums can have constructors, methods, and fields.
//    - Enums are type-safe.
//    - Useful for representing a fixed set of constants (e.g., states, error codes, directions).
//    - `values()` method (returns an array of all enum constants).
//    - `valueOf(String name)` method (returns enum constant with the specified name).

/*
================================================================================
V. EXCEPTION HANDLING
================================================================================
*/

// 1. What are Exceptions?
//    - Events that occur during program execution that disrupt the normal flow of instructions.
//    - `Throwable` class is the superclass of all errors and exceptions.
//    - Hierarchy:
//        - `Error`: Serious problems that applications should not try to catch (e.g., `OutOfMemoryError`, `StackOverflowError`).
//        - `Exception`: Conditions that applications might want to catch.
//            - Checked Exceptions:
//                - Compiler forces you to handle them (using `try-catch` or `throws`).
//                - Typically represent recoverable conditions (e.g., `IOException`, `SQLException`, `FileNotFoundException`).
//            - Unchecked Exceptions (Runtime Exceptions):
//                - Compiler does not force you to handle them.
//                - Often indicate programming errors (e.g., `NullPointerException`, `ArrayIndexOutOfBoundsException`, `ArithmeticException`, `IllegalArgumentException`).
//                - Subclass of `RuntimeException`.

// 2. `try-catch` block
//    // try {
//    //     // Code that might throw an exception
//    // } catch (ExceptionType1 e1) {
//    //     // Handler for ExceptionType1
//    // } catch (ExceptionType2 e2) {
//    //     // Handler for ExceptionType2
//    // } catch (Exception e) { // Generic handler (catches any Exception)
//    //     // Handler for any other exception (use specific handlers first)
//    // }
//    - Catching multiple exceptions with one catch block (Java 7+):
//        // `catch (IOException | SQLException ex) { ... }`
//    - Getting information from exception objects (e.g., `e.getMessage()`, `e.printStackTrace()`).

// 3. `finally` block
//    - Always executed, whether an exception is thrown or not.
//    - Used for cleanup code (e.g., closing resources like files, database connections).
//    // try { ... } catch (Exception e) { ... } finally { /* cleanup code */ }

// 4. `throw` keyword
//    - Used to manually throw an exception.
//    // `throw new CustomException("Something went wrong");`

// 5. `throws` keyword
//    - Used in a method signature to declare that the method might throw one or more checked exceptions.
//    - Shifts the responsibility of handling the exception to the caller method.
//    // `public void readFile() throws IOException { ... }`

// 6. Custom Exceptions
//    - Creating your own exception classes by extending `Exception` (for checked) or `RuntimeException` (for unchecked).
//    // public class MyCustomException extends Exception {
//    //     public MyCustomException(String message) {
//    //         super(message);
//    //     }
//    // }

// 7. Try-with-resources Statement (Java 7+)
//    - Automatically closes resources that implement the `AutoCloseable` interface.
//    - Simplifies resource management and reduces boilerplate.
//    // try (FileInputStream fis = new FileInputStream("file.txt");
//    //      BufferedReader br = new BufferedReader(new InputStreamReader(fis))) {
//    //     // Use resources
//    // } catch (IOException e) {
//    //     // Handle exception
//    // }
//    // Resources are closed automatically in reverse order of declaration.

/*
================================================================================
VI. JAVA COLLECTIONS FRAMEWORK
================================================================================
*/

// NOTE FOR EXAMPLES IN THIS SECTION:
// The following code blocks containing full class definitions (e.g., public class XxxExample { ... })
// are intended as standalone examples. To compile and run them, you should copy each class
// into its own separate .java file (e.g., HashSetExample.java) and then compile and run that specific file.
// This notes file itself, containing multiple such public class examples, is not meant to be compiled as a single unit.

// 1. Introduction to Collections Framework
//    - A unified architecture for representing and manipulating collections (groups of objects).
//    - Key interfaces and classes in `java.util` package.
//    - Benefits: Reduces programming effort, increases performance, provides interoperability.

// 2. Core Collection Interfaces
//    - `Collection<E>`: Root interface. Basic operations like add, remove, size, iterator.
//    - `List<E>`: Ordered collection (sequence), allows duplicates.
//        - `ArrayList<E>`: Resizable array implementation. Good for random access.
//        - `LinkedList<E>`: Doubly-linked list implementation. Good for insertions/deletions.
//                           Implements `Deque<E>` as well.
//        - `Vector<E>`: Synchronized version of ArrayList (legacy, generally prefer ArrayList with external synchronization).
//        - `Stack<E>`: LIFO data structure, extends Vector (legacy, prefer `ArrayDeque` for stack operations).
//    - `Set<E>`: Collection that does not allow duplicate elements.
//        - An interface representing an unordered collection of unique elements.
//        - Key characteristics: No duplicate elements. Order of elements is generally not guaranteed (depends on implementation).
//        - Common uses: Storing unique items, checking for membership quickly.

//        - `HashSet<E>`: Uses hash table for storage. No guaranteed order. Allows one null element.
//          - Offers constant time performance O(1) for basic operations (add, remove, contains, size), assuming the hash function disperses elements properly.
//          - Iteration order is not predictable and can change over time.

// Example of HashSet:
import java.util.HashSet; // Note: Imports might need to be managed if running snippets individually or if notes.java becomes too complex.
import java.util.Set;     // For now, placing them with the first example needing them.
import java.util.Iterator;

public class HashSetExample {
    public static void main(String[] args) {
        // 1. Creating a HashSet
        Set<String> fruitSet = new HashSet<>();

        // 2. Adding elements
        //    - add() returns true if the element was added, false if it was already present.
        System.out.println("Adding Apple: " + fruitSet.add("Apple"));          // true
        fruitSet.add("Banana");
        fruitSet.add("Orange");
        System.out.println("Adding Apple again: " + fruitSet.add("Apple")); // false (duplicate)
        fruitSet.add("Mango");
        fruitSet.add(null); // HashSet allows one null element
        System.out.println("Adding null again: " + fruitSet.add(null));   // false

        System.out.println("HashSet elements: " + fruitSet); // Order is not guaranteed

        // 3. Checking size
        System.out.println("Size of the set: " + fruitSet.size()); // Expected: 5 (Apple, Banana, Orange, Mango, null)

        // 4. Checking if an element exists
        System.out.println("Contains Orange? " + fruitSet.contains("Orange")); // true
        System.out.println("Contains Grape? " + fruitSet.contains("Grape"));   // false

        // 5. Removing an element
        //    - remove() returns true if the element was present and removed, false otherwise.
        System.out.println("Removing Banana: " + fruitSet.remove("Banana")); // true
        System.out.println("Removing Grape (not present): " + fruitSet.remove("Grape")); // false
        System.out.println("Set after removing Banana: " + fruitSet);

        // 6. Iterating through a HashSet
        System.out.println("Iterating using enhanced for loop:");
        for (String fruit : fruitSet) {
            // Handle null if present, as methods like toUpperCase() would fail
            if (fruit != null) {
                System.out.println(fruit.toUpperCase());
            } else {
                System.out.println("null");
            }
        }

        System.out.println("\nIterating using an Iterator:");
        Iterator<String> iterator = fruitSet.iterator();
        while (iterator.hasNext()) {
            String fruit = iterator.next();
            System.out.println(fruit);
            // To remove an element safely during iteration (optional):
            // if ("Apple".equals(fruit)) {
            //     iterator.remove(); // Removes "Apple" from fruitSet
            // }
        }
        // System.out.println("Set after iterator removal: " + fruitSet);

        // 7. Checking if the set is empty
        System.out.println("Is the set empty? " + fruitSet.isEmpty()); // false

        // 8. Clearing the set
        fruitSet.clear();
        System.out.println("Set after clear(): " + fruitSet);
        System.out.println("Is the set empty after clear? " + fruitSet.isEmpty()); // true
    }
}


//        - `LinkedHashSet<E>`: Maintains insertion order. Extends HashSet.
//          - Slower for additions than HashSet but provides predictable iteration order (the order in which elements were inserted).
//          - Performance is still generally good, close to HashSet.

// Example of LinkedHashSet:
// Note: Assuming imports from previous example (java.util.Set) are available in context
// or would be added if this class were in its own file.
import java.util.LinkedHashSet; // Specific import for LinkedHashSet
// import java.util.Set; // Already imported above usually

public class LinkedHashSetExample {
    public static void main(String[] args) {
        // 1. Creating a LinkedHashSet
        Set<Integer> numbers = new LinkedHashSet<>();

        // 2. Adding elements - they will be stored in insertion order
        numbers.add(10);
        numbers.add(5);
        numbers.add(20);
        numbers.add(5); // Duplicate, will be ignored
        numbers.add(15);

        System.out.println("LinkedHashSet elements (insertion order): " + numbers); // Expected: [10, 5, 20, 15]

        // 3. Removing an element
        numbers.remove(20);
        System.out.println("After removing 20: " + numbers); // Expected: [10, 5, 15]

        // 4. Iterating (order is maintained)
        System.out.println("Iterating (maintains insertion order):");
        for (Integer num : numbers) {
            System.out.println(num);
        }
        // Other operations (size, contains, isEmpty, clear) work similarly to HashSet.
    }
}


//        - `TreeSet<E>`: Stores elements in sorted order (natural order or by a `Comparator`).
//                        Does not allow nulls (by default, unless comparator handles them). Implements `NavigableSet<E>`.
//          - Elements are sorted according to their natural ordering (if they implement `Comparable`)
//            or by a `Comparator` provided at TreeSet creation time.
//          - Performance is O(log n) for add, remove, and contains due to its tree-based structure (Red-Black tree).
//          - Useful when you need a set that is always sorted.

// Example of TreeSet (Natural Ordering for Strings):
import java.util.TreeSet; // Specific import
// import java.util.Set; // Already imported

public class TreeSetNaturalOrderExample {
    public static void main(String[] args) {
        // 1. Creating a TreeSet (stores elements in natural sorted order)
        Set<String> names = new TreeSet<>();

        // 2. Adding elements
        names.add("Charlie");
        names.add("Alice");
        names.add("Bob");
        names.add("David");
        names.add("Alice"); // Duplicate, ignored

        // Elements will be printed in alphabetical (natural) order
        System.out.println("TreeSet elements (natural order): " + names); // Expected: [Alice, Bob, Charlie, David]

        // TreeSet does not allow null elements by default
        try {
            names.add(null);
        } catch (NullPointerException e) {
            System.out.println("Attempted to add null to TreeSet: " + e.getClass().getSimpleName() + " - " + e.getMessage());
        }

        // NavigableSet specific methods (TreeSet implements NavigableSet)
        // To use NavigableSet methods, you can cast or declare the variable as TreeSet
        if (names instanceof TreeSet) { // Check type before casting if necessary
            TreeSet<String> navigableNames = (TreeSet<String>) names;
            System.out.println("First element: " + navigableNames.first());         // Alice
            System.out.println("Last element: " + navigableNames.last());          // David
            System.out.println("Head set before \"Charlie\": " + navigableNames.headSet("Charlie")); // [Alice, Bob]
            System.out.println("Tail set from \"Charlie\" (inclusive): " + navigableNames.tailSet("Charlie")); // [Charlie, David]
            System.out.println("Element lower than Bob: " + navigableNames.lower("Bob"));       // Alice
            System.out.println("Element higher than Bob: " + navigableNames.higher("Bob"));     // Charlie
        }
        // Other operations (size, contains, remove, isEmpty, clear) work as expected.
    }
}


// Example of TreeSet with Custom Objects and Comparator:
// import java.util.TreeSet; // Already imported
// import java.util.Set; // Already imported
import java.util.Comparator; // Import for Comparator

class Book implements Comparable<Book> { // Option 1: Implement Comparable for natural ordering
    String title;
    int year;

    public Book(String title, int year) {
        this.title = title;
        this.year = year;
    }

    @Override
    public String toString() {
        return title + " (" + year + ")";
    }

    // Natural ordering by title
    @Override
    public int compareTo(Book other) {
        return this.title.compareTo(other.title);
    }

    // Important: If compareTo/equals are inconsistent, TreeSet might behave unexpectedly.
    // Generally, if compareTo returns 0, equals should return true for consistency with Set contract.
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        Book book = (Book) obj;
        // For TreeSet, consistency with compareTo is paramount.
        // If titles are the same, compareTo would return 0.
        return title.equals(book.title) && year == book.year; // A full equality check
    }

    @Override
    public int hashCode() {
        // Consistent with the fields used in equals
        int result = title.hashCode();
        result = 31 * result + year;
        return result;
    }
}

// Option 2: Use a Comparator for custom/external sorting logic
class BookYearComparator implements Comparator<Book> {
    @Override
    public int compare(Book b1, Book b2) {
        if (b1.year != b2.year) {
            return Integer.compare(b1.year, b2.year); // Sort by year first
        }
        return b1.title.compareTo(b2.title); // Then by title if years are the same
    }
}

public class TreeSetCustomObjectExample {
    public static void main(String[] args) {
        // Using natural ordering defined in Book class (by title)
        Set<Book> booksByTitle = new TreeSet<>();
        booksByTitle.add(new Book("The Great Gatsby", 1925));
        booksByTitle.add(new Book("To Kill a Mockingbird", 1960));
        booksByTitle.add(new Book("1984", 1949));
        System.out.println("Books sorted by title (natural order): " + booksByTitle);

        // Using a custom Comparator (by year, then title)
        Set<Book> booksByYear = new TreeSet<>(new BookYearComparator());
        // Or using a lambda for the comparator (Java 8+)
        // Set<Book> booksByYear = new TreeSet<>((b1, b2) -> {
        //     if (b1.year != b2.year) {
        //         return Integer.compare(b1.year, b2.year);
        //     }
        //     return b1.title.compareTo(b2.title);
        // });

        booksByYear.add(new Book("The Great Gatsby", 1925));
        booksByYear.add(new Book("To Kill a Mockingbird", 1960));
        booksByYear.add(new Book("1984", 1949));
        booksByYear.add(new Book("Brave New World", 1932));
        System.out.println("Books sorted by year (custom comparator): " + booksByYear);
    }
}

//    - `Queue<E>`: Collection used to hold elements prior to processing (FIFO - First-In, First-Out).
//        - `PriorityQueue<E>`: Elements are ordered based on natural ordering or a `Comparator`.
//        - `LinkedList<E>`: Also implements `Queue` and `Deque`.
//        - `ArrayDeque<E>`: Resizable array implementation of `Deque`. More efficient than `Stack` and `LinkedList` for stack/queue.
//    - `Deque<E>` (Double Ended Queue): Supports element insertion and removal at both ends.
//        - `ArrayDeque<E>`
//        - `LinkedList<E>`
//    - `Map<K, V>`: Object that maps keys to values. Keys must be unique. (Not a true `Collection`)
//        - `HashMap<K, V>`: Uses hash table. No guaranteed order. Allows one null key and multiple null values.
//        - `LinkedHashMap<K, V>`: Maintains insertion order or access order. Extends HashMap.
//        - `TreeMap<K, V>`: Stores key-value pairs in sorted order of keys. Implements `NavigableMap<K, V>`.
//        - `Hashtable<K, V>`: Synchronized version of HashMap (legacy, prefer `ConcurrentHashMap` or external sync). Does not allow null keys or values.

// 3. Iterating Through Collections
//    - `Iterator<E>`:
//        // `hasNext()`, `next()`, `remove()`
//        // Iterator<String> iterator = myList.iterator();
//        // while (iterator.hasNext()) { String element = iterator.next(); ... }
//    - Enhanced `for` loop (for-each):
//        // `for (String element : myList) { ... }`
//    - `ListIterator<E>` (for Lists only):
//        // Bidirectional traversal (`hasPrevious()`, `previous()`).
//        // `add()`, `set()`.
//    - `forEach` method (Java 8+):
//        // `myList.forEach(element -> System.out.println(element));`
//        // `myMap.forEach((key, value) -> System.out.println(key + ": " + value));`

// 4. Sorting Collections
//    - `Comparable<T>` interface:
//        - Implemented by the class whose objects are to be sorted (defines natural ordering).
//        - `int compareTo(T other)` method.
//    - `Comparator<T>` interface:
//        - For custom sorting logic or sorting classes you don't own.
//        - `int compare(T o1, T o2)` method.
//        - Can be passed to `Collections.sort()` or `List.sort()`, and to constructors of sorted collections like `TreeSet`, `TreeMap`.
//    - `Collections.sort(List<T> list)`
//    - `Collections.sort(List<T> list, Comparator<? super T> c)`
//    - `List.sort(Comparator<? super T> c)` (Java 8+)
//    - Arrays.sort() for arrays.

// 5. The `Collections` Utility Class
//    - Provides static utility methods for collections (e.g., `sort()`, `reverse()`, `shuffle()`, `binarySearch()`, `max()`, `min()`, `frequency()`, `synchronizedXXX()`, `unmodifiableXXX()`, `emptyList()`, `singleton()`).

// 6. Working with `Map`
//    - `put(K key, V value)`
//    - `get(Object key)`
//    - `remove(Object key)`
//    - `containsKey(Object key)`
//    - `containsValue(Object value)`
//    - `keySet()` (returns a `Set<K>` of keys)
//    - `values()` (returns a `Collection<V>` of values)
//    - `entrySet()` (returns a `Set<Map.Entry<K,V>>` of key-value pairs)
//        // for (Map.Entry<String, Integer> entry : myMap.entrySet()) { ... }

/*
================================================================================
VII. GENERICS
================================================================================
*/

// 1. What are Generics?
//    - Enable types (classes and interfaces) to be parameters when defining classes, interfaces, and methods.
//    - Provides compile-time type safety (catches type errors at compile time rather than runtime).
//    - Eliminates the need for explicit type casting.
//    - Example without generics vs. with generics:
//        // List list = new ArrayList(); list.add("hello"); String s = (String) list.get(0); // cast needed
//        // List<String> genericList = new ArrayList<>(); genericList.add("hello"); String s2 = genericList.get(0); // no cast

// 2. Generic Classes and Interfaces
//    // public class Box<T> { // T is the type parameter
//    //     private T content;
//    //     public void setContent(T content) { this.content = content; }
//    //     public T getContent() { return content; }
//    // }
//    // Box<Integer> integerBox = new Box<>();
//    // Box<String> stringBox = new Box<String>(); // Diamond operator <> (Java 7+) for type inference

// 3. Generic Methods
//    - Methods that introduce their own type parameters.
//    // public static <E> void printArray(E[] inputArray) {
//    //    for (E element : inputArray) { System.out.printf("%s ", element); }
//    //    System.out.println();
//    // }
//    // Integer[] intArray = {1,2,3}; printArray(intArray);

// 4. Bounded Type Parameters
//    - Restrict the types that can be used as type arguments.
//    - `extends` keyword (for upper bounds):
//        // `<T extends Number>` (T can be Number or any subclass of Number like Integer, Double)
//        // `<T extends SomeClass & SomeInterface>` (Multiple bounds)
//    - `super` keyword (for lower bounds, less common in declaration, more in wildcards).

// 5. Wildcards
//    - Represent an unknown type. Denoted by `?`.
//    - Upper Bounded Wildcards (`? extends Type`):
//        - Represents `Type` or any subtype of `Type`.
//        - Useful for collections you only read from (producer extends).
//        // `public void processList(List<? extends Number> list) { ... }`
//    - Lower Bounded Wildcards (`? super Type`):
//        - Represents `Type` or any supertype of `Type`.
//        - Useful for collections you only write to (consumer super).
//        // `public void addNumbers(List<? super Integer> list) { list.add(new Integer(10)); }`
//    - Unbounded Wildcards (`?`):
//        - Represents any type.
//        // `public void printList(List<?> list) { for(Object o : list) { System.out.println(o); } }`

// 6. Type Erasure (Briefly)
//    - How generics are implemented in Java.
//    - Generic type information is "erased" by the compiler and replaced with casts or bridge methods.
//    - Generics are a compile-time feature. Bytecode contains no generic type information (mostly).
//    - Implications: Cannot do `new T()`, `T instanceof SomeClass`, `T.class`.

/*
================================================================================
VIII. INPUT/OUTPUT (I/O) STREAMS
================================================================================
*/

// 1. Overview of Java I/O
//    - Streams: Sequence of data.
//    - Byte Streams: For binary data (images, audio, video, any raw byte data).
//        - `InputStream`, `OutputStream` (abstract superclasses).
//    - Character Streams: For text data (handles character encoding).
//        - `Reader`, `Writer` (abstract superclasses).
//    - Decorator Pattern is heavily used (e.g., `BufferedInputStream` wraps `FileInputStream`).

// 2. Byte Streams
//    - `FileInputStream` / `FileOutputStream`: For reading from/writing to files.
//    - `BufferedInputStream` / `BufferedOutputStream`: Adds buffering for efficiency.
//    - `DataInputStream` / `DataOutputStream`: For reading/writing primitive Java data types in a portable way.
//    - `ObjectInputStream` / `ObjectOutputStream`: For object serialization.
//    // Example: Reading a file byte by byte
//    // try (FileInputStream fis = new FileInputStream("input.dat")) {
//    //     int byteData;
//    //     while ((byteData = fis.read()) != -1) { /* process byteData */ }
//    // } catch (IOException e) { e.printStackTrace(); }

// 3. Character Streams
//    - `FileReader` / `FileWriter`: For reading from/writing to text files.
//    - `BufferedReader` / `BufferedWriter`: Adds buffering for efficiency.
//        - `BufferedReader.readLine()` is very useful.
//    - `InputStreamReader` / `OutputStreamWriter`: Bridges between byte streams and character streams (specify charset).
//    - `PrintWriter`: Convenient for writing formatted text representations of objects.
//    // Example: Reading a text file line by line
//    // try (BufferedReader br = new BufferedReader(new FileReader("input.txt"))) {
//    //     String line;
//    //     while ((line = br.readLine()) != null) { /* process line */ }
//    // } catch (IOException e) { e.printStackTrace(); }

// 4. `File` Class
//    - Represents a file or directory path.
//    - Not for content manipulation, but for file/directory operations.
//    - Methods: `exists()`, `isFile()`, `isDirectory()`, `getName()`, `getPath()`, `getAbsolutePath()`,
//               `length()`, `mkdir()`, `mkdirs()`, `delete()`, `renameTo()`, `listFiles()`.
//    // File myFile = new File("path/to/my/file.txt");

// 5. Object Serialization
//    - Converting an object's state into a byte stream (to store it in a file, send over network).
//    - Deserialization is the reverse process.
//    - Class must implement `java.io.Serializable` (marker interface).
//    - `ObjectOutputStream.writeObject()`
//    - `ObjectInputStream.readObject()`
//    - `transient` keyword: Exclude fields from serialization.
//    - `serialVersionUID`: For version control of serialized classes.

// 6. NIO (New I/O - java.nio package) - Brief Overview
//    - Introduced in Java 1.4 for more efficient I/O operations.
//    - Key concepts:
//        - Channels: Connections to I/O devices (files, sockets).
//        - Buffers: Containers for data (e.g., `ByteBuffer`).
//        - Selectors: For non-blocking I/O with multiple channels.
//    - `java.nio.file` package (Java 7+): Modern API for file system operations (`Path`, `Paths`, `Files`).
//        // Path path = Paths.get("my/file.txt");
//        // try (BufferedReader reader = Files.newBufferedReader(path)) { ... }
//        // Files.readAllLines(path), Files.write(path, bytes)

/*
================================================================================
IX. CONCURRENCY AND MULTITHREADING (Intermediate Basics)
================================================================================
*/

// 1. Introduction to Threads and Processes
//    - Process: An instance of a program in execution.
//    - Thread: A lightweight subprocess, a single path of execution within a process.
//    - Benefits of multithreading: Responsiveness, resource sharing, parallelism.

// 2. Creating Threads
//    - Extending the `Thread` class:
//        // class MyThread extends Thread {
//        //     @Override public void run() { /* thread logic */ }
//        // }
//        // MyThread t = new MyThread(); t.start();
//    - Implementing the `Runnable` interface (preferred approach):
//        // class MyRunnable implements Runnable {
//        //     @Override public void run() { /* thread logic */ }
//        // }
//        // Thread t = new Thread(new MyRunnable()); t.start();
//    - `start()` vs. `run()`: `start()` creates a new thread and calls `run()`. Calling `run()` directly executes in the current thread.

// 3. Thread Lifecycle
//    - NEW, RUNNABLE, BLOCKED, WAITING, TIMED_WAITING, TERMINATED.
//    - `Thread.sleep(long millis)`: Pauses current thread.
//    - `Thread.yield()`: Hint to scheduler to run other threads.
//    - `thread.join()`: Waits for a thread to terminate.
//    - `thread.isAlive()`
//    - Daemon threads vs. User threads (`setDaemon(true)`).

// 4. Synchronization (Handling Shared Resources)
//    - Race conditions and data inconsistency.
//    - `synchronized` keyword:
//        - Synchronized Methods: Only one thread can execute a synchronized method of an object at a time.
//          // `public synchronized void myMethod() { ... }` (locks on `this` object)
//        - Synchronized Blocks: Synchronize access to a specific block of code on a specific object's monitor.
//          // `synchronized(lockObject) { /* critical section */ }`
//        - Static synchronized methods lock on the Class object.
//    - `volatile` keyword: Ensures visibility of changes to variables across threads (but not atomicity).
//    - Deadlocks: Situations where two or more threads are blocked forever, waiting for each other.

// 5. Basic Thread Communication (Inter-thread communication)
//    - `Object.wait()`: Causes current thread to release the lock and wait until another thread invokes `notify()` or `notifyAll()` on the same object.
//    - `Object.notify()`: Wakes up a single thread waiting on this object's monitor.
//    - `Object.notifyAll()`: Wakes up all threads waiting on this object's monitor.
//    - Must be called from within a synchronized context on the object whose lock is held.
//    - Producer-Consumer problem is a classic example.

// 6. `java.util.concurrent` Package (Concurrency Utilities - Introduction)
//    - Provides higher-level concurrency utilities.
//    - `Executor` and `ExecutorService`: For managing thread pools.
//        // `ExecutorService executor = Executors.newFixedThreadPool(5);`
//        // `executor.submit(new MyRunnable());`
//        // `executor.shutdown();`
//    - `Callable<V>` and `Future<V>`: For tasks that return a result and can be cancelled.
//    - Atomic Variables (e.g., `AtomicInteger`): For atomic operations without explicit locking.
//    - Locks (`Lock` interface, `ReentrantLock`): More flexible than `synchronized`.
//    - Concurrent Collections (e.g., `ConcurrentHashMap`, `CopyOnWriteArrayList`).

/*
================================================================================
X. LAMBDA EXPRESSIONS AND FUNCTIONAL INTERFACES (JAVA 8+)
================================================================================
*/

// 1. Introduction to Functional Programming Concepts in Java
//    - Treating functions as first-class citizens (though Java does it via objects representing functions).
//    - Immutability, pure functions (ideals).

// 2. Lambda Expressions
//    - Anonymous functions, concise way to represent an instance of a functional interface.
//    - Syntax:
//        // `(parameters) -> expression`
//        // `(parameters) -> { statements; }`
//        // `() -> System.out.println("Hello");`
//        // `(int a, int b) -> a + b;`
//        // `(String s) -> s.length();` (type inference often allows `s -> s.length();`)
//    - Effectively final variables in enclosing scope can be accessed.

// 3. Functional Interfaces
//    - An interface with exactly one abstract method (SAM - Single Abstract Method).
//    - `@FunctionalInterface` annotation (optional, but good for compiler check).
//    - Examples from `java.util.function` package:
//        - `Predicate<T>`: `boolean test(T t)` (e.g., `n -> n > 0`)
//        - `Consumer<T>`: `void accept(T t)` (e.g., `s -> System.out.println(s)`)
//        - `Function<T, R>`: `R apply(T t)` (e.g., `String::length`)
//        - `Supplier<T>`: `T get()` (e.g., `() -> new Random().nextInt()`)
//        - `UnaryOperator<T>`: `T apply(T t)` (extends Function<T,T>)
//        - `BinaryOperator<T>`: `T apply(T t1, T t2)` (extends BiFunction<T,T,T>)
//    - Lambda expressions are used to provide implementations for these functional interfaces.

// 4. Method References
//    - A shorthand syntax for a lambda expression that executes only ONE method.
//    - Types:
//        - Reference to a static method: `ClassName::staticMethodName` (e.g., `Math::abs`)
//        - Reference to an instance method of a particular object: `objectReference::instanceMethodName` (e.g., `myString::length`)
//        - Reference to an instance method of an arbitrary object of a particular type: `ClassName::instanceMethodName` (e.g., `String::toUpperCase`)
//        - Reference to a constructor: `ClassName::new` (e.g., `ArrayList::new`)

// 5. Stream API (Intermediate Usage)
//    - A sequence of elements supporting sequential and parallel aggregate operations.
//    - Not a data structure, does not store elements.
//    - Source -> Intermediate Operations (0 or more) -> Terminal Operation (1).
//    - Creating Streams:
//        // `myList.stream()`
//        // `Arrays.stream(myArray)`
//        // `Stream.of("a", "b", "c")`
//        // `Stream.generate(Supplier<T> s)`
//        // `Stream.iterate(T seed, UnaryOperator<T> f)`
//    - Intermediate Operations (return a new Stream, lazy):
//        - `filter(Predicate<T> predicate)`
//        - `map(Function<T, R> mapper)` (transforms elements)
//        - `flatMap(Function<T, Stream<R>> mapper)` (maps each element to a stream, then flattens results)
//        - `distinct()`
//        - `sorted()` / `sorted(Comparator<T> comparator)`
//        - `peek(Consumer<T> action)` (for debugging)
//        - `limit(long maxSize)`
//        - `skip(long n)`
//    - Terminal Operations (produce a result or side-effect, eager):
//        - `forEach(Consumer<T> action)`
//        - `collect(Collector<T, A, R> collector)` (e.g., `Collectors.toList()`, `Collectors.toSet()`, `Collectors.toMap()`, `Collectors.joining()`, `Collectors.groupingBy()`)
//        - `toArray()`
//        - `reduce(BinaryOperator<T> accumulator)` / `reduce(T identity, BinaryOperator<T> accumulator)`
//        - `count()`
//        - `min(Comparator<T> comparator)` / `max(Comparator<T> comparator)`
//        - `anyMatch(Predicate<T> predicate)`
//        - `allMatch(Predicate<T> predicate)`
//        - `noneMatch(Predicate<T> predicate)`
//        - `findFirst()` (returns `Optional<T>`)
//        - `findAny()` (returns `Optional<T>`, useful for parallel streams)
//    - `Optional<T>` class:
//        - A container object which may or may not contain a non-null value.
//        - Used to avoid `NullPointerException`.
//        - `Optional.of(value)`, `Optional.ofNullable(value)`, `Optional.empty()`
//        - `isPresent()`, `get()`, `orElse(other)`, `orElseGet(Supplier)`, `orElseThrow(Supplier)`.
//    - Parallel Streams (`myList.parallelStream()`): For leveraging multi-core processors.

/*
================================================================================
XI. DATE AND TIME API (JAVA 8+ - java.time)
================================================================================
*/

// 1. Problems with Legacy Date/Time (java.util.Date, java.util.Calendar)
//    - Mutable, not thread-safe, poor API design, 0-indexed months.

// 2. Core Classes in `java.time` (Immutable and Thread-Safe)
//    - `LocalDate`: Represents a date (year, month, day) without time-of-day and time-zone.
//        // `LocalDate today = LocalDate.now();`
//        // `LocalDate specificDate = LocalDate.of(2023, Month.DECEMBER, 25);`
//    - `LocalTime`: Represents a time (hour, minute, second, nanosecond) without date and time-zone.
//        // `LocalTime now = LocalTime.now();`
//        // `LocalTime specificTime = LocalTime.of(10, 30, 0);`
//    - `LocalDateTime`: Represents a date-time without a time-zone.
//        // `LocalDateTime currentDateTime = LocalDateTime.now();`
//        // `LocalDateTime specificDateTime = LocalDateTime.of(specificDate, specificTime);`
//    - `ZonedDateTime`: Represents a date-time with a time-zone.
//        // `ZoneId zoneId = ZoneId.of("Europe/Paris");`
//        // `ZonedDateTime zonedDt = ZonedDateTime.now(zoneId);`
//    - `Instant`: Represents a specific point on the timeline (nanosecond precision), typically UTC.
//    - `Period`: Represents a quantity of time in terms of years, months, and days (e.g., "2 years, 3 months, and 5 days").
//        // `Period period = Period.between(startDate, endDate);`
//    - `Duration`: Represents a quantity of time in terms of seconds and nanoseconds (e.g., "10.5 seconds").
//        // `Duration duration = Duration.between(startTime, endTime);`
//    - Common methods: `now()`, `of()`, `plusXxx()`, `minusXxx()`, `withXxx()`, `getYear()`, `getMonth()`, `getDayOfMonth()`, etc.

// 3. Formatting and Parsing
//    - `DateTimeFormatter`: For formatting date-time objects into strings and parsing strings into date-time objects.
//        // `DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");`
//        // `String formatted = localDateTime.format(formatter);`
//        // `LocalDateTime parsed = LocalDateTime.parse(text, formatter);`
//        - Predefined formatters (e.g., `DateTimeFormatter.ISO_DATE_TIME`).

/*
================================================================================
XII. JAVA FOR APPLICATION DEVELOPMENT
================================================================================
*/

// 1. Build Tools (Managing Dependencies and Project Lifecycle)
//    - Why use build tools? (Dependency management, consistent builds, automation).
//    - Apache Maven:
//        - `pom.xml` (Project Object Model): Configuration file.
//            - `<groupId>`, `<artifactId>`, `<version>` (GAV coordinates).
//            - `<dependencies>` section.
//            - `<plugins>` section.
//            - Repositories (e.g., Maven Central).
//        - Standard Directory Layout.
//        - Common Maven goals/phases: `clean`, `compile`, `test`, `package`, `install`, `deploy`.
//        // Example dependency:
//        // <dependency>
//        //     <groupId>com.fasterxml.jackson.core</groupId>
//        //     <artifactId>jackson-databind</artifactId>
//        //     <version>2.13.0</version>
//        // </dependency>
//    - Gradle:
//        - `build.gradle` (Groovy or Kotlin DSL): Configuration file.
//        - More flexible and often faster builds than Maven.
//        - Dependencies: `implementation 'group:name:version'`.
//        - Tasks.
//        - Gradle Wrapper (`gradlew`).
//    - IDE Integration with Build Tools.

// 2. Working with External Libraries / APIs
//    - JSON Processing:
//        - What is JSON? (JavaScript Object Notation).
//        - Common libraries:
//            - Jackson (ObjectMapper: `readValue()`, `writeValueAsString()`).
//            - Gson (Google's JSON library: `fromJson()`, `toJson()`).
//        - Annotations for mapping Java objects to JSON and vice-versa.
//    - HTTP Clients (Making network requests):
//        - `java.net.http.HttpClient` (Java 11+): Modern, built-in.
//            // `HttpRequest`, `HttpResponse`, asynchronous operations.
//        - Apache HttpClient (Mature, feature-rich).
//        - OkHttp (Popular, efficient, used in Android too).
//        - Making GET, POST, PUT, DELETE requests. Handling headers, request body, response codes.
//    - Logging:
//        - Why logging? (Debugging, monitoring, auditing).
//        - Logging Frameworks vs. Facades:
//            - Facades: SLF4J (Simple Logging Facade for Java).
//            - Implementations: Logback (native SLF4J impl), Log4j2, java.util.logging (JUL).
//        - Configuration (e.g., `logback.xml`).
//        - Log levels (TRACE, DEBUG, INFO, WARN, ERROR).
//        // import org.slf4j.Logger;
//        // import org.slf4j.LoggerFactory;
//        // private static final Logger logger = LoggerFactory.getLogger(MyClass.class);
//        // logger.info("This is an info message with param: {}", someValue);

// 3. Basic Design Patterns (Problem-solving templates)
//    - Importance of design patterns (reusable solutions, common vocabulary).
//    - Creational Patterns:
//        - Singleton Pattern: Ensure a class has only one instance and provide a global point of access to it.
//        - Factory Pattern (Simple Factory, Factory Method): Define an interface for creating an object, but let subclasses decide which class to instantiate.
//        - Builder Pattern: Construct complex objects step by step. Good for objects with many optional parameters.
//    - Structural Patterns:
//        - Adapter Pattern: Convert the interface of a class into another interface clients expect.
//        - Decorator Pattern: Attach additional responsibilities to an object dynamically.
//        - Facade Pattern: Provide a unified interface to a set of interfaces in a subsystem.
//    - Behavioral Patterns:
//        - Observer Pattern: Define a one-to-many dependency between objects so that when one object changes state, all its dependents are notified and updated automatically. (e.g., event listeners).
//        - Strategy Pattern: Define a family of algorithms, encapsulate each one, and make them interchangeable.
//        - Template Method Pattern: Define the skeleton of an algorithm in an operation, deferring some steps to subclasses.
//    - MVC (Model-View-Controller) - Architectural Pattern:
//        - Model: Data and business logic.
//        - View: User interface, presentation of data.
//        - Controller: Handles user input, interacts with Model and View.
//        - Promotes separation of concerns.

// 4. Testing in Java
//    - Importance of testing (ensuring correctness, facilitating refactoring).
//    - JUnit (Most popular Java testing framework):
//        - JUnit 5 (Jupiter): `@Test`, `@DisplayName`, `@BeforeEach`, `@AfterEach`, `@BeforeAll`, `@AfterAll`.
//        - Assertions: `assertEquals()`, `assertTrue()`, `assertNotNull()`, `assertThrows()`, etc.
//        - Writing testable code.
//    - Test-Driven Development (TDD) - Concept:
//        - Red-Green-Refactor cycle.
//    - Mocking:
//        - Creating mock objects to test units in isolation.
//        - Mockito framework (briefly: `@Mock`, `when().thenReturn()`, `verify()`).
//    - Integration Testing vs. Unit Testing.

// 5. Database Connectivity (JDBC - Java Database Connectivity)
//    - API for connecting and executing queries with a database.
//    - Core JDBC components:
//        - `DriverManager`: Manages database drivers.
//        - `Connection`: Represents a connection to the database.
//        - `Statement`: Used for executing static SQL queries.
//        - `PreparedStatement`: Used for executing parameterized (precompiled) SQL queries (prevents SQL injection).
//        - `ResultSet`: Represents the result of a database query.
//    - Steps:
//        1. Load the JDBC driver (e.g., `Class.forName("com.mysql.cj.jdbc.Driver");` - often automatic now).
//        2. Establish a connection (`DriverManager.getConnection(url, user, password)`).
//        3. Create a `Statement` or `PreparedStatement`.
//        4. Execute the query (`executeQuery()` for SELECT, `executeUpdate()` for INSERT/UPDATE/DELETE).
//        5. Process the `ResultSet` (if any).
//        6. Close resources (`ResultSet`, `Statement`, `Connection`) in a `finally` block or use try-with-resources.
//    - Connection Pooling:
//        - Managing a pool of database connections for better performance and resource management.
//        - Libraries like HikariCP, Apache Commons DBCP.
//    - ORM (Object-Relational Mapping) - Brief mention (e.g., Hibernate, JPA):
//        - Maps Java objects to database tables, abstracts away JDBC complexity.

// 6. Desktop GUI Development (Briefly, as one form of "App Development")
//    - Swing (Older, part of core Java - `javax.swing`):
//        - Components: `JFrame`, `JPanel`, `JButton`, `JLabel`, `JTextField`, `JTextArea`, `JTable`, `JList`, etc.
//        - Layout Managers: `BorderLayout`, `FlowLayout`, `GridLayout`, `GridBagLayout`, `BoxLayout`.
//        - Event Handling: `ActionListener`, `MouseListener`, etc. (Event-driven programming).
//    - JavaFX (More modern, separate module/library since Java 11 - `javafx.*`):
//        - Richer set of UI controls, supports CSS styling, FXML for UI definition.
//        - Core concepts: `Application`, `Stage` (window), `Scene` (content within stage).
//        - Properties and Bindings.
//        - Scene Builder for visual UI design.
//    - Consider if this is the type of "app development" intended. Modern app dev often implies web or mobile.

// 7. Introduction to Web/Enterprise Application Development (Awareness)
//    - Servlets & JSP (JavaServer Pages): Foundational Java web technologies.
//    - Spring Framework / Spring Boot:
//        - Very popular for building robust enterprise and web applications.
//        - Dependency Injection, Aspect-Oriented Programming.
//        - Spring MVC for web apps, Spring Data for database access, Spring Security, etc.
//        - Spring Boot simplifies Spring application setup.
//    - Jakarta EE (formerly Java EE): Standards for enterprise applications.

// 8. JAR Files and Deployment
//    - JAR (Java Archive) files: Package multiple .class files, resources, and metadata into a single file.
//    - Creating JAR files using `jar` command-line tool or IDE.
//    - Manifest file (`MANIFEST.MF`): Can specify the main class for executable JARs.
//    - Running executable JARs: `java -jar myapp.jar`.
//    - Classpath issues with JARs. Uber JARs / Shaded JARs (including dependencies).

/*
================================================================================
XIII. JAVA PLATFORM MODULE SYSTEM (JPMS - JAVA 9+)
================================================================================
*/

// 1. Introduction to JPMS (Project Jigsaw)
//    - Modularity for the JDK and applications.
//    - Goals: Reliability, security, maintainability, performance.
// 2. Modules
//    - A named, self-describing collection of code and data.
//    - `module-info.java` file: Defines a module.
//        - `module my.module.name { ... }`
//        - `requires other.module;` (dependencies)
//        - `exports package.name;` (makes package public)
//        - `opens package.name;` (allows deep reflection)
//        - `uses service.interface;`
//        - `provides service.interface with implementation.class;`
// 3. Benefits and Challenges
//    - Strong encapsulation at module level.
//    - Reduced application size (custom JREs with `jlink`).
//    - Migration challenges for older applications (classpath vs. module path).

/*
================================================================================
XIV. BEST PRACTICES AND FURTHER LEARNING
================================================================================
*/

// 1. Java Coding Conventions
//    - Naming (Classes, Interfaces, Methods, Variables, Constants).
//    - Indentation and Formatting.
//    - Comments and Javadoc.
//    - (Refer to Oracle's or Google's Java style guides).

// 2. Effective Java (Key Principles - inspired by Joshua Bloch's book)
//    - Prefer `static factory methods` over constructors (sometimes).
//    - `equals()` and `hashCode()` contract.
//    - `toString()` for informative representation.
//    - Minimize mutability.
//    - Favor composition over inheritance.
//    - Program to interfaces, not implementations.
//    - Use exceptions for exceptional conditions only.
//    - Prefer standard exceptions.
//    - ... (many more)

// 3. Debugging Techniques
//    - Using an IDE debugger (breakpoints, stepping through code, inspecting variables).
//    - `System.out.println()` (simple but sometimes effective).
//    - Logging.
//    - Analyzing stack traces.

// 4. Memory Management and Garbage Collection (Conceptual Overview)
//    - Java Heap (Young Generation, Old Generation).
//    - How Garbage Collection works (Mark and Sweep, Generational GC).
//    - `System.gc()` - a suggestion, not a command.
//    - Avoiding memory leaks (e.g., unclosed resources, lingering object references).
//    - Performance tuning related to GC (briefly).

// 5. Further Resources
//    - Official Java Documentation (Oracle, OpenJDK).
//    - Books: "Effective Java" (Joshua Bloch), "Head First Java", "Java: The Complete Reference".
//    - Online Courses: Oracle University, Coursera, Udemy, Pluralsight, etc.
//    - Online Communities: Stack Overflow, Reddit (r/java), Java User Groups (JUGs).
//    - Keep up with new Java versions and features (Java releases every 6 months now).

// 6. Version Control with Git (Essential for any app development)
//    - Basic Git commands: `init`, `add`, `commit`, `status`, `log`, `branch`, `checkout`, `merge`, `push`, `pull`.
//    - Importance of `.gitignore` file for Java projects (e.g., ignore `*.class`, `target/`, `.idea/`, `*.iml`).

// --- End of Java Notes Template ---
