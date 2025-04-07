/**
 * Memory Game
 * A modular implementation of a memory card matching game
 */

// Use strict mode for better error checking and performance
'use strict';

// ======= Main Game Module (Revealing Module Pattern) =======
const MemoryGame = (() => {
  // Private constants
  const CARD_FLIP_DELAY = 1000; // ms to wait before flipping mismatched cards back
  const COMPLETION_DELAY = 500; // ms to wait before showing game completion message
  
  // Difficulty settings with grid dimensions and pairs
  const DIFFICULTY = {
    easy: { rows: 4, cols: 4, maxPairs: 8 },
    medium: { rows: 5, cols: 4, maxPairs: 10 },
    hard: { rows: 6, cols: 6, maxPairs: 18 }
  };
  
  // Game state
  const state = {
    cards: [],
    selectedCards: [],
    matchedPairs: 0,
    moves: 0,
    timer: null,
    seconds: 0,
    isGameActive: false,
    currentDifficulty: 'easy'
  };
  
  /**
   * Initialize event listeners for game controls
   */
  const initEventListeners = () => {
    try {
      // Game control buttons
      document.getElementById('start-button').addEventListener('click', startGame);
      document.getElementById('reset-button').addEventListener('click', resetGame);
      
      // Difficulty buttons
      document.getElementById('easy-button').addEventListener('click', () => setDifficulty('easy'));
      document.getElementById('medium-button').addEventListener('click', () => setDifficulty('medium'));
      document.getElementById('hard-button').addEventListener('click', () => setDifficulty('hard'));
      
      // Set current year in footer
      const yearElement = document.getElementById('current-year');
      if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
      }
      
      // Initialize game stats display
      updateStats();
    } catch (error) {
      console.error('Error initializing event listeners:', error);
    }
  };

  /**
   * Set game difficulty level
   * @param {string} level - Difficulty level (easy, medium, hard)
   */
  const setDifficulty = (level) => {
    if (!DIFFICULTY[level]) {
      console.error(`Invalid difficulty level: ${level}`);
      return;
    }
    
    state.currentDifficulty = level;
    
    // Update UI to reflect selected difficulty
    Object.keys(DIFFICULTY).forEach(diff => {
      const button = document.getElementById(`${diff}-button`);
      if (button) {
        button.setAttribute('aria-pressed', diff === level ? 'true' : 'false');
      }
    });
    
    // If game is active, reset it for the new difficulty
    if (state.isGameActive) {
      resetGame();
    }
  };

  /**
   * Start a new game
   */
  const startGame = () => {
    try {
      // Reset game state
      resetGameState();
      state.isGameActive = true;
      
      // Get difficulty settings
      const { rows, cols, maxPairs } = DIFFICULTY[state.currentDifficulty];
      
      // Generate card values (pairs)
      const totalPairs = Math.min(maxPairs, (rows * cols) / 2);
      const cardValues = generateCardValues(totalPairs);
      
      // Create and shuffle cards
      state.cards = shuffleArray([...cardValues, ...cardValues]);
      
      // Create the game board with cards
      createGameBoard(rows, cols);
      
      // Start the timer
      startTimer();
      
      // Update game statistics display
      updateStats();
    } catch (error) {
      console.error('Error starting game:', error);
      UI.showError('Failed to start the game. Please try again.');
    }
  };

  /**
   * Reset the current game
   */
  const resetGame = () => {
    try {
      stopTimer();
      state.isGameActive = false;
      
      // Clear the game board
      const gameBoard = document.getElementById('game-board');
      if (gameBoard) {
        gameBoard.innerHTML = '';
      }
      
      // Reset game state and update stats
      resetGameState();
      updateStats('Game reset. Press Start to play again.');
    } catch (error) {
      console.error('Error resetting game:', error);
    }
  };

  /**
   * Reset game state variables to initial values
   */
  const resetGameState = () => {
    state.cards = [];
    state.selectedCards = [];
    state.matchedPairs = 0;
    state.moves = 0;
    state.seconds = 0;
    stopTimer();
  };

  /**
   * Generate an array of unique card values
   * @param {number} count - Number of unique values (pairs) to generate
   * @returns {Array} Array of unique values
   */
  const generateCardValues = (count) => {
    // For testing we'll use numbers, but this could be extended to use images, etc.
    return Array.from({ length: count }, (_, i) => i + 1);
  };

  /**
   * Create the game board with cards arranged in a grid
   * @param {number} rows - Number of rows in the grid
   * @param {number} cols - Number of columns in the grid
   */
  const createGameBoard = (rows, cols) => {
    try {
      const gameBoard = document.getElementById('game-board');
      if (!gameBoard) throw new Error('Game board element not found');
      
      // Clear existing board
      gameBoard.innerHTML = '';
      
      // Set grid template based on rows and columns
      gameBoard.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
      gameBoard.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
      
      // Get card template
      const cardTemplate = document.getElementById('card-template');
      if (!cardTemplate) throw new Error('Card template not found');
      
      // Create each card from template and add to board
      state.cards.forEach((value, index) => {
        const cardClone = document.importNode(cardTemplate.content, true);
        const card = cardClone.querySelector('.card');
        
        // Set data attributes
        card.dataset.index = index;
        card.dataset.value = value;
        
        // Set ARIA label with card position
        const row = Math.floor(index / cols) + 1;
        const col = (index % cols) + 1;
        card.setAttribute('aria-label', `Card ${row}-${col}`);
        
        // Set card content
        const cardFront = card.querySelector('.card-front');
        if (cardFront) {
          cardFront.textContent = value;
        }
        
        // Add click event listener
        card.addEventListener('click', handleCardClick);
        
        // Add keyboard support
        card.addEventListener('keydown', event => {
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            handleCardClick({ currentTarget: card });
          }
        });
        
        // Add to game board
        gameBoard.appendChild(card);
      });
    } catch (error) {
      console.error('Error creating game board:', error);
      UI.showError('Failed to create the game board. Please reload the page.');
    }
  };

  /**
   * Handle card click event
   * @param {Event} event - Click event
   */
  const handleCardClick = (event) => {
    try {
      // Ignore clicks if game is not active
      if (!state.isGameActive) return;
      
      const card = event.currentTarget;
      
      // Ignore if card is already flipped or matched
      if (card.classList.contains('flipped') || card.classList.contains('matched')) {
        return;
      }
      
      // Ignore if two cards are already flipped and being checked
      if (state.selectedCards.length === 2) {
        return;
      }
      
      // Flip the card
      card.classList.add('flipped');
      
      // Announce flip for screen readers
      UI.announceAction(`Card ${card.dataset.value} revealed`);
      
      // Add to selected cards
      state.selectedCards.push(card);
      
      // Check for match if two cards are selected
      if (state.selectedCards.length === 2) {
        state.moves++;
        updateStats();
        checkForMatch();
      }
    } catch (error) {
      console.error('Error handling card click:', error);
    }
  };

  /**
   * Check if selected cards match
   */
  const checkForMatch = () => {
    try {
      const [card1, card2] = state.selectedCards;
      
      // Compare card values
      if (card1.dataset.value === card2.dataset.value) {
        handleMatch();
      } else {
        handleMismatch();
      }
    } catch (error) {
      console.error('Error checking for match:', error);
      state.selectedCards = [];
    }
  };

  /**
   * Handle matching cards
   */
  const handleMatch = () => {
    try {
      state.selectedCards.forEach(card => {
        card.classList.add('matched');
        
        // Update ARIA to indicate match for accessibility
        card.setAttribute('aria-label', `Matched ${card.dataset.value}`);
        
        // Remove click event listener
        card.removeEventListener('click', handleCardClick);
      });
      
      // Announce match for screen readers
      UI.announceAction('Cards matched!');
      
      // Increment matched pairs counter
      state.matchedPairs++;
      
      // Clear selected cards array
      state.selectedCards = [];
      
      // Check if game is complete
      if (state.matchedPairs === state.cards.length / 2) {
        endGame();
      }
    } catch (error) {
      console.error('Error handling match:', error);
      state.selectedCards = [];
    }
  };

  /**
   * Handle mismatched cards
   */
  const handleMismatch = () => {
    try {
      // Announce mismatch for screen readers
      UI.announceAction('Cards do not match');
      
      // Wait before flipping cards back
      setTimeout(() => {
        state.selectedCards.forEach(card => {
          card.classList.remove('flipped');
        });
        
        // Clear selected cards array
        state.selectedCards = [];
      }, CARD_FLIP_DELAY);
    } catch (error) {
      console.error('Error handling mismatch:', error);
      state.selectedCards = [];
    }
  };

  /**
   * Start the game timer
   */
  const startTimer = () => {
    try {
      // Clear any existing timer
      stopTimer();
      
      // Start a new timer
      state.timer = setInterval(() => {
        state.seconds++;
        updateStats();
      }, 1000);
    } catch (error) {
      console.error('Error starting timer:', error);
    }
  };

  /**
   * Stop the game timer
   */
  const stopTimer = () => {
    try {
      clearInterval(state.timer);
      state.timer = null;
    } catch (error) {
      console.error('Error stopping timer:', error);
    }
  };

  /**
   * Update game statistics display
   * @param {string} [customMessage] - Optional custom message to display instead of stats
   */
  const updateStats = (customMessage = null) => {
    try {
      const gameStats = document.getElementById('game-stats');
      if (!gameStats) return;
      
      if (customMessage) {
        gameStats.textContent = customMessage;
        return;
      }
      
      // Format time as MM:SS
      const minutes = Math.floor(state.seconds / 60);
      const remainingSeconds = state.seconds % 60;
      const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      
      // Show different message based on game state
      if (!state.isGameActive) {
        gameStats.textContent = 'Press Start to begin the game';
      } else {
        gameStats.textContent = `Moves: ${state.moves} | Time: ${formattedTime}`;
      }
    } catch (error) {
      console.error('Error updating stats:', error);
    }
  };

  /**
   * End the game
   */
  const endGame = () => {
    try {
      // Stop the timer
      stopTimer();
      state.isGameActive = false;
      
      // Calculate score based on moves and time
      const score = calculateScore();
      
      // Update the stats display with final score
      updateStats(`Game Complete! Moves: ${state.moves} | Time: ${formatTime(state.seconds)} | Score: ${score}`);
      
      // Show completion message after a short delay
      setTimeout(() => {
        UI.showGameComplete({
          moves: state.moves,
          time: state.seconds,
          score
        });
      }, COMPLETION_DELAY);
    } catch (error) {
      console.error('Error ending game:', error);
    }
  };

  /**
   * Calculate score based on moves and time
   * @returns {number} - Final score
   */
  const calculateScore = () => {
    // Base score depends on difficulty
    const difficultyBase = {
      easy: 100,
      medium: 150,
      hard: 200
    };
    
    // Calculate deductions for moves and time
    const base = difficultyBase[state.currentDifficulty];
    const moveDeduction = state.moves * 2;
    const timeDeduction = Math.floor(state.seconds / 5);
    
    // Calculate final score (minimum 10)
    return Math.max(base - moveDeduction - timeDeduction, 10);
  };

  /**
   * Format time in seconds to MM:SS format
   * @param {number} seconds - Time in seconds
   * @returns {string} - Formatted time string
   */
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  /**
   * Shuffle an array using Fisher-Yates algorithm
   * @param {Array} array - Array to shuffle
   * @returns {Array} - New shuffled array
   */
  const shuffleArray = (array) => {
    try {
      const newArray = [...array];
      for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
      }
      return newArray;
    } catch (error) {
      console.error('Error shuffling array:', error);
      return [...array];
    }
  };

  /**
   * Initialize the game
   */
  const init = () => {
    try {
      // Set up event listeners
      initEventListeners();
      
      // Display initial message
      updateStats('Press Start to begin the game');
      
      console.log('Memory Game initialized successfully');
    } catch (error) {
      console.error('Error initializing game:', error);
      UI.showError('Failed to initialize the game. Please reload the page.');
    }
  };

  // Public API
  return {
    init,
    startGame,
    resetGame,
    setDifficulty
  };
})();

// ======= UI Utilities =======
const UI = (() => {
  /**
   * Show error message to user
   * @param {string} message - Error message to display
   */
  const showError = (message) => {
    try {
      console.error(message);
      alert(`Error: ${message}`);
    } catch (error) {
      console.error('Error displaying error message:', error);
    }
  };

  /**
   * Show game completion message with stats
   * @param {Object} stats - Game statistics
   * @param {number} stats.moves - Number of moves made
   * @param {number} stats.time - Time taken in seconds
   * @param {number} stats.score - Final score
   */
  const showGameComplete = ({ moves, time, score }) => {
    try {
      // Format time for display
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      const timeDisplay = `${minutes}:${seconds.toString().padStart(2, '0')}`;
      
      alert(`Congratulations! You've completed the game!\n\nMoves: ${moves}\nTime: ${timeDisplay}\nScore: ${score}`);
    } catch (error) {
      console.error('Error showing game completion message:', error);
    }
  };

  /**
   * Announce action for screen readers
   * @param {string} message - Message to announce
   */
  const announceAction = (message) => {
    try {
      // For future implementation of live region for screen reader announcements
      // This would typically be done with an aria-live region
      console.log(`Screen reader: ${message}`);
    } catch (error) {
      console.error('Error announcing action:', error);
    }
  };

  // Public API
  return {
    showError,
    showGameComplete,
    announceAction
  };
})();

// Initialize the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  MemoryGame.init();
  
  // Click counter functionality
  const clickButton = document.getElementById('click-counter-button');
  const clickCount = document.getElementById('click-count');
  console.log('Click button:', clickButton);
  console.log('Click count:', clickCount);
  
  let count = 0;
  
  if (clickButton && clickCount) {
    clickButton.addEventListener('click', () => {
      count++;
      clickCount.textContent = count;
      console.log('Button clicked, new count:', count);
    });
    console.log('Click event listener added successfully');
  } else {
    console.error('Click counter elements not found');
  }
});



