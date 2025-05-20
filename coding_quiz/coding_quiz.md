# Coding Quiz Project Documentation

## 1. Overview

The Coding Quiz is an interactive web application designed to test users' knowledge of various programming concepts. Users can select a programming language (JavaScript, HTML, CSS), difficulty level (Beginner, Intermediate, Advanced), and specific modules within that language to generate a customized quiz. The quiz features multiple-choice, true/false, and fill-in-the-blank questions. It tracks the user's score, time taken, and provides a breakdown of answers at the end. The application attempts to fetch questions from the QuizAPI.io service and falls back to a local question set if the API is unavailable or fails.

## 2. File Structure

The project consists of the following core files:

*   `index.html`: The main HTML file that defines the structure of the quiz interface.
*   `styles.css`: The CSS file that provides styling for the HTML elements.
*   `script.js`: The JavaScript file that contains all the logic for quiz generation, user interaction, scoring, and API communication.
*   `coding_quiz.md`: This documentation file.

## 3. HTML Structure (`index.html`)

The `index.html` file sets up the user interface for the quiz, divided into several main sections:

*   **Header**: Contains the main title "Coding Quiz".
*   **Quiz Setup (`<section id="quiz-setup">`)**:
    *   Allows users to select the programming language (JavaScript, HTML, CSS).
    *   Allows users to select the difficulty level (Beginner, Intermediate, Advanced).
    *   Allows users to select a specific module related to the chosen language.
    *   Contains the "Start Quiz" button to begin the quiz.
    *   Contains a "Test API Connection" button for debugging purposes.
*   **Quiz Container (`<section id="quiz-container">`)**:
    *   Initially hidden, this section becomes visible when the quiz starts.
    *   **Quiz Info (`<div id="quiz-info">`)**: Displays the current question number, total questions, and the timer.
    *   **Question Container (`<div id="question-container">`)**:
        *   Displays the current question text (`<h2 id="question-text">`).
        *   Displays an optional code snippet (`<div id="code-snippet">`).
        *   Dynamically populates answer options for multiple-choice questions (`<div id="answer-options">`).
        *   Provides an input field for fill-in-the-blank questions (`<div id="fill-blank-container">`).
        *   Provides "True" and "False" buttons for true/false questions (`<div id="true-false-container">`).
    *   Contains "Submit Answer" and "Next Question" buttons.
*   **Results Container (`<section id="results-container">`)**:
    *   Initially hidden, this section displays after the quiz is completed.
    *   Shows the user's final score (`<div id="score-display">`).
    *   Shows the total time taken (`<div id="time-taken">`).
    *   Provides a breakdown of the user's answers (question, user's answer, correct answer, explanation) (`<div id="result-breakdown">`).
    *   Contains a "Take Another Quiz" button to restart the setup process.

The HTML links to `styles.css` for styling and `script.js` for functionality.

## 4. CSS Styling (`styles.css`)

The `styles.css` file provides the visual appearance for the quiz. Key aspects include:

*   **Base Styles**:
    *   Resets default margins and paddings (`*`).
    *   Sets a base font (`Segoe UI`), line height, and text color for the body.
    *   Defines a main container (`.container`) with a maximum width and centered layout.
*   **Header Styling**: Styles for `<h1>` and `<h2>` elements, including color and margins.
*   **Button Styling**:
    *   General button styles for padding, background color, text color, border-radius, and hover effects.
    *   Specific styles for selected options (`button.selected`) and disabled buttons (`button.disabled`).
*   **Quiz Setup Section**:
    *   Styles for the `#quiz-setup` section, including background, padding, border-radius, and shadow.
    *   Flexbox is used for layout of selection options (`.options`).
*   **Quiz Container Section**:
    *   Styles for `#quiz-container`, similar to the setup section.
    *   Layout for quiz information (progress and timer) using flexbox.
    *   Styling for the question text and code snippets (background, padding, border, font).
*   **Answer Options**:
    *   Flexbox (column direction) for multiple-choice answer options.
    *   Styling for individual answer options (`.answer-option`) including borders, padding, and hover effects.
    *   Distinct background colors for selected (`.selected-answer`), correct (`.correct-answer`), and incorrect (`.incorrect-answer`) answers.
*   **Fill-in-the-Blank and True/False**: Specific styling for input fields and true/false buttons.
*   **Results Container**: Styles for `#results-container`, score display, time taken, and the answer breakdown.
*   **Utility Classes**: A `.hidden` class to toggle the visibility of sections.

The overall theme is clean and user-friendly, with clear visual feedback for selections and answers. The background color is a soft gray (`#95a5a6`), with blue (`#3498db`) and green (`#2ecc71`) accents for interactive elements and feedback.

## 5. JavaScript Functionality (`script.js`)

The `script.js` file orchestrates the entire quiz. Key functionalities include:

*   **DOM Element References**: Selects all necessary HTML elements for manipulation.
*   **Quiz State Management**:
    *   Variables to store the selected language, difficulty, module, current questions, current question index, score, timer, selected answer, and user's answers.
    *   `useApiQuestions` flag (defaults to `true`) to control whether to fetch questions from QuizAPI.io.
*   **QuizAPI Configuration**:
    *   Stores the API key (`QUIZ_API_KEY`) and base URL (`QUIZ_API_URL`).
    *   **Important**: The API key provided in the script is a placeholder or example. A valid API key from QuizAPI.io is needed for the API functionality to work correctly.
*   **Local Questions Database (`jsQuestions`, `htmlQuestions`, `cssQuestions`)**:
    *   A fallback JavaScript object containing questions categorized by language, module, and difficulty. This is used if the API call fails or `useApiQuestions` is `false`.
    *   Each question object includes:
        *   `type`: (e.g., 'multiple-choice', 'true-false', 'fill-blank')
        *   `question`: The question text.
        *   `options`: (For multiple-choice) An array of answer strings.
        *   `correctAnswer`: The correct answer.
        *   `explanation`: An explanation for the answer.
        *   `code`: (Optional) A code snippet relevant to the question.
*   **Event Listeners**:
    *   **Setup Phase**:
        *   Buttons for language, difficulty, and module selection update the corresponding state variables and visual selection.
        *   `startQuizBtn`: Calls the `startQuiz` function.
        *   `testApiBtn`: Calls the `testApiConnection` function for debugging.
    *   **Quiz Phase**:
        *   `answerOptions` (delegated): Handles clicks on multiple-choice answers, updating `selectedAnswer` and visual state.
        *   `trueFalseContainer` (delegated): Handles clicks on True/False buttons.
        *   `submitAnswerBtn`: Calls the `submitAnswer` function.
        *   `nextQuestionBtn`: Calls the `nextQuestion` function.
    *   **Results Phase**:
        *   `restartQuizBtn`: Calls the `restartQuiz` function.
*   **Core Functions**:
    *   **`setupSelectionHandlers()`**: Initializes event listeners for the setup buttons.
    *   **`fetchQuestionsFromAPI(limit)`**:
        *   Asynchronously fetches questions from QuizAPI.io based on selected language, difficulty, and tags (module).
        *   Constructs the API URL with necessary parameters.
        *   Uses `fetch` to make the API request.
        *   Transforms the API response into the local question format using `transformApiQuestion`.
        *   Handles potential errors during the API call.
    *   **`transformApiQuestion(apiQuestion)`**: Converts a question object from the QuizAPI format to the internal format used by the application. This involves mapping fields and identifying the question type.
    *   **`startQuiz()`**:
        *   Resets quiz state (score, index, timer, answers).
        *   Attempts to fetch questions from the API if `useApiQuestions` is true.
        *   If API fetch fails or is disabled, falls back to `getLocalQuestions()`.
        *   If questions are available, it hides the setup section, shows the quiz container, updates total questions, loads the first question, and starts the timer.
        *   Handles cases where no questions are found for the selected criteria.
    *   **`getLocalQuestions()`**: Retrieves questions from the local JavaScript database based on selected language, difficulty, and module.
    *   **`loadQuestion()`**:
        *   Displays the current question text, code snippet (if any), and answer options based on the question type.
        *   Clears previous answer selections and input fields.
        *   Updates the progress display (e.g., "Question 1 of 10").
        *   Manages the visibility of different answer input containers (multiple-choice, fill-blank, true/false).
    *   **`submitAnswer()`**:
        *   Checks if an answer has been selected/entered.
        *   Retrieves the user's answer based on the question type.
        *   Calls `checkAnswer` to validate the answer.
        *   Calls `highlightAnswer` to provide visual feedback.
        *   Updates the score.
        *   Stores the user's answer and correctness in `userAnswers`.
        *   Disables answer inputs and shows the "Next Question" button (or "End Quiz" if it's the last question).
    *   **`checkAnswer(question, userAnswer)`**: Compares the user's answer with the correct answer, handling case-insensitivity for fill-in-the-blank.
    *   **`highlightAnswer(question, userAnswer)`**: Adds CSS classes to provide visual feedback (green for correct, red for incorrect) on the selected/entered answer.
    *   **`nextQuestion()`**:
        *   Increments `currentQuestionIndex`.
        *   If there are more questions, calls `loadQuestion()`.
        *   If it's the last question, calls `endQuiz()`.
    *   **`endQuiz()`**:
        *   Stops the timer.
        *   Hides the quiz container and shows the results container.
        *   Displays the final score and total time taken.
        *   Calls `displayResultBreakdown()` to show detailed results.
    *   **`displayResultBreakdown()`**: Iterates through `userAnswers` and populates the results breakdown section with each question, the user's answer, the correct answer, and the explanation.
    *   **`startTimer()`**: Initializes and starts the quiz timer, updating `timerSpan` every second.
    *   **`restartQuiz()`**: Resets the application to the initial setup screen.
    *   **`testApiConnection()`**: A utility function to make a test call to the QuizAPI to check connectivity and API key validity.
*   **Error Handling**: Basic error handling for API calls and scenarios where no questions are found.
*   **Initialization**: Calls `setupSelectionHandlers()` when the script loads.

The JavaScript logic is well-structured, separating concerns into different functions for setup, question loading, answer handling, and results display.

## 6. How to Run the Quiz

1.  Ensure all files (`index.html`, `styles.css`, `script.js`) are in the same directory.
2.  **API Key**: If you want to use questions from QuizAPI.io:
    *   Sign up at [QuizAPI.io](https://quizapi.io/) to get a free API key.
    *   Open `script.js` and replace the placeholder value for `QUIZ_API_KEY` with your actual API key:
        ```javascript
        const QUIZ_API_KEY = 'YOUR_ACTUAL_API_KEY_HERE';
        ```
    *   If you don't want to use the API, you can set `useApiQuestions = false;` near the top of `script.js`. The quiz will then use the local question database.
3.  Open the `index.html` file in a web browser.
4.  Follow the on-screen instructions:
    *   Select your desired language, difficulty, and module.
    *   Click "Start Quiz".
    *   Answer the questions and submit them.
    *   View your results at the end.

## 7. Potential Enhancements

*   **More Languages/Modules**: Expand the local question database or ensure comprehensive API coverage for more topics.
*   **User Accounts/Persistence**: Allow users to save their scores or track progress over time.
*   **Advanced Feedback**: Provide more detailed feedback or links to resources for incorrect answers.
*   **Accessibility Improvements**: Further review and enhance accessibility (ARIA attributes, keyboard navigation).
*   **More Question Types**: Introduce other question formats (e.g., matching, sequencing).
*   **Loading States**: Add more visual feedback during API calls (e.g., loading spinners).
*   **Error Handling**: Implement more robust error handling and user-friendly error messages.
