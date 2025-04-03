const playerX = 'x';
const playerO = 'o';
let currentPlayer = playerX;
let gameActive = true;
let moveCount = 0;

// Elements
const cells = document.querySelectorAll('.cell');
const gameStatus = document.querySelector('.game-status');
const currentPlayerDisplay = document.getElementById('current-player');
const restartButton = document.getElementById('restart-btn');

// Winning combinations
const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game
initGame();

function initGame() {
    cells.forEach(cell => {
        cell.classList.remove('x', 'o', 'win-animation');
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener('click', handleCellClick, { once: true });
    });

    currentPlayer = playerX;
    gameActive = true;
    moveCount = 0;
    updateGameStatus();
}

function handleCellClick(e) {
    const cell = e.target;
    
    if (!gameActive || cell.classList.contains('x') || cell.classList.contains('o')) {
        return;
    }

    // Add player's mark with animation
    cell.classList.add(currentPlayer);
    cell.style.animation = 'pop 0.3s ease-out';
    setTimeout(() => {
        cell.style.animation = '';
    }, 300);

    moveCount++;

    // Check for win or draw
    if (checkWin()) {
        gameActive = false;
        highlightWinningCombination();
        updateGameStatus(true);
    } else if (moveCount === 9) {
        gameActive = false;
        updateGameStatus(false, true);
    } else {
        // Switch player
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
        updateGameStatus();
    }
}

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

function highlightWinningCombination() {
    winningCombinations.forEach(combination => {
        const [a, b, c] = combination;
        if (
            cells[a].classList.contains(currentPlayer) &&
            cells[b].classList.contains(currentPlayer) &&
            cells[c].classList.contains(currentPlayer)
        ) {
            cells[a].classList.add('win-animation');
            cells[b].classList.add('win-animation');
            cells[c].classList.add('win-animation');
        }
    });
}

function updateGameStatus(isWin = false, isDraw = false) {
    currentPlayerDisplay.textContent = currentPlayer.toUpperCase();
    currentPlayerDisplay.style.color = currentPlayer === playerX ? 'var(--x-color)' : 'var(--o-color)';
    
    if (isWin) {
        gameStatus.innerHTML = `<div class="player-turn">Player <span style="color: ${currentPlayer === playerX ? 'var(--x-color)' : 'var(--o-color)'}; font-weight: 700;">${currentPlayer.toUpperCase()}</span> wins!</div>`;
    } else if (isDraw) {
        gameStatus.innerHTML = `<div class="player-turn">Game ended in a draw!</div>`;
    } else {
        gameStatus.innerHTML = `<div class="player-turn">Player <span id="current-player" style="color: ${currentPlayer === playerX ? 'var(--x-color)' : 'var(--o-color)'}; font-weight: 700;">${currentPlayer.toUpperCase()}</span>'s turn</div>`;
    }
}

// Add CSS animation
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
    
    setTimeout(() => {
        gameBoard.style.animation = '';
        initGame();
    }, 500);
});



