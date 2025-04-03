// Player symbols
const playerX = 'x';
const playerO = 'o';

// Game state variables
let currentPlayer = playerX;    // Tracks whose turn it is
let gameActive = true;          // Is the game in progress?
let moveCount = 0;              // Tracks number of moves to detect draws

// DOM Elements
const cells = document.querySelectorAll('.cell');               // All grid cells
const gameStatus = document.querySelector('.game-status');      // Game status display
const currentPlayerDisplay = document.getElementById('current-player');  // Current player indicator
const restartButton = document.getElementById('restart-btn');   // Restart button

// Winning combinations - indexes of cell combinations that result in a win
const winningCombinations = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal top-left to bottom-right
    [2, 4, 6]  // Diagonal top-right to bottom-left
];

// Initialize game on page load
initGame();

/**
 * Initializes/resets the game state and board
 * Called at the start and when the game is restarted
 */
function initGame() {
    // Reset all cells and set up click listeners
    cells.forEach(cell => {
        // Remove all markings and animations
        cell.classList.remove('x', 'o', 'win-animation');
        
        // Remove existing event listeners to prevent duplicates
        cell.removeEventListener('click', handleCellClick);
        
        // Add click handler with { once: true } to prevent multiple clicks on same cell
        cell.addEventListener('click', handleCellClick, { once: true });
    });

    // Reset game state
    currentPlayer = playerX;
    gameActive = true;
    moveCount = 0;
    
    // Update display to show current player
    updateGameStatus();
}

/**
 * Handles player moves when a cell is clicked
 * @param {Event} e - Click event
 */
function handleCellClick(e) {
    const cell = e.target;
    
    // Ignore clicks if game is over or cell is already marked
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) {
        return;
    }

    // Add player's mark with animation
    cell.classList.add(currentPlayer);
    cell.style.animation = 'pop 0.3s ease-out';
    setTimeout(() => {
        cell.style.animation = '';
    }, 300);

    // Increment move counter
    moveCount++;

    // Check for win or draw
    if (checkWin()) {
        // Game over - current player won
        gameActive = false;
        highlightWinningCombination();
        updateGameStatus(true);
    } else if (moveCount === 9) {
        // Game over - draw (all 9 cells filled)
        gameActive = false;
        updateGameStatus(false, true);
    } else {
        // Switch to next player
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        updateGameStatus();
    }
}

/**
 * Checks if the current player has won
 * @returns {boolean} - True if the current player has a winning combination
 */
function checkWin() {
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return (
            cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)
        );
    });
}

/**
 * Highlights the winning combination with animation
 * Adds win-animation class to the cells in the winning combination
 */
function highlightWinningCombination() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        // Check if this is the winning combination
        if (
            cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)
        ) {
            // Add animation to winning cells
            cells[a].classList.add('win-animation');
            cells[b].classList.add('win-animation');
            cells[c].classList.add('win-animation');
        }
    });
}

/**
 * Updates the game status display
 * Shows current player, win, or draw messages
 * @param {boolean} isWin - Is this update for a win?
 * @param {boolean} isDraw - Is this update for a draw?
 */
function updateGameStatus(isWin = false, isDraw = false) {
    // Update the current player display
    currentPlayerDisplay.textContent = currentPlayer.toUpperCase();
    currentPlayerDisplay.style.color = currentPlayer === playerX ? 'var(--x-color)' : 'var(--o-color)';
    
    // Update status message based on game state
    if (isWin) {
        // Show winner message
        gameStatus.innerHTML = `<div class="player-turn">Player <span style="color: ${currentPlayer === playerX ? 'var(--x-color)' : 'var(--o-color)'}; font-weight: 700;">${currentPlayer.toUpperCase()}</span> wins!</div>`;
    } else if (isDraw) {
        // Show draw message
        gameStatus.innerHTML = `<div class="player-turn">Game ended in a draw!</div>`;
    } else {
        // Show current player's turn
        gameStatus.innerHTML = `<div class="player-turn">Player <span id="current-player" style="color: ${currentPlayer === playerX ? 'var(--x-color)' : 'var(--o-color)'}; font-weight: 700;">${currentPlayer.toUpperCase()}</span>'s turn</div>`;
    }
}

// Add CSS animation for the pop effect when placing marks
const style = document.createElement('style');
style.textContent = `
    @keyframes pop {
        0% { transform: scale(0.8); opacity: 0.5; }
        50% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Event listener for restart button
restartButton.addEventListener('click', () => {
    // Add animation effect for restart
    const gameBoard = document.querySelector('.game-board');
    gameBoard.style.animation = 'pop 0.5s ease';
    
    // Wait for animation to finish before resetting
    setTimeout(() => {
        gameBoard.style.animation = '';
        initGame();
    }, 500);
});



