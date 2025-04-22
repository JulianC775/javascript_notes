# Memory Card Game: Implementation Guide

This guide provides step-by-step instructions for building a memory card game using HTML, CSS, and JavaScript. Each section explains what the code does, with inline comments to help you understand its functionality.

## Project Structure
```
memory_game/
├── index.html      # Contains the game structure and HTML elements
├── styles.css      # Contains styling for layout, cards, and animations
├── script.js       # Contains the game logic and interactivity
└── instructions.md # This guide with detailed explanations
```

## HTML (index.html)

### 1. Basic Structure
- This file sets up the structure of the web page.
- We include elements such as the game board, control buttons, and a display for game stats.
- Later, the JavaScript will dynamically build the game within these elements.

```html
<!-- index.html: Basic Structure -->
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags provide character set and device responsiveness -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Game</title>
    <!-- Link to the external CSS file for styling -->
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Game title displayed at the top -->
    <h2>Memory Game</h2>
    
    <!-- Container wrapping the game board and controls -->
    <div id="game-container">
        <!-- The game board where cards will be dynamically added -->
        <div id="game-board"></div>
        <!-- Game controls: Start and Reset buttons -->
        <div id="game-controls">
            <button id="start-button">Start Game</button>
            <button id="reset-button">Reset Game</button>
        </div>
    </div>
    
    <!-- Display area for game statistics like moves and timer -->
    <div id="game-stats"></div>

    <!-- Link to the JavaScript file that contains game logic -->
    <script src="script.js"></script>
</body>
</html>
```

<!-- Note: Remove test elements and placeholder rows once you finalize your HTML structure. -->

## CSS (styles.css)

### 1. Game Layout
- The CSS file defines how HTML elements look on the page.
- We use Flexbox and Grid layouts to center content and arrange the cards.

```css
/* Overall layout for the body */
body {
    /* Flexbox centers content vertically and horizontally */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;  /* Takes up full viewport height */
    padding: 2rem;      /* Adds spacing around the content */
}

/* Style for the game board container */
#game-board {
    /* CSS Grid to layout cards in a grid format */
    display: grid;
    grid-template-columns: repeat(4, 1fr);  /* 4 columns of equal width */
    gap: 10px;       /* Spacing between cards */
    margin: 20px auto; /* Centered horizontally with margin */
    max-width: 600px;   /* Limits board maximum width */
}

/* Styling for game statistics and control buttons */
#game-stats, #game-controls {
    margin: 15px 0;
    text-align: center;
}
```

### 2. Card Styling
- Cards have two faces: a front (showing the value) and a back (hidden until flipped).
- CSS handles animations like the flip effect.

```css
/* Base style for each card element */
.card {
    position: relative; /* Position children absolutely inside */
    height: 120px;
    cursor: pointer;    /* Mouse pointer indicates clickable element */
    transform-style: preserve-3d;  /* Allows 3D transformation for flip effect */
    transition: transform 0.5s;      /* Smooth transition when flipping */
}

/* Common styling for both card faces (front and back) */
.card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;  /* Rounded corners for a smoother look */
    backface-visibility: hidden;  /* Hides the reverse side when not flipped */
}

/* Styling for the card back: visible when the card is face down */
.card-back {
    background-color: #2980b9;  /* Blue background */
    color: white;
    font-size: 24px;
}

/* Styling for the card front: shown when the card is flipped */
.card-front {
    background-color: #f1f1f1;  /* Light background */
    transform: rotateY(180deg);  /* Initially rotated to be hidden */
    font-size: 24px;
}

/* Flip effect: when 'flipped' class is added, card rotates to show front */
.card.flipped {
    transform: rotateY(180deg);
}

/* Styling for matched cards: indicates successful pair matching */
.card.matched .card-front {
    background-color: #27ae60;  /* Green background for matched cards */
    color: white;
}
```

### 3. Controls and Indicators
- Button styling and hover effects ensure a consistent look for game controls.
- Game stats have enhanced readability.

```css
/* Button styling */
button {
    padding: 8px 16px;
    margin: 0 5px;
    background-color: #3498db; /* Blue background */
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer; /* Pointer cursor for clickable items */
    font-size: 16px;
}

/* Hover effect for buttons to enhance interactivity */
button:hover {
    background-color: #2980b9;
}

/* Styling for the game statistics text */
#game-stats {
    font-size: 18px;
    font-weight: bold;
}
```

## JavaScript (script.js)

### 1. Game State and Variables
- These variables hold the state of the game, such as the list of cards, number of moves, and timer value.
- DOM elements are retrieved so that the code can manipulate them dynamically.

```javascript
// Array to store card values (each appears twice for matching pairs)
let cards = [];
// Stores cards that the player has currently selected (maximum 2 at a time)
let selectedCards = [];
// Counter for the number of matched pairs; when this equals half the total, game is won
let matchedPairs = 0;
// Counter for the number of moves (each pair of card flips counts as one move)
let moves = 0;
// Flag that indicates if the game is currently active
let gameStarted = false;
// Holds a reference to the timer interval for updating the game timer
let timer = null;
// Tracks the total seconds elapsed since the game started
let seconds = 0;

// Get references to our key DOM elements in the HTML
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const gameStats = document.getElementById('game-stats');
```

### 2. Game Initialization
- The `initGame` function resets game variables, shuffles the card values, and starts the game.
- It creates the card elements dynamically based on a shuffled array of values.

```javascript
// Function to initialize or start/restart the game
function initGame() {
  // Reset game state variables
  cards = [];
  selectedCards = [];
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  gameStarted = true;
  
  // Clear the game board to remove any previous cards
  gameBoard.innerHTML = '';
  
  // Define unique card values; for a 4x4 grid we need 8 unique pairs
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Duplicate the values to create pairs
  const cardPairs = [...cardValues, ...cardValues];
  
  // Shuffle the card pairs using our shuffle function
  cards = shuffleArray(cardPairs);
  
  // Dynamically create card elements and add them to the game board
  createCardElements();
  
  // Update the game stats display (moves and time)
  updateStats();
  
  // Start the game timer to track elapsed time
  startTimer();
}

// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  const newArray = [...array];
  // Loop from last element to the second
  for (let i = newArray.length - 1; i > 0; i--) {
    // Pick a random index between 0 and i
    const j = Math.floor(Math.random() * (i + 1));
    // Swap the elements at index i and j
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Create card elements based on the shuffled card values and add them to the board
function createCardElements() {
  cards.forEach((value, index) => {
    // Create a new div element for each card
    const card = document.createElement('div');
    card.classList.add('card');
    // Data attributes store the index and value for each card
    card.dataset.index = index;
    card.dataset.value = value;
    
    // Create the card back face (shown when card is face down)
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = '?';  // '?' indicates the card is face down
    
    // Create the card front face (revealed when card is flipped)
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = value;  // Shows the card's actual value
    
    // Append the back and front faces to the card container
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    
    // Attach an event listener to handle card click events (flip card)
    card.addEventListener('click', handleCardClick);
    
    // Add the card to the game board in the DOM
    gameBoard.appendChild(card);
  });
}
```

### 3. Game Logic
- Handling card clicks, matching logic, and flipping cards back if they don't match.
- Ensures only a maximum of two cards are selected at any one time.

```javascript
// Handle a card click event
function handleCardClick(event) {
  // If game is not active, ignore clicks
  if (!gameStarted) return;
  
  // Get the clicked card element
  const card = event.currentTarget;
  
  // Ignore the click if card is already flipped or matched
  if (card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }
  
  // Ensure only two cards are selected at a time
  if (selectedCards.length === 2) {
    return;
  }
  
  // Flip the card by adding the 'flipped' class
  card.classList.add('flipped');
  // Add the flipped card to the selectedCards array
  selectedCards.push(card);
  
  // When two cards are flipped, increment move count and check for a match
  if (selectedCards.length === 2) {
    moves++;
    updateStats();
    checkForMatch();
  }
}

// Check if the two selected cards match
function checkForMatch() {
  const [card1, card2] = selectedCards;
  
  // Compare data-value attributes of the two cards
  if (card1.dataset.value === card2.dataset.value) {
    // If they match, handle them as a pair
    handleMatch();
  } else {
    // If they do not match, revert them back
    handleMismatch();
  }
}

// When two cards match
function handleMatch() {
  selectedCards.forEach(card => {
    // Mark card as matched so it stays flipped
    card.classList.add('matched');
    // Remove the click event listener to prevent further interaction
    card.removeEventListener('click', handleCardClick);
  });
  
  // Increase the count of matched pairs
  matchedPairs++;
  // Reset selectedCards for the next turn
  selectedCards = [];
  
  // If all pairs are matched, the game is complete
  if (matchedPairs === cards.length / 2) {
    endGame();
  }
}

// When two cards do not match
function handleMismatch() {
  // Wait for a short duration so the user can see the cards
  setTimeout(() => {
    selectedCards.forEach(card => {
      // Remove the 'flipped' class to hide the card's value
      card.classList.remove('flipped');
    });
    // Clear the selectedCards array for the next attempt
    selectedCards = [];
  }, 1000);  // 1000ms delay
}
```

### 4. Game Controls and Stats
- Timer functionality and updating the display of moves and elapsed time.
- Ending the game shows a completion message with final stats.

```javascript
// Start the game timer
function startTimer() {
  // Clear any existing timer intervals
  clearInterval(timer);
  seconds = 0;  // Reset the seconds counter
  
  // Start a new timer that updates every second
  timer = setInterval(() => {
    seconds++;
    updateStats(); // Refresh stats display with new time
  }, 1000);
}

// Update the on-screen statistics (moves and time)
function updateStats() {
  // Format the elapsed time as minutes and seconds
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  
  // Update the text content of the gameStats element
  gameStats.textContent = `Moves: ${moves} | Time: ${formattedTime}`;
}

// When the game is finished
function endGame() {
  // Stop the timer
  clearInterval(timer);
  gameStarted = false;
  
  // Calculate a simple score based on moves and time (you can modify the formula)
  const score = Math.max(100 - moves - Math.floor(seconds / 10), 10);
  
  // Display a game completion message after a short delay
  setTimeout(() => {
    alert(`Congratulations! You've completed the game!\nMoves: ${moves}\nTime: ${seconds} seconds\nScore: ${score}`);
  }, 500);
}

// Reset the game via the reset button
function resetGame() {
  clearInterval(timer); // Stop any active timer
  gameStarted = false;
  gameBoard.innerHTML = ''; // Clear the current game board
  gameStats.textContent = 'Game reset. Press Start to play again.';
}
```

### 5. Event Listeners
- These listeners attach to buttons once the DOM loads, so user actions trigger the correct functions.

```javascript
// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
  // Attach click event to the start button to initialize the game
  startButton.addEventListener('click', initGame);
  // Attach click event to the reset button to allow restarting the game
  resetButton.addEventListener('click', resetGame);
  
  // Set an initial message for the game stats area
  gameStats.textContent = 'Press Start to begin the game';
});
```

## Implementation Steps Overview
1. **Start with HTML**: Update your existing HTML file to match the structure described above, ensuring you have clean containers for game elements.
2. **Add CSS**: Implement the CSS to create a structured layout, aesthetically pleasing card styles, and responsive design.
3. **Basic JavaScript**: Set up your game state variables and retrieve DOM elements that you will manipulate during the game.
4. **Card Generation**: Write functions to generate card elements dynamically, duplicate values for matching, and shuffle the array using Fisher-Yates.
5. **Game Logic**: Implement click handlers, matching logic, and move counting to allow the game to progress step by step.
6. **Game Controls**: Add functions for starting, resetting the game, and a timer that provides time feedback to the player.
7. **Testing and Debugging**: Test each part—use console logs to debug issues, verify event listeners, and adjust timings if necessary.

## Extensions and Enhancements
Once the basic game is functional, consider adding these features:
1. **Difficulty Levels**: Offer different grid sizes (for example, 3x4, 4x4, 6x6) to adjust the challenge.
2. **Card Content Variation**: Replace numbers with images or icons to enhance visual appeal.
3. **Enhanced Animations**: Incorporate more advanced animations for smoother card flips and transitions.
4. **Sound Effects**: Add audio feedback for card flips, matches, and when the game is completed to enhance user interaction.
5. **Persistent High Scores**: Use localStorage to save high scores and display them on the interface.
6. **Multiplayer Mode**: Develop a simple two-player version where turns are alternated.

## Debugging Tips
- Use `console.log()` to trace variable values and function calls.
- Pay close attention to timing and asynchronous behavior (e.g., setTimeout and timer intervals).
- Ensure that event listeners are correctly added and removed to avoid unintended behavior.
- Test the game on different devices and screen sizes to ensure the responsive design functions as expected.

Happy coding!
