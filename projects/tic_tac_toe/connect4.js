// Connect 4 Game Logic
const ROWS = 6;
const COLUMNS = 7;
const EMPTY = 'empty';
const RED = 'red';
const YELLOW = 'yellow';

// Game state
let currentC4Player = RED;
let c4GameActive = true;
let c4Board = createEmptyBoard();

// DOM Elements
let c4Grid;
let c4CurrentPlayer;
let c4RestartButton;
let c4GameStatus;

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeDOMElements();
    initC4Game();
    
    // Event listener for restart button
    c4RestartButton.addEventListener('click', () => {
        console.log('Connect 4 restart button clicked');
        // Add animation effect for restart
        const gameBoard = document.querySelector('.c4-board');
        gameBoard.style.animation = 'pop 0.5s ease';
        
        setTimeout(() => {
            gameBoard.style.animation = '';
            initC4Game();
        }, 500);
    });
});

function initializeDOMElements() {
    c4Grid = document.getElementById('c4-grid');
    c4CurrentPlayer = document.getElementById('c4-current-player');
    c4RestartButton = document.getElementById('c4-restart-btn');
    
    if (!c4Grid || !c4CurrentPlayer || !c4RestartButton) {
        console.error('Connect 4 DOM elements not found:', {
            grid: c4Grid,
            player: c4CurrentPlayer,
            button: c4RestartButton
        });
        return;
    }
    
    c4GameStatus = c4CurrentPlayer.closest('.game-status');
    console.log('Connect 4 DOM elements initialized successfully');
}

function initC4Game() {
    if (!c4Grid) {
        console.error('Cannot initialize Connect 4 game - grid element not found');
        return;
    }
    
    // Clear the grid
    c4Grid.innerHTML = '';
    
    // Create board data structure
    c4Board = createEmptyBoard();
    
    // Create visual Connect 4 grid
    createC4Grid();
    
    // Set initial game state
    currentC4Player = RED;
    c4GameActive = true;
    
    // Update player display
    updateC4GameStatus();
    
    console.log('Connect 4 game initialized');
}

function createEmptyBoard() {
    // Create a 2D array filled with empty values
    const board = [];
    for (let row = 0; row < ROWS; row++) {
        const newRow = [];
        for (let col = 0; col < COLUMNS; col++) {
            newRow.push(EMPTY);
        }
        board.push(newRow);
    }
    return board;
}

function createC4Grid() {
    // Create hover indicators and columns
    for (let col = 0; col < COLUMNS; col++) {
        const column = document.createElement('div');
        column.classList.add('c4-column');
        column.dataset.column = col;
        column.addEventListener('click', handleColumnClick);
        
        // Add indicator for hover effect
        const indicator = document.createElement('div');
        indicator.classList.add('c4-indicator');
        column.appendChild(indicator);
        
        // Add slots to the column
        for (let row = 0; row < ROWS; row++) {
            const slot = document.createElement('div');
            slot.classList.add('c4-slot');
            slot.dataset.row = ROWS - 1 - row; // Invert rows so 0 is at the bottom
            slot.dataset.col = col;
            column.appendChild(slot);
        }
        
        c4Grid.appendChild(column);
    }
}

function handleColumnClick(e) {
    if (!c4GameActive) return;
    
    const column = parseInt(e.currentTarget.dataset.column);
    const row = findAvailableRow(column);
    
    if (row === -1) return; // Column is full
    
    // Drop piece animation and update
    dropPiece(row, column, currentC4Player);
    
    // Check for win or draw
    if (checkC4Win(row, column, currentC4Player)) {
        c4GameActive = false;
        highlightWinningPieces();
        updateC4GameStatus(true);
    } else if (isBoardFull()) {
        c4GameActive = false;
        updateC4GameStatus(false, true);
    } else {
        // Switch player
        currentC4Player = currentC4Player === RED ? YELLOW : RED;
        updateC4GameStatus();
        
        // Update indicators for next player
        updateIndicators();
    }
}

function findAvailableRow(column) {
    // Start from the bottom (row 0) and move up
    for (let row = 0; row < ROWS; row++) {
        if (c4Board[row][column] === EMPTY) {
            return row;
        }
    }
    return -1; // Column is full
}

function dropPiece(row, column, player) {
    // Update data structure
    c4Board[row][column] = player;
    
    // Get the visual representation
    const slot = document.querySelector(`.c4-slot[data-row="${row}"][data-col="${column}"]`);
    
    // Add animation class
    slot.style.animation = 'dropPiece 0.5s ease-in-out forwards';
    
    // Add the player's color class
    slot.classList.add(player);
    
    // Play drop sound effect
    playDropSound();
}

function playDropSound() {
    // Create and play a simple drop sound effect
    const audio = new Audio();
    audio.volume = 0.3;
    
    // Simple oscillator-based sound
    const context = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    
    oscillator.connect(gain);
    gain.connect(context.destination);
    
    oscillator.type = 'sine';
    oscillator.frequency.value = currentC4Player === RED ? 350 : 250;
    
    gain.gain.setValueAtTime(0.3, context.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, context.currentTime + 0.3);
    
    oscillator.start();
    oscillator.stop(context.currentTime + 0.3);
}

function checkC4Win(row, column, player) {
    // Check horizontal win
    if (checkDirection(row, column, 0, 1, player) + checkDirection(row, column, 0, -1, player) - 1 >= 4) {
        return true;
    }
    
    // Check vertical win
    if (checkDirection(row, column, 1, 0, player) + checkDirection(row, column, -1, 0, player) - 1 >= 4) {
        return true;
    }
    
    // Check diagonal (up-right to down-left)
    if (checkDirection(row, column, 1, 1, player) + checkDirection(row, column, -1, -1, player) - 1 >= 4) {
        return true;
    }
    
    // Check diagonal (up-left to down-right)
    if (checkDirection(row, column, 1, -1, player) + checkDirection(row, column, -1, 1, player) - 1 >= 4) {
        return true;
    }
    
    return false;
}

function checkDirection(row, column, rowIncrement, columnIncrement, player) {
    let count = 0;
    let r = row;
    let c = column;
    
    while (r >= 0 && r < ROWS && c >= 0 && c < COLUMNS && c4Board[r][c] === player) {
        count++;
        r += rowIncrement;
        c += columnIncrement;
    }
    
    return count;
}

function highlightWinningPieces() {
    // Find and highlight connected pieces
    const winningSlots = findWinningSlots();
    
    winningSlots.forEach(slot => {
        slot.classList.add('win-bounce');
    });
}

function findWinningSlots() {
    const winningSlots = [];
    
    // Check all possible winning combinations
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (c4Board[row][col] !== currentC4Player) continue;
            
            // Check horizontal
            if (col <= COLUMNS - 4) {
                let isWinning = true;
                for (let i = 0; i < 4; i++) {
                    if (c4Board[row][col + i] !== currentC4Player) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) {
                    for (let i = 0; i < 4; i++) {
                        const slot = document.querySelector(`.c4-slot[data-row="${row}"][data-col="${col + i}"]`);
                        winningSlots.push(slot);
                    }
                    return winningSlots;
                }
            }
            
            // Check vertical
            if (row <= ROWS - 4) {
                let isWinning = true;
                for (let i = 0; i < 4; i++) {
                    if (c4Board[row + i][col] !== currentC4Player) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) {
                    for (let i = 0; i < 4; i++) {
                        const slot = document.querySelector(`.c4-slot[data-row="${row + i}"][data-col="${col}"]`);
                        winningSlots.push(slot);
                    }
                    return winningSlots;
                }
            }
            
            // Check diagonal (down-right)
            if (row <= ROWS - 4 && col <= COLUMNS - 4) {
                let isWinning = true;
                for (let i = 0; i < 4; i++) {
                    if (c4Board[row + i][col + i] !== currentC4Player) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) {
                    for (let i = 0; i < 4; i++) {
                        const slot = document.querySelector(`.c4-slot[data-row="${row + i}"][data-col="${col + i}"]`);
                        winningSlots.push(slot);
                    }
                    return winningSlots;
                }
            }
            
            // Check diagonal (down-left)
            if (row <= ROWS - 4 && col >= 3) {
                let isWinning = true;
                for (let i = 0; i < 4; i++) {
                    if (c4Board[row + i][col - i] !== currentC4Player) {
                        isWinning = false;
                        break;
                    }
                }
                if (isWinning) {
                    for (let i = 0; i < 4; i++) {
                        const slot = document.querySelector(`.c4-slot[data-row="${row + i}"][data-col="${col - i}"]`);
                        winningSlots.push(slot);
                    }
                    return winningSlots;
                }
            }
        }
    }
    
    return winningSlots;
}

function isBoardFull() {
    for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLUMNS; col++) {
            if (c4Board[row][col] === EMPTY) {
                return false;
            }
        }
    }
    return true;
}

function updateC4GameStatus(isWin = false, isDraw = false) {
    if (!c4CurrentPlayer || !c4GameStatus) {
        console.error('Cannot update game status - elements not found');
        return;
    }
    
    c4CurrentPlayer.textContent = currentC4Player === RED ? 'Red' : 'Yellow';
    c4CurrentPlayer.className = currentC4Player === RED ? 'player-red' : 'player-yellow';
    
    if (isWin) {
        c4GameStatus.innerHTML = `<div class="player-turn">Player <span class="${currentC4Player === RED ? 'player-red' : 'player-yellow'}">${currentC4Player === RED ? 'Red' : 'Yellow'}</span> wins!</div>`;
    } else if (isDraw) {
        c4GameStatus.innerHTML = `<div class="player-turn">Game ended in a draw!</div>`;
    } else {
        c4GameStatus.innerHTML = `<div class="player-turn">Player <span id="c4-current-player" class="${currentC4Player === RED ? 'player-red' : 'player-yellow'}">${currentC4Player === RED ? 'Red' : 'Yellow'}</span>'s turn</div>`;
        // Update the current player reference after changing the HTML
        c4CurrentPlayer = document.getElementById('c4-current-player');
    }
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.c4-indicator');
    indicators.forEach(indicator => {
        indicator.className = 'c4-indicator';
        if (currentC4Player === YELLOW) {
            indicator.classList.add('player-yellow');
        }
    });
} 