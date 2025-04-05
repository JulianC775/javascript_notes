# Memory Card Game: Implementation Guide

This guide provides step-by-step instructions for building a memory card game using HTML, CSS, and JavaScript.

## Project Structure
```
memory_game/
├── index.html      # Game structure and HTML elements
├── styles.css      # Styling and animations
├── script.js       # Game logic and DOM manipulation
└── instructions.md # This guide
```

## HTML (index.html)

### 1. Basic Structure
- Keep the existing game container elements
- The main sections you need:
  - Game title (`<h2>Memory Game</h2>`)
  - Game board container (`<div id="game-board"></div>`)
  - Game controls (`<button id="start-button">Start Game</button>`, etc.)
  - Game stats area (`<div id="game-stats"></div>`)

### 2. Card Structure
- Cards will be generated via JavaScript, but they'll follow this pattern:
```html
<div class="card" data-value="1">
  <div class="card-back">?</div>
  <div class="card-front">1</div>
</div>
```

### 3. HTML Cleanup
- Remove test elements and placeholder rows once you implement the actual game
- Make sure all IDs and classes match what you'll use in your JavaScript

## CSS (styles.css)

### 1. Game Layout
```css
/* Overall layout */
body {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
}

/* Game board setup */
#game-board {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* Creates a 4x4 grid */
  gap: 10px;
  margin: 20px auto;
  max-width: 600px;
}

/* Game stats and controls */
#game-stats, #game-controls {
  margin: 15px 0;
  text-align: center;
}
```

### 2. Card Styling
```css
/* Card base styling */
.card {
  position: relative;
  height: 120px;
  cursor: pointer;
  transform-style: preserve-3d;
  transition: transform 0.5s;
}

/* Card faces (front and back) */
.card-front, .card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  backface-visibility: hidden;
}

.card-back {
  background-color: #2980b9;
  color: white;
  font-size: 24px;
}

.card-front {
  background-color: #f1f1f1;
  transform: rotateY(180deg);
  font-size: 24px;
}

/* Card flip effect */
.card.flipped {
  transform: rotateY(180deg);
}

/* Matched cards */
.card.matched .card-front {
  background-color: #27ae60;
  color: white;
}
```

### 3. Controls and Indicators
```css
/* Buttons */
button {
  padding: 8px 16px;
  margin: 0 5px;
  background-color: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #2980b9;
}

/* Game stats */
#game-stats {
  font-size: 18px;
  font-weight: bold;
}
```

## JavaScript (script.js)

### 1. Game State and Variables
```javascript
// Game state variables
let cards = [];           // Array of card values
let selectedCards = [];   // Currently selected cards (max 2)
let matchedPairs = 0;     // Number of matched pairs found
let moves = 0;            // Number of moves made
let gameStarted = false;  // Whether game is in progress
let timer = null;         // Timer reference
let seconds = 0;          // Elapsed seconds

// DOM elements
const gameBoard = document.getElementById('game-board');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const gameStats = document.getElementById('game-stats');
```

### 2. Game Initialization
```javascript
// Initialize the game
function initGame() {
  // Reset game state
  cards = [];
  selectedCards = [];
  matchedPairs = 0;
  moves = 0;
  seconds = 0;
  gameStarted = true;
  
  // Clear previous board
  gameBoard.innerHTML = '';
  
  // Create card pairs (for a 4x4 game = 8 pairs)
  const cardValues = [1, 2, 3, 4, 5, 6, 7, 8];
  
  // Double the values to create pairs
  const cardPairs = [...cardValues, ...cardValues];
  
  // Shuffle the cards
  cards = shuffleArray(cardPairs);
  
  // Create and append card elements
  createCardElements();
  
  // Update game stats display
  updateStats();
  
  // Start the timer
  startTimer();
}

// Shuffle array using Fisher-Yates algorithm
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

// Create card elements and add to game board
function createCardElements() {
  cards.forEach((value, index) => {
    // Create card container
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    card.dataset.value = value;
    
    // Create card back (shows when card is face down)
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');
    cardBack.textContent = '?';
    
    // Create card front (shows when card is flipped)
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');
    cardFront.textContent = value;
    
    // Add card faces to card
    card.appendChild(cardBack);
    card.appendChild(cardFront);
    
    // Add click event listener
    card.addEventListener('click', handleCardClick);
    
    // Add to game board
    gameBoard.appendChild(card);
  });
}
```

### 3. Game Logic
```javascript
// Handle card click
function handleCardClick(event) {
  // Ignore clicks if game hasn't started
  if (!gameStarted) return;
  
  const card = event.currentTarget;
  
  // Ignore already flipped or matched cards
  if (card.classList.contains('flipped') || card.classList.contains('matched')) {
    return;
  }
  
  // Ignore if two cards are already flipped and being checked
  if (selectedCards.length === 2) {
    return;
  }
  
  // Flip the card
  card.classList.add('flipped');
  
  // Add to selected cards
  selectedCards.push(card);
  
  // Check for match if two cards are selected
  if (selectedCards.length === 2) {
    moves++;
    updateStats();
    checkForMatch();
  }
}

// Check if selected cards match
function checkForMatch() {
  const [card1, card2] = selectedCards;
  
  // Compare card values
  if (card1.dataset.value === card2.dataset.value) {
    // Cards match
    handleMatch();
  } else {
    // Cards don't match
    handleMismatch();
  }
}

// Handle matching cards
function handleMatch() {
  selectedCards.forEach(card => {
    card.classList.add('matched');
    
    // Remove click listener from matched cards
    card.removeEventListener('click', handleCardClick);
  });
  
  // Increment matched pairs counter
  matchedPairs++;
  
  // Clear selected cards array
  selectedCards = [];
  
  // Check if game is complete
  if (matchedPairs === cards.length / 2) {
    endGame();
  }
}

// Handle mismatched cards
function handleMismatch() {
  // Wait before flipping cards back
  setTimeout(() => {
    selectedCards.forEach(card => {
      card.classList.remove('flipped');
    });
    
    // Clear selected cards array
    selectedCards = [];
  }, 1000);
}
```

### 4. Game Controls and Stats
```javascript
// Start the game timer
function startTimer() {
  // Clear any existing timer
  clearInterval(timer);
  
  // Reset seconds
  seconds = 0;
  
  // Start a new timer
  timer = setInterval(() => {
    seconds++;
    updateStats();
  }, 1000);
}

// Update game statistics display
function updateStats() {
  // Format time as MM:SS
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  
  // Update stats display
  gameStats.textContent = `Moves: ${moves} | Time: ${formattedTime}`;
}

// End the game
function endGame() {
  // Stop the timer
  clearInterval(timer);
  gameStarted = false;
  
  // Calculate score (simple example)
  const score = Math.max(100 - moves - Math.floor(seconds / 10), 10);
  
  // Show completion message with stats
  setTimeout(() => {
    alert(`Congratulations! You've completed the game!\nMoves: ${moves}\nTime: ${seconds} seconds\nScore: ${score}`);
  }, 500);
}

// Reset the game
function resetGame() {
  clearInterval(timer);
  gameStarted = false;
  gameBoard.innerHTML = '';
  gameStats.textContent = 'Game reset. Press Start to play again.';
}
```

### 5. Event Listeners
```javascript
// Add event listeners to control buttons
document.addEventListener('DOMContentLoaded', () => {
  startButton.addEventListener('click', initGame);
  resetButton.addEventListener('click', resetGame);
  
  // Initial message
  gameStats.textContent = 'Press Start to begin the game';
});
```

## Implementation Steps

1. **Start with HTML**: Update your existing HTML file to match the structure described above
2. **Add CSS**: Implement the CSS to create the board layout and card styling
3. **Basic JavaScript**: Set up the game state variables and DOM references
4. **Card Generation**: Implement the card generation and shuffling functions
5. **Game Logic**: Add the card click handling and matching logic
6. **Game Controls**: Implement the start/reset buttons and timer functionality
7. **Testing**: Test the game thoroughly, making adjustments as needed

## Extensions and Enhancements

Once you have the basic game working, consider these enhancements:

1. **Difficulty Levels**: Add options for different grid sizes (3x4, 4x4, 6x6)
2. **Card Content**: Use images or icons instead of numbers
3. **Animation Effects**: Add more sophisticated animations for card flips and matches
4. **Sound Effects**: Add sounds for card flips, matches, and game completion
5. **Local Storage**: Save high scores in localStorage
6. **Multiplayer**: Implement a simple two-player mode where players take turns

## Debugging Tips

- Use `console.log()` to debug variable values
- Watch for timing issues with the card flipping animation
- Check card matching logic carefully
- Test on different screen sizes to ensure responsive design

Happy coding!
