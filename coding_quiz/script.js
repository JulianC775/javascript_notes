// DOM Elements
const quizSetupSection = document.getElementById('quiz-setup');
const quizContainer = document.getElementById('quiz-container');
const resultsContainer = document.getElementById('results-container');
const startQuizBtn = document.getElementById('start-quiz');
const submitAnswerBtn = document.getElementById('submit-answer');
const nextQuestionBtn = document.getElementById('next-question');
const restartQuizBtn = document.getElementById('restart-quiz');
const testApiBtn = document.getElementById('test-api');

const questionText = document.getElementById('question-text');
const codeSnippet = document.getElementById('code-snippet');
const answerOptions = document.getElementById('answer-options');
const fillBlankContainer = document.getElementById('fill-blank-container');
const fillBlankAnswer = document.getElementById('fill-blank-answer');
const trueFalseContainer = document.getElementById('true-false-container');

const currentQuestionSpan = document.getElementById('current-question');
const totalQuestionsSpan = document.getElementById('total-questions');
const timerSpan = document.getElementById('timer');
const scoreSpan = document.getElementById('score');
const totalScoreSpan = document.getElementById('total-score');
const totalTimeSpan = document.getElementById('total-time');
const resultBreakdown = document.getElementById('result-breakdown');

// Quiz state
let currentLanguage = 'javascript';
let currentDifficulty = '';
let currentModule = '';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let timer = 0;
let timerInterval;
let selectedAnswer = null;
let userAnswers = [];
let useApiQuestions = true; // Flag to use QuizAPI

// QuizAPI configuration
const QUIZ_API_KEY = require('../envirokey.js'); // Replace with your actual API key
const QUIZ_API_URL = 'https://quizapi.io/api/v1/questions';

// Questions Database - Fallback for when API is unavailable
const jsQuestions = {
    variables: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which keyword is used to declare a variable in JavaScript?',
                options: ['var', 'variable', 'v', 'declare'],
                correctAnswer: 'var',
                explanation: 'In JavaScript, "var" is one of the keywords used to declare variables.'
            },
            {
                type: 'true-false',
                question: 'JavaScript is a statically typed language.',
                correctAnswer: false,
                explanation: 'JavaScript is a dynamically typed language, meaning variable types are determined at runtime.'
            },
            {
                type: 'fill-blank',
                question: 'To declare a constant variable in JavaScript, you use the keyword _____.',
                correctAnswer: 'const',
                explanation: 'The "const" keyword declares a constant variable whose value cannot be reassigned.'
            },
            {
                type: 'multiple-choice',
                question: 'What is the result of: typeof "Hello World";',
                options: ['string', 'String', 'text', 'value'],
                correctAnswer: 'string',
                explanation: 'The typeof operator returns "string" for string values.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'What is the scope of a variable declared with "let"?',
                options: ['Global scope', 'Function scope', 'Block scope', 'Module scope'],
                correctAnswer: 'Block scope',
                explanation: 'Variables declared with "let" have block scope, meaning they are only accessible within the block they are declared.'
            },
            {
                type: 'true-false',
                question: 'Variables declared with "var" are hoisted to the top of their scope.',
                correctAnswer: true,
                explanation: 'Variables declared with "var" are hoisted to the top of their scope, but are initialized with "undefined" until their declaration is reached.'
            }
        ],
        advanced: [
            {
                type: 'fill-blank',
                question: 'The "temporal dead zone" refers to the period between entering a scope and the _____ of a variable.',
                correctAnswer: 'declaration',
                explanation: 'The temporal dead zone is the period between entering scope and the declaration of a variable where the variable cannot be accessed.'
            },
            {
                type: 'multiple-choice',
                question: 'What happens when you access a "let" or "const" variable before it\'s declared?',
                options: [
                    'It returns undefined',
                    'It throws a ReferenceError',
                    'It returns null',
                    'It automatically initializes with a default value'
                ],
                correctAnswer: 'It throws a ReferenceError',
                explanation: 'Accessing a "let" or "const" variable before its declaration results in a ReferenceError due to the temporal dead zone.'
            }
        ]
    },
    functions: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'How do you declare a function in JavaScript?',
                options: [
                    'function myFunction() {}',
                    'def myFunction() {}',
                    'function: myFunction() {}',
                    'function = myFunction() {}'
                ],
                correctAnswer: 'function myFunction() {}',
                explanation: 'In JavaScript, functions are declared using the "function" keyword followed by the function name and parentheses.'
            },
            {
                type: 'fill-blank',
                question: 'To return a value from a function, you use the _____ keyword.',
                correctAnswer: 'return',
                explanation: 'The "return" keyword is used to specify the value that should be returned from a function.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'What is a closure in JavaScript?',
                options: [
                    'A way to close a browser window',
                    'A function with access to variables from its outer scope',
                    'A method to end a loop',
                    'A way to restrict access to an object'
                ],
                correctAnswer: 'A function with access to variables from its outer scope',
                explanation: 'A closure is a function that has access to variables from its outer scope, even after the outer function has returned.'
            },
            {
                type: 'true-false',
                question: 'Arrow functions in JavaScript have their own "this" context.',
                correctAnswer: false,
                explanation: 'Arrow functions do not have their own "this" context. They inherit "this" from the enclosing scope.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'What is the output of the following code?\n\nconst add = (a) => (b) => a + b;\nconst add5 = add(5);\nconsole.log(add5(3));',
                options: ['5', '3', '8', 'undefined'],
                correctAnswer: '8',
                explanation: 'This is a curried function. add(5) returns a function that adds 5 to its argument. So add5(3) returns 5 + 3 = 8.'
            },
            {
                type: 'fill-blank',
                question: 'A function that calls itself is called a _____ function.',
                correctAnswer: 'recursive',
                explanation: 'A recursive function is a function that calls itself during its execution.'
            }
        ]
    },
    loops: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which loop is guaranteed to execute at least once?',
                options: ['for loop', 'while loop', 'do...while loop', 'for...in loop'],
                correctAnswer: 'do...while loop',
                explanation: 'A do...while loop will always execute at least once before checking the condition.'
            },
            {
                type: 'true-false',
                question: 'The "break" statement can be used to exit a loop early.',
                correctAnswer: true,
                explanation: 'The "break" statement exits a loop immediately, skipping any remaining iterations.'
            }
        ],
        intermediate: [
            {
                type: 'fill-blank',
                question: 'The _____ statement skips the current iteration and continues to the next one.',
                correctAnswer: 'continue',
                explanation: 'The "continue" statement skips the current iteration and moves to the next one without exiting the loop.'
            },
            {
                type: 'multiple-choice',
                question: 'Which loop is used to iterate over the properties of an object?',
                options: ['for loop', 'while loop', 'for...of loop', 'for...in loop'],
                correctAnswer: 'for...in loop',
                explanation: 'The for...in loop is specifically designed to iterate over the enumerable properties of an object.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'What is the output of this code?\n\nlet arr = [1, 2, 3];\nlet result = 0;\nfor (let i = 0; i < arr.length; i++) {\n  if (arr[i] === 2) continue;\n  result += arr[i];\n}\nconsole.log(result);',
                options: ['6', '4', '3', '0'],
                correctAnswer: '4',
                explanation: 'The loop adds 1 and 3, but skips 2 due to the continue statement, resulting in 1 + 3 = 4.'
            },
            {
                type: 'true-false',
                question: 'The for...of loop can be used to iterate over strings, arrays, and other iterable objects, but not plain objects.',
                correctAnswer: true,
                explanation: 'The for...of loop works with iterable objects like arrays and strings, but plain objects are not iterable by default.'
            }
        ]
    },
    conditionals: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which symbol is used for the "not equal to" comparison in JavaScript?',
                options: ['<>', '!=', '!===', '≠'],
                correctAnswer: '!=',
                explanation: 'The "!=" operator checks if two values are not equal, with type conversion if needed.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ operator is used for strict equality comparison in JavaScript.',
                correctAnswer: '===',
                explanation: 'The "===" operator checks if two values are equal without type conversion.'
            }
        ],
        intermediate: [
            {
                type: 'true-false',
                question: 'The ternary operator can be used as a shorthand for if-else statements.',
                correctAnswer: true,
                explanation: 'The ternary operator (condition ? expr1 : expr2) provides a compact way to write simple if-else statements.'
            },
            {
                type: 'multiple-choice',
                question: 'What is the result of: "10" === 10',
                options: ['true', 'false', 'undefined', 'NaN'],
                correctAnswer: 'false',
                explanation: 'The strict equality operator (===) checks both value and type. Since "10" is a string and 10 is a number, they are not strictly equal.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'What is short-circuit evaluation in JavaScript?',
                options: [
                    'A compiler optimization technique',
                    'When an expression is evaluated before the code runs',
                    'When the second operand of && or || is not evaluated if the first operand is sufficient',
                    'A method to prevent infinite loops'
                ],
                correctAnswer: 'When the second operand of && or || is not evaluated if the first operand is sufficient',
                explanation: 'Short-circuit evaluation means that in logical expressions, the second operand is only evaluated if necessary.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ statement is used as an alternative to multiple if-else statements when comparing a single expression against multiple values.',
                correctAnswer: 'switch',
                explanation: 'The switch statement provides a cleaner way to perform multiple comparisons on a single value compared to using multiple if-else statements.'
            }
        ]
    },
    arrays: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'How do you access the first element of an array called "fruits"?',
                options: ['fruits[0]', 'fruits[1]', 'fruits(0)', 'fruits.first()'],
                correctAnswer: 'fruits[0]',
                explanation: 'Arrays in JavaScript are zero-indexed, so the first element is at index 0.'
            },
            {
                type: 'true-false',
                question: 'Arrays in JavaScript can store different types of data.',
                correctAnswer: true,
                explanation: 'JavaScript arrays can store mixed data types, including numbers, strings, objects, and even other arrays.'
            }
        ],
        intermediate: [
            {
                type: 'fill-blank',
                question: 'The _____ method adds one or more elements to the end of an array.',
                correctAnswer: 'push',
                explanation: 'The push() method adds elements to the end of an array and returns the new length.'
            },
            {
                type: 'multiple-choice',
                question: 'Which method removes the last element from an array?',
                options: ['pop()', 'removeLast()', 'delete()', 'splice()'],
                correctAnswer: 'pop()',
                explanation: 'The pop() method removes the last element from an array and returns that element.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'What does the Array.prototype.reduce() method do?',
                options: [
                    'Reduces the size of the array',
                    'Executes a reducer function on each element, resulting in a single output value',
                    'Removes duplicate elements',
                    'Converts array elements to lowercase'
                ],
                correctAnswer: 'Executes a reducer function on each element, resulting in a single output value',
                explanation: 'The reduce() method applies a function against an accumulator and each element to reduce it to a single value.'
            },
            {
                type: 'true-false',
                question: 'The Array.prototype.map() method modifies the original array.',
                correctAnswer: false,
                explanation: 'The map() method creates a new array with the results of calling a function on every element in the original array, without modifying the original.'
            }
        ]
    },
    objects: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'How do you access the property "name" of an object called "person"?',
                options: ['person.name', 'person->name', 'person::name', 'person[name]'],
                correctAnswer: 'person.name',
                explanation: 'The dot notation (object.property) is used to access properties of an object.'
            },
            {
                type: 'fill-blank',
                question: 'To create an empty object in JavaScript, you can write: let obj = _____;',
                correctAnswer: '{}',
                explanation: 'An empty object is created using curly braces {}.'
            }
        ],
        intermediate: [
            {
                type: 'true-false',
                question: 'In JavaScript, object keys are always strings or symbols.',
                correctAnswer: true,
                explanation: 'Even if you use a number as a key, it gets converted to a string internally.'
            },
            {
                type: 'multiple-choice',
                question: 'Which method returns an array of a given object\'s property names?',
                options: ['Object.keys()', 'Object.getProperties()', 'Object.names()', 'Object.getKeys()'],
                correctAnswer: 'Object.keys()',
                explanation: 'Object.keys() returns an array of a given object\'s own enumerable property names.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'What is object destructuring in JavaScript?',
                options: [
                    'Breaking down an object into smaller objects',
                    'A syntax for extracting properties from objects into variables',
                    'Removing properties from an object',
                    'Converting an object to JSON'
                ],
                correctAnswer: 'A syntax for extracting properties from objects into variables',
                explanation: 'Object destructuring is a convenient way to extract multiple properties from objects into variables with a concise syntax.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ method can be used to prevent modifications to an object, making it immutable.',
                correctAnswer: 'Object.freeze',
                explanation: 'Object.freeze() prevents adding, changing, or removing properties from an object, essentially making it immutable.'
            }
        ]
    }
};

// HTML Questions Database
const htmlQuestions = {
    variables: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which HTML tag is used to define the main content of an HTML document?',
                options: ['<main>', '<body>', '<content>', '<section>'],
                correctAnswer: '<main>',
                explanation: 'The <main> tag specifies the main content of a document.'
            },
            {
                type: 'true-false',
                question: 'HTML stands for Hyper Text Markup Language.',
                correctAnswer: true,
                explanation: 'HTML (Hyper Text Markup Language) is the standard markup language for creating web pages.'
            },
            {
                type: 'fill-blank',
                question: 'The HTML tag used for the largest heading is _____.',
                correctAnswer: '<h1>',
                explanation: 'The <h1> tag is used to define the most important heading on a page.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which HTML5 element should be used to mark up a blog article?',
                options: ['<section>', '<blog>', '<article>', '<content>'],
                correctAnswer: '<article>',
                explanation: 'The <article> element represents a self-contained composition in a document that is independently distributable or reusable.'
            },
            {
                type: 'true-false',
                question: 'The <thead> element must be used with the <tbody> element.',
                correctAnswer: false,
                explanation: 'While it\'s good practice to use both, the <thead> element can be used without the <tbody> element.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which attribute specifies an alternate text for an image if the image cannot be displayed?',
                options: ['alt', 'title', 'src', 'href'],
                correctAnswer: 'alt',
                explanation: 'The alt attribute provides alternative information for an image if a user cannot view it.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ attribute in HTML is used to provide a unique identifier for an element.',
                correctAnswer: 'id',
                explanation: 'The id attribute is used to specify a unique id for an HTML element.'
            }
        ]
    },
    functions: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used to contain JavaScript code?',
                options: ['<script>', '<javascript>', '<code>', '<js>'],
                correctAnswer: '<script>',
                explanation: 'The <script> tag is used to embed or reference JavaScript code in an HTML document.'
            },
            {
                type: 'true-false',
                question: 'The <head> element is a container for metadata in HTML.',
                correctAnswer: true,
                explanation: 'The <head> element is a container for metadata (data about data) and is placed between the <html> tag and the <body> tag.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which HTML5 input type would you use for a date picker?',
                options: ['<input type="date">', '<input type="calendar">', '<input type="datetime">', '<input type="time">'],
                correctAnswer: '<input type="date">',
                explanation: 'The <input type="date"> creates a date picker in supported browsers.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ attribute in the <a> tag specifies where to open the linked document.',
                correctAnswer: 'target',
                explanation: 'The target attribute specifies where to open the linked document (e.g., _blank for a new tab).'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used to draw graphics via JavaScript?',
                options: ['<svg>', '<canvas>', '<draw>', '<graphic>'],
                correctAnswer: '<canvas>',
                explanation: 'The <canvas> element is used to draw graphics, on the fly, via JavaScript.'
            },
            {
                type: 'true-false',
                question: 'The srcset attribute is used with the <img> tag to provide responsive images.',
                correctAnswer: true,
                explanation: 'The srcset attribute allows you to specify different images for different device widths.'
            }
        ]
    },
    loops: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which HTML tag is used to define an unordered list?',
                options: ['<ul>', '<ol>', '<li>', '<list>'],
                correctAnswer: '<ul>',
                explanation: 'The <ul> tag defines an unordered (bulleted) list.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ tag defines an item in an HTML list.',
                correctAnswer: '<li>',
                explanation: 'The <li> tag defines a list item in ordered or unordered lists.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used to display data in a tabular form?',
                options: ['<table>', '<tab>', '<grid>', '<tabular>'],
                correctAnswer: '<table>',
                explanation: 'The <table> tag is used to create a table in HTML.'
            },
            {
                type: 'true-false',
                question: 'The <tr> element defines a row in an HTML table.',
                correctAnswer: true,
                explanation: 'The <tr> tag defines a row in an HTML table, containing one or more <td> or <th> elements.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which HTML5 element is used to specify a footer for a document or section?',
                options: ['<bottom>', '<footer>', '<foot>', '<end>'],
                correctAnswer: '<footer>',
                explanation: 'The <footer> element defines a footer for a document or section.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ element represents a generic section of a document or application.',
                correctAnswer: '<section>',
                explanation: 'The <section> element defines a section in a document, typically with a heading.'
            }
        ]
    },
    conditionals: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used to create an interactive control to select from options?',
                options: ['<input>', '<select>', '<option>', '<form>'],
                correctAnswer: '<select>',
                explanation: 'The <select> element creates a drop-down list of options for users to select from.'
            },
            {
                type: 'true-false',
                question: 'The <label> element can be linked to a form control using the "for" attribute.',
                correctAnswer: true,
                explanation: 'The "for" attribute on the <label> links it to a form control with a matching id.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which HTML attribute is used to specify inline CSS styles?',
                options: ['class', 'style', 'css', 'format'],
                correctAnswer: 'style',
                explanation: 'The style attribute is used to apply inline CSS to an HTML element.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ attribute is used to make a checkbox checked by default.',
                correctAnswer: 'checked',
                explanation: 'The checked attribute is a boolean attribute that makes a checkbox selected when the page loads.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which HTML5 element would you use to show a dialog box?',
                options: ['<popup>', '<modal>', '<dialog>', '<alert>'],
                correctAnswer: '<dialog>',
                explanation: 'The <dialog> element represents a dialog box or other interactive component.'
            },
            {
                type: 'true-false',
                question: 'The HTML <datalist> element provides a set of predefined options for an <input> element.',
                correctAnswer: true,
                explanation: 'The <datalist> element provides autocomplete options for <input> elements.'
            }
        ]
    },
    arrays: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which HTML tag creates hyperlinks?',
                options: ['<link>', '<a>', '<href>', '<url>'],
                correctAnswer: '<a>',
                explanation: 'The <a> (anchor) tag defines a hyperlink, which is used to link from one page to another.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ attribute specifies the URL of the page the link goes to.',
                correctAnswer: 'href',
                explanation: 'The href attribute specifies the link\'s destination.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used to define navigation links?',
                options: ['<navigation>', '<links>', '<nav>', '<menu>'],
                correctAnswer: '<nav>',
                explanation: 'The <nav> element defines a set of navigation links.'
            },
            {
                type: 'true-false',
                question: 'The <audio> element requires a closing tag in HTML5.',
                correctAnswer: true,
                explanation: 'The <audio> element requires a closing </audio> tag, unlike void elements like <img>.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which HTML attribute would you use to specify the encoding for an HTML document?',
                options: ['encode', 'charset', 'encoding', 'type'],
                correctAnswer: 'charset',
                explanation: 'The charset attribute specifies the character encoding for the HTML document (e.g., UTF-8).'
            },
            {
                type: 'fill-blank',
                question: 'The _____ meta tag is used to make websites responsive on all devices.',
                correctAnswer: 'viewport',
                explanation: 'The viewport meta tag controls how the page is displayed on varying device widths.'
            }
        ]
    },
    objects: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which HTML tag is used to define an image?',
                options: ['<picture>', '<img>', '<image>', '<graphic>'],
                correctAnswer: '<img>',
                explanation: 'The <img> tag is used to embed an image in an HTML page.'
            },
            {
                type: 'true-false',
                question: 'The <br> tag creates a line break in HTML.',
                correctAnswer: true,
                explanation: 'The <br> tag inserts a single line break.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used to specify a header for a document or section?',
                options: ['<top>', '<heading>', '<header>', '<head>'],
                correctAnswer: '<header>',
                explanation: 'The <header> element represents a container for introductory content or navigation links.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ attribute in HTML form elements specifies which form the element belongs to.',
                correctAnswer: 'form',
                explanation: 'The form attribute specifies which form the element belongs to, allowing form elements to be placed anywhere on the page.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which HTML element is used for client-side storage of data that persists after the browser is closed?',
                options: ['<storage>', '<cache>', '<data>', 'None of these'],
                correctAnswer: 'None of these',
                explanation: 'HTML doesn\'t have a specific element for client-side storage; JavaScript APIs like localStorage are used instead.'
            },
            {
                type: 'true-false',
                question: 'The required attribute works with all HTML input types.',
                correctAnswer: false,
                explanation: 'The required attribute doesn\'t work with input types like hidden, range, color, and button.'
            }
        ]
    }
};

// CSS Questions Database
const cssQuestions = {
    variables: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property is used to change the text color of an element?',
                options: ['text-color', 'color', 'font-color', 'text-style'],
                correctAnswer: 'color',
                explanation: 'The color property is used to set the color of text.'
            },
            {
                type: 'true-false',
                question: 'CSS stands for Cascading Style Sheets.',
                correctAnswer: true,
                explanation: 'CSS (Cascading Style Sheets) is used to style and layout web pages.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ property is used to change the background color of an element.',
                correctAnswer: 'background-color',
                explanation: 'The background-color property sets the background color of an element.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property is used to create space between elements\' borders?',
                options: ['spacing', 'margin', 'padding', 'border-spacing'],
                correctAnswer: 'margin',
                explanation: 'The margin property creates space around elements, outside of any defined borders.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ property is used to add space between an element\'s content and its border.',
                correctAnswer: 'padding',
                explanation: 'The padding property creates space around an element\'s content, inside of any defined borders.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which CSS feature allows you to define reusable pieces of CSS?',
                options: ['Mixins', 'Variables', 'Custom Properties', 'Templates'],
                correctAnswer: 'Custom Properties',
                explanation: 'CSS Custom Properties (also known as CSS variables) let you store specific values to reuse throughout a document.'
            },
            {
                type: 'true-false',
                question: 'In CSS, variables must be declared within the :root selector to be globally available.',
                correctAnswer: false,
                explanation: 'While often declared in :root for global scope, CSS variables can be declared within any selector to create scoped variables.'
            }
        ]
    },
    functions: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property controls the text size?',
                options: ['text-size', 'font-size', 'text-style', 'size'],
                correctAnswer: 'font-size',
                explanation: 'The font-size property sets the size of the text.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ property specifies the font of text.',
                correctAnswer: 'font-family',
                explanation: 'The font-family property specifies the font for an element.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which CSS function is used to blend two or more colors together?',
                options: ['color-mix()', 'blend()', 'mix()', 'linear-gradient()'],
                correctAnswer: 'linear-gradient()',
                explanation: 'The linear-gradient() function creates an image consisting of a progressive transition between two or more colors along a straight line.'
            },
            {
                type: 'true-false',
                question: 'The calc() function in CSS can perform calculations to determine CSS property values.',
                correctAnswer: true,
                explanation: 'The calc() function lets you perform calculations when specifying CSS property values.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which CSS function is used to create a color with transparency?',
                options: ['opacity()', 'alpha()', 'rgba()', 'transparent()'],
                correctAnswer: 'rgba()',
                explanation: 'The rgba() function defines a color using Red-Green-Blue-Alpha (transparency) model.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ function allows you to create custom shapes for the float area around an element.',
                correctAnswer: 'shape-outside',
                explanation: 'The shape-outside property defines a shape (often using a shape function) around which adjacent inline content should wrap.'
            }
        ]
    },
    loops: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property is used to specify animation?',
                options: ['animation', 'transition', 'transform', 'motion'],
                correctAnswer: 'animation',
                explanation: 'The animation property applies an animation between styles.'
            },
            {
                type: 'true-false',
                question: 'CSS has actual loop statements similar to programming languages.',
                correctAnswer: false,
                explanation: 'CSS doesn\'t have loop constructs; repetition is handled through selectors or preprocessor features.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property specifies the speed curve of an animation?',
                options: ['animation-curve', 'animation-speed', 'animation-timing-function', 'transition-timing'],
                correctAnswer: 'animation-timing-function',
                explanation: 'The animation-timing-function property specifies the speed curve of an animation.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS @_____ rule specifies the keyframes for animations.',
                correctAnswer: 'keyframes',
                explanation: 'The @keyframes rule is used to create animations by gradually changing from one set of CSS styles to another.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which CSS feature can be used to repeat background images?',
                options: ['background-loop', 'background-repeat', 'background-iteration', 'background-cycle'],
                correctAnswer: 'background-repeat',
                explanation: 'The background-repeat property sets how background images are repeated.'
            },
            {
                type: 'true-false',
                question: 'The CSS repeat() function is used with CSS Grid to repeat columns or rows.',
                correctAnswer: true,
                explanation: 'The repeat() function represents a repeated fragment of the track list, allowing a large number of columns or rows that exhibit a recurring pattern.'
            }
        ]
    },
    conditionals: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which CSS selector is used to specify a style for a unique element?',
                options: ['#id', '.class', 'element', '*'],
                correctAnswer: '#id',
                explanation: 'The id selector (#id) styles a specific element with the given ID attribute.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ selector is used to select elements with a specific class attribute.',
                correctAnswer: '.class',
                explanation: 'The class selector (.class) selects all elements with the specified class attribute.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which CSS pseudo-class selects elements based on a condition?',
                options: [':hover', '::before', ':root', ':not()'],
                correctAnswer: ':hover',
                explanation: 'The :hover pseudo-class is applied when the user hovers over an element.'
            },
            {
                type: 'true-false',
                question: 'The @media rule is used to apply different styles for different devices or screen sizes.',
                correctAnswer: true,
                explanation: 'The @media rule is used for responsive design, applying different styles based on the device\'s characteristics.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which CSS selector would you use to select all inputs that are currently focused?',
                options: ['input:focus', 'input.focus', 'input::focus', 'input[focus]'],
                correctAnswer: 'input:focus',
                explanation: 'The :focus pseudo-class selects the element that currently has focus.'
            },
            {
                type: 'fill-blank',
                question: 'The _____ CSS feature allows you to determine if certain CSS features are supported by the browser.',
                correctAnswer: '@supports',
                explanation: 'The @supports rule allows you to specify declarations that depend on a browser\'s support for CSS features.'
            }
        ]
    },
    arrays: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property is used to specify the order of flex items?',
                options: ['order', 'flex-order', 'z-index', 'position'],
                correctAnswer: 'order',
                explanation: 'The order property specifies the order of a flexible item relative to the rest.'
            },
            {
                type: 'true-false',
                question: 'CSS has built-in array data structures like JavaScript.',
                correctAnswer: false,
                explanation: 'CSS doesn\'t have arrays; the closest concept might be comma-separated lists in some properties.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which CSS layout module is designed for one-dimensional layouts?',
                options: ['Grid', 'Flexbox', 'Box Model', 'Float'],
                correctAnswer: 'Flexbox',
                explanation: 'Flexbox is a one-dimensional layout method for laying out items in rows or columns.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ property determines how flex items are placed in the flex container.',
                correctAnswer: 'flex-direction',
                explanation: 'The flex-direction property specifies the direction of the flexible items within a flex container.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which CSS Grid property is used to explicitly position a grid item?',
                options: ['grid-position', 'grid-area', 'grid-place', 'grid-locate'],
                correctAnswer: 'grid-area',
                explanation: 'The grid-area property specifies a grid item\'s position and size within the grid.'
            },
            {
                type: 'true-false',
                question: 'The :nth-child() selector in CSS can be used to target specific elements in a sequence.',
                correctAnswer: true,
                explanation: 'The :nth-child() selector matches elements based on their position among a group of siblings.'
            }
        ]
    },
    objects: {
        beginner: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property is used to create rounded corners?',
                options: ['corner-radius', 'border-round', 'border-radius', 'rounded-corners'],
                correctAnswer: 'border-radius',
                explanation: 'The border-radius property defines the radius of an element\'s corners.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ property is used to add shadow to elements.',
                correctAnswer: 'box-shadow',
                explanation: 'The box-shadow property attaches one or more shadows to an element.'
            }
        ],
        intermediate: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property would you use to change the position of an element?',
                options: ['location', 'placement', 'position', 'transform'],
                correctAnswer: 'position',
                explanation: 'The position property specifies the type of positioning method used for an element.'
            },
            {
                type: 'true-false',
                question: 'The CSS transform property can modify an element\'s appearance without affecting document flow.',
                correctAnswer: true,
                explanation: 'The transform property lets you rotate, scale, skew, or translate an element without disrupting the normal document flow.'
            }
        ],
        advanced: [
            {
                type: 'multiple-choice',
                question: 'Which CSS property creates a clipping region and determines what part of an element should be visible?',
                options: ['clip-path', 'visibility', 'display', 'opacity'],
                correctAnswer: 'clip-path',
                explanation: 'The clip-path property creates a clipping region that sets what part of an element should be shown.'
            },
            {
                type: 'fill-blank',
                question: 'The CSS _____ property defines how an element responds to the contents of its box being too large.',
                correctAnswer: 'overflow',
                explanation: 'The overflow property specifies what happens if content overflows an element\'s box.'
            }
        ]
    }
};

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Setup selection handlers
    setupSelectionHandlers();
    
    // Start quiz button
    startQuizBtn.addEventListener('click', startQuiz);
    
    // Test API button
    testApiBtn.addEventListener('click', testApiConnection);
    
    // Submit answer button
    submitAnswerBtn.addEventListener('click', submitAnswer);
    
    // Next question button
    nextQuestionBtn.addEventListener('click', nextQuestion);
    
    // Restart quiz button
    restartQuizBtn.addEventListener('click', restartQuiz);
    
    // True/False buttons
    document.querySelectorAll('.true-false-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.true-false-btn').forEach(b => b.classList.remove('selected-answer'));
            btn.classList.add('selected-answer');
            selectedAnswer = btn.dataset.answer === 'true';
        });
    });
});

// Setup selection handlers for language, difficulty, and module
function setupSelectionHandlers() {
    // Language selection
    document.querySelectorAll('#language-selection .option:not(.disabled)').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('#language-selection .option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            currentLanguage = option.dataset.language;
        });
    });
    
    // Difficulty selection
    document.querySelectorAll('#difficulty-selection .option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('#difficulty-selection .option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            currentDifficulty = option.dataset.difficulty;
        });
    });
    
    // Module selection
    document.querySelectorAll('#module-selection .option').forEach(option => {
        option.addEventListener('click', () => {
            document.querySelectorAll('#module-selection .option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');
            currentModule = option.dataset.module;
        });
    });
}

// Fetch questions from QuizAPI
async function fetchQuestionsFromAPI(limit = 10) {
    try {
        console.log('🔍 Attempting to fetch questions from QuizAPI...');
        
        // Map our difficulty levels to QuizAPI's difficulty levels
        const difficultyMap = {
            'beginner': 'Easy',
            'intermediate': 'Medium',
            'advanced': 'Hard'
        };
        
        // Map our modules to QuizAPI's tags/categories
        const categoryMap = {
            'variables': 'JavaScript',
            'functions': 'JavaScript',
            'loops': 'JavaScript',
            'conditionals': 'JavaScript',
            'arrays': 'JavaScript',
            'objects': 'JavaScript'
        };
        
        // Map languages to QuizAPI tags
        const languageMap = {
            'javascript': 'JavaScript',
            'html': 'HTML',
            'css': 'CSS'
        };
        
        // Construct the API URL with query parameters
        const apiDifficulty = difficultyMap[currentDifficulty] || '';
        const apiCategory = categoryMap[currentModule] || '';
        const apiLanguage = languageMap[currentLanguage] || 'JavaScript';
        
        // Combine language and category for tags if both exist
        let tags = apiLanguage;
        if (apiCategory && apiCategory !== apiLanguage) {
            tags += `,${apiCategory}`;
        }
        
        const url = new URL(QUIZ_API_URL);
        url.searchParams.append('apiKey', QUIZ_API_KEY);
        url.searchParams.append('limit', limit);
        url.searchParams.append('tags', tags);
        if (apiDifficulty) {
            url.searchParams.append('difficulty', apiDifficulty);
        }
        
        console.log(`📡 API Request URL: ${url.toString()}`);
        
        // Fetch questions from the API
        const response = await fetch(url);
        const data = await response.json();
        
        console.log('📊 API Response:', data);
        
        if (!data || !Array.isArray(data) || data.length === 0) {
            throw new Error('No questions returned from API');
        }
        
        // Transform API questions to our format
        const transformedQuestions = data.map(q => transformApiQuestion(q));
        console.log('✅ Transformed questions:', transformedQuestions);
        return transformedQuestions;
    } catch (error) {
        console.error('❌ Error fetching questions from API:', error);
        return null;
    }
}

// Transform QuizAPI question format to our format
function transformApiQuestion(apiQuestion) {
    // Extract answers and correct answers
    const answers = apiQuestion.answers || {};
    const correctAnswers = apiQuestion.correct_answers || {};
    
    // Get all non-null answers
    const options = [];
    const answerKeys = Object.keys(answers);
    for (const key of answerKeys) {
        if (answers[key] !== null) {
            options.push(answers[key]);
        }
    }
    
    // Determine correct answer
    let correctAnswer = null;
    for (const key of Object.keys(correctAnswers)) {
        if (correctAnswers[key] === 'true') {
            const answerKey = key.replace('_correct', '');
            correctAnswer = answers[answerKey];
            break;
        }
    }
    
    // Determine question type
    let type = 'multiple-choice';
    if (options.length === 2 && options.includes('True') && options.includes('False')) {
        type = 'true-false';
    }
    
    // Create question in our format
    return {
        type: type,
        question: apiQuestion.question,
        options: options,
        correctAnswer: correctAnswer,
        explanation: apiQuestion.explanation || 'No explanation provided.',
        code: apiQuestion.code || null
    };
}

// Start the quiz
async function startQuiz() {
    // Validate selections
    if (!currentDifficulty) {
        alert('Please select a difficulty level.');
        return;
    }
    if (!currentModule) {
        alert('Please select a module.');
        return;
    }
    
    // Reset quiz state
    currentQuestionIndex = 0;
    score = 0;
    timer = 0;
    userAnswers = [];
    
    // Show loading indicator
    questionText.textContent = 'Loading questions...';
    quizSetupSection.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
    
    // Try to get questions from the API first
    if (useApiQuestions) {
        try {
            const apiQuestions = await fetchQuestionsFromAPI();
            if (apiQuestions && apiQuestions.length > 0) {
                currentQuestions = apiQuestions;
            } else {
                // Fall back to local questions if API fails
                useApiQuestions = false;
                currentQuestions = getLocalQuestions();
            }
        } catch (error) {
            // Fall back to local questions if API fails
            useApiQuestions = false;
            currentQuestions = getLocalQuestions();
        }
    } else {
        // Use local questions
        currentQuestions = getLocalQuestions();
    }
    
    if (!currentQuestions || currentQuestions.length === 0) {
        alert('No questions available for the selected options.');
        quizSetupSection.classList.remove('hidden');
        quizContainer.classList.add('hidden');
        return;
    }
    
    // Update total questions display
    totalQuestionsSpan.textContent = currentQuestions.length;
    
    // Start timer
    startTimer();
    
    // Load first question
    loadQuestion();
}

// Get local questions based on current language, module, and difficulty
function getLocalQuestions() {
    switch(currentLanguage) {
        case 'javascript':
            return jsQuestions[currentModule]?.[currentDifficulty] || [];
        case 'html':
            return htmlQuestions[currentModule]?.[currentDifficulty] || [];
        case 'css':
            return cssQuestions[currentModule]?.[currentDifficulty] || [];
        default:
            return [];
    }
}

// Load the current question
function loadQuestion() {
    const question = currentQuestions[currentQuestionIndex];
    
    // Update question number
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Display question text
    questionText.textContent = question.question;
    
    // Reset selected answer
    selectedAnswer = null;
    
    // Clear code snippet if there's no code
    if (question.code) {
        codeSnippet.textContent = question.code;
        codeSnippet.classList.remove('hidden');
    } else {
        codeSnippet.textContent = '';
        codeSnippet.classList.add('hidden');
    }
    
    // Show appropriate answer type
    switch (question.type) {
        case 'multiple-choice':
            answerOptions.classList.remove('hidden');
            fillBlankContainer.classList.add('hidden');
            trueFalseContainer.classList.add('hidden');
            
            // Create answer options
            answerOptions.innerHTML = '';
            question.options.forEach((option, index) => {
                const optionDiv = document.createElement('div');
                optionDiv.classList.add('answer-option');
                optionDiv.textContent = option;
                optionDiv.dataset.value = option;
                optionDiv.addEventListener('click', () => {
                    document.querySelectorAll('.answer-option').forEach(opt => opt.classList.remove('selected-answer'));
                    optionDiv.classList.add('selected-answer');
                    selectedAnswer = option;
                });
                answerOptions.appendChild(optionDiv);
            });
            break;
            
        case 'fill-blank':
            answerOptions.classList.add('hidden');
            fillBlankContainer.classList.remove('hidden');
            trueFalseContainer.classList.add('hidden');
            
            // Clear previous input
            fillBlankAnswer.value = '';
            break;
            
        case 'true-false':
            answerOptions.classList.add('hidden');
            fillBlankContainer.classList.add('hidden');
            trueFalseContainer.classList.remove('hidden');
            
            // Reset true/false selection
            document.querySelectorAll('.true-false-btn').forEach(btn => btn.classList.remove('selected-answer'));
            break;
    }
    
    // Show submit button, hide next button
    submitAnswerBtn.classList.remove('hidden');
    nextQuestionBtn.classList.add('hidden');
}

// Submit the answer
function submitAnswer() {
    const question = currentQuestions[currentQuestionIndex];
    let userAnswer;
    
    // Get user's answer based on question type
    switch (question.type) {
        case 'multiple-choice':
            userAnswer = selectedAnswer;
            break;
            
        case 'fill-blank':
            userAnswer = fillBlankAnswer.value.trim();
            break;
            
        case 'true-false':
            userAnswer = selectedAnswer;
            break;
    }
    
    // Validate that user has provided an answer
    if (userAnswer === null || userAnswer === undefined || userAnswer === '') {
        alert('Please select or enter an answer.');
        return;
    }
    
    // Check if the answer is correct
    const isCorrect = checkAnswer(question, userAnswer);
    
    // Store user's answer
    userAnswers.push({
        question: question.question,
        userAnswer: userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect: isCorrect,
        explanation: question.explanation
    });
    
    // Update score if correct
    if (isCorrect) {
        score++;
    }
    
    // Highlight correct/incorrect answers
    highlightAnswer(question, userAnswer);
    
    // Hide submit button, show next button
    submitAnswerBtn.classList.add('hidden');
    nextQuestionBtn.classList.remove('hidden');
}

// Check if the answer is correct
function checkAnswer(question, userAnswer) {
    let correctAnswer = question.correctAnswer;
    
    // For true/false questions, convert string to boolean if needed
    if (question.type === 'true-false' && typeof userAnswer === 'string') {
        userAnswer = userAnswer === 'true';
    }
    
    // For fill-in-the-blank, make case insensitive
    if (question.type === 'fill-blank') {
        return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
    }
    
    return userAnswer === correctAnswer;
}

// Highlight the correct and incorrect answers
function highlightAnswer(question, userAnswer) {
    switch (question.type) {
        case 'multiple-choice':
            document.querySelectorAll('.answer-option').forEach(option => {
                if (option.dataset.value === question.correctAnswer) {
                    option.classList.add('correct-answer');
                } else if (option.dataset.value === userAnswer && userAnswer !== question.correctAnswer) {
                    option.classList.add('incorrect-answer');
                }
            });
            break;
            
        case 'fill-blank':
            if (userAnswer.toLowerCase() === question.correctAnswer.toLowerCase()) {
                fillBlankAnswer.classList.add('correct-answer');
            } else {
                fillBlankAnswer.classList.add('incorrect-answer');
            }
            break;
            
        case 'true-false':
            document.querySelectorAll('.true-false-btn').forEach(btn => {
                const btnValue = btn.dataset.answer === 'true';
                if (btnValue === question.correctAnswer) {
                    btn.classList.add('correct-answer');
                } else if (btnValue === userAnswer && userAnswer !== question.correctAnswer) {
                    btn.classList.add('incorrect-answer');
                }
            });
            break;
    }
}

// Move to the next question
function nextQuestion() {
    currentQuestionIndex++;
    
    // Check if quiz is finished
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }
    
    // Reset styles
    document.querySelectorAll('.answer-option').forEach(option => {
        option.classList.remove('selected-answer', 'correct-answer', 'incorrect-answer');
    });
    
    document.querySelectorAll('.true-false-btn').forEach(btn => {
        btn.classList.remove('selected-answer', 'correct-answer', 'incorrect-answer');
    });
    
    fillBlankAnswer.classList.remove('correct-answer', 'incorrect-answer');
    
    // Load next question
    loadQuestion();
}

// End the quiz and show results
function endQuiz() {
    // Stop timer
    clearInterval(timerInterval);
    
    // Update score display
    scoreSpan.textContent = score;
    totalScoreSpan.textContent = currentQuestions.length;
    totalTimeSpan.textContent = timer;
    
    // Create result breakdown
    resultBreakdown.innerHTML = '';
    userAnswers.forEach((answer, index) => {
        const resultItem = document.createElement('div');
        resultItem.classList.add('result-item');
        resultItem.innerHTML = `
            <p><strong>Question ${index + 1}:</strong> ${answer.question}</p>
            <p>Your answer: <span class="${answer.isCorrect ? 'correct' : 'incorrect'}">${answer.userAnswer}</span></p>
            <p>Correct answer: ${answer.correctAnswer}</p>
            <p><em>${answer.explanation}</em></p>
            <hr>
        `;
        resultBreakdown.appendChild(resultItem);
    });
    
    // Show results container, hide quiz container
    quizContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
}

// Start the timer
function startTimer() {
    timer = 0;
    timerSpan.textContent = timer;
    
    timerInterval = setInterval(() => {
        timer++;
        timerSpan.textContent = timer;
    }, 1000);
}

// Restart the quiz
function restartQuiz() {
    // Show setup section, hide results
    quizSetupSection.classList.remove('hidden');
    resultsContainer.classList.add('hidden');
}

// Test API connection
async function testApiConnection() {
    // Change button text to show loading
    testApiBtn.textContent = 'Testing API...';
    testApiBtn.disabled = true;
    
    try {
        // Set default values if none selected
        if (!currentDifficulty) currentDifficulty = 'beginner';
        if (!currentModule) currentModule = 'variables';
        
        console.log('🧪 Testing API connection with:');
        console.log(`Language: ${currentLanguage}`);
        console.log(`Difficulty: ${currentDifficulty}`);
        console.log(`Module: ${currentModule}`);
        
        // Try to fetch just 1 question to test
        const questions = await fetchQuestionsFromAPI(1);
        
        // Display result
        if (questions && questions.length > 0) {
            alert('API Connection Successful! Check console for details.');
            console.log('✅ API TEST SUCCESSFUL! Received questions:', questions);
            testApiBtn.textContent = 'API Test: Success ✓';
            testApiBtn.style.backgroundColor = '#2ecc71';
        } else {
            alert('API Connection Failed. Check console for errors.');
            console.error('❌ API TEST FAILED! No questions received.');
            testApiBtn.textContent = 'API Test: Failed ✗';
            testApiBtn.style.backgroundColor = '#e74c3c';
        }
    } catch (error) {
        alert('API Connection Error: ' + error.message);
        console.error('❌ API TEST ERROR:', error);
        testApiBtn.textContent = 'API Test: Error ✗';
        testApiBtn.style.backgroundColor = '#e74c3c';
    } finally {
        // Re-enable button after test
        testApiBtn.disabled = false;
        
        // Add guide for checking console
        console.log('\n🔍 HOW TO CHECK CONSOLE LOGS:');
        console.log('1. Right-click anywhere on the page');
        console.log('2. Select "Inspect" or "Inspect Element"');
        console.log('3. Click on the "Console" tab at the top');
        console.log('4. Look for colored logs with emoji indicators');
        
        // Add guide for checking network requests
        console.log('\n🌐 HOW TO CHECK NETWORK REQUESTS:');
        console.log('1. Right-click anywhere on the page');
        console.log('2. Select "Inspect" or "Inspect Element"');
        console.log('3. Click on the "Network" tab at the top');
        console.log('4. Look for requests to "quizapi.io"');
        console.log('5. Click on the request to see details');
    }
}

// Add some CSS for the results breakdown
document.head.insertAdjacentHTML('beforeend', `
<style>
.result-item {
    margin-bottom: 15px;
    padding-bottom: 15px;
}
.correct {
    color: #2ecc71;
    font-weight: bold;
}
.incorrect {
    color: #e74c3c;
    font-weight: bold;
}
</style>
`);
