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
const QUIZ_API_KEY = 'NTTMAF41jyMR2W69C1s0yE5Acg7AeaUJ1E0rEEOw'; // Replace with your actual API key
const QUIZ_API_URL = 'https://quizapi.io/api/v1/questions';

// Questions Database (JavaScript only for now) - Fallback for when API is unavailable
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
        
        // Construct the API URL with query parameters
        const apiDifficulty = difficultyMap[currentDifficulty] || '';
        const apiCategory = categoryMap[currentModule] || 'JavaScript';
        
        const url = new URL(QUIZ_API_URL);
        url.searchParams.append('apiKey', QUIZ_API_KEY);
        url.searchParams.append('limit', limit);
        url.searchParams.append('tags', apiCategory);
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
                if (currentLanguage === 'javascript') {
                    currentQuestions = jsQuestions[currentModule][currentDifficulty];
                }
            }
        } catch (error) {
            // Fall back to local questions if API fails
            useApiQuestions = false;
            if (currentLanguage === 'javascript') {
                currentQuestions = jsQuestions[currentModule][currentDifficulty];
            }
        }
    } else {
        // Use local questions
        if (currentLanguage === 'javascript') {
            currentQuestions = jsQuestions[currentModule][currentDifficulty];
        }
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
