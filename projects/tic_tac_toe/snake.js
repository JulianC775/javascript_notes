// Snake Game
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const snakeGrid = document.getElementById('snake-grid');
    const scoreDisplay = document.getElementById('snake-score');
    const finalScoreDisplay = document.getElementById('final-score');
    const restartButton = document.getElementById('snake-restart-btn');
    const playAgainButton = document.getElementById('play-again-btn');
    const gameOverScreen = document.getElementById('game-over-screen');
    
    // Game settings
    const gridSize = 10;
    const cellCount = gridSize * gridSize;
    const initialSpeed = 200; // Milliseconds between moves
    
    // Game state
    let snake = []; // Array of indices representing snake parts
    let food = -1; // Index of food location
    let direction = 'right'; // Current direction: 'up', 'right', 'down', 'left'
    let nextDirection = 'right'; // Next direction to move (prevents 180° turns)
    let gameActive = false; // Is the game running?
    let gameInterval = null; // Interval for game loop
    let score = 0; // Current score
    let speedReduction = 5; // Reduce speed by this amount per food eaten
    let currentSpeed = initialSpeed; // Current game speed
    
    // Create the grid
    function createGrid() {
        // Clear existing grid
        snakeGrid.innerHTML = '';
        
        // Create cells
        for (let i = 0; i < cellCount; i++) {
            const cell = document.createElement('div');
            cell.classList.add('snake-cell');
            snakeGrid.appendChild(cell);
        }
    }
    
    // Initialize or reset the game
    function initGame() {
        // Reset game state
        clearInterval(gameInterval);
        snake = [44, 43, 42]; // Start in the middle with 3 segments
        direction = 'right';
        nextDirection = 'right';
        score = 0;
        currentSpeed = initialSpeed;
        gameActive = true;
        gameOverScreen.classList.remove('active');
        
        // Update score display
        scoreDisplay.textContent = score;
        
        // Clear all cell states
        const cells = snakeGrid.querySelectorAll('.snake-cell');
        cells.forEach(cell => {
            cell.classList.remove('snake-head', 'snake-body', 'snake-food');
        });
        
        // Draw initial snake
        drawSnake();
        
        // Place initial food
        placeFood();
        
        // Start game loop
        gameInterval = setInterval(gameLoop, currentSpeed);
    }
    
    // Draw the snake
    function drawSnake() {
        // Clear previous snake
        const cells = snakeGrid.querySelectorAll('.snake-cell');
        cells.forEach(cell => {
            cell.classList.remove('snake-head', 'snake-body');
        });
        
        // Draw snake body
        for (let i = 1; i < snake.length; i++) {
            if (snake[i] >= 0 && snake[i] < cellCount) {
                cells[snake[i]].classList.add('snake-body');
            }
        }
        
        // Draw snake head
        if (snake[0] >= 0 && snake[0] < cellCount) {
            cells[snake[0]].classList.add('snake-head');
        }
    }
    
    // Place food at a random empty cell
    function placeFood() {
        const cells = snakeGrid.querySelectorAll('.snake-cell');
        let availableCells = [];
        
        // Find all empty cells
        for (let i = 0; i < cellCount; i++) {
            if (!snake.includes(i)) {
                availableCells.push(i);
            }
        }
        
        // Remove previous food
        if (food >= 0) {
            cells[food].classList.remove('snake-food');
        }
        
        // Place new food
        if (availableCells.length > 0) {
            food = availableCells[Math.floor(Math.random() * availableCells.length)];
            cells[food].classList.add('snake-food');
        } else {
            // No empty cells left - you win!
            gameOver(true);
        }
    }
    
    // Game loop
    function gameLoop() {
        // Update direction
        direction = nextDirection;
        
        // Calculate new head position
        const head = snake[0];
        let newHead;
        
        // Grid is 10x10, so we need to calculate row and column
        const row = Math.floor(head / gridSize);
        const col = head % gridSize;
        
        // Calculate new head based on direction
        switch (direction) {
            case 'up':
                newHead = head - gridSize;
                // Check if we're moving off the top
                if (row === 0) {
                    newHead = head + (gridSize * (gridSize - 1)); // Wrap to bottom
                }
                break;
            case 'right':
                newHead = head + 1;
                // Check if we're moving off the right
                if (col === gridSize - 1) {
                    newHead = head - (gridSize - 1); // Wrap to left
                }
                break;
            case 'down':
                newHead = head + gridSize;
                // Check if we're moving off the bottom
                if (row === gridSize - 1) {
                    newHead = head - (gridSize * (gridSize - 1)); // Wrap to top
                }
                break;
            case 'left':
                newHead = head - 1;
                // Check if we're moving off the left
                if (col === 0) {
                    newHead = head + (gridSize - 1); // Wrap to right
                }
                break;
        }
        
        // Check collision with self (except the tail which will move)
        // We check against all but the last segment, as the tail will move away
        if (snake.slice(0, snake.length - 1).includes(newHead)) {
            gameOver();
            return;
        }
        
        // Add new head
        snake.unshift(newHead);
        
        // Check if we ate food
        if (newHead === food) {
            // Update score
            score++;
            scoreDisplay.textContent = score;
            
            // Increase speed
            if (currentSpeed > 50) { // Minimum speed cap
                currentSpeed -= speedReduction;
                clearInterval(gameInterval);
                gameInterval = setInterval(gameLoop, currentSpeed);
            }
            
            // Place new food
            placeFood();
        } else {
            // Remove tail if we didn't eat
            snake.pop();
        }
        
        // Draw updated snake
        drawSnake();
    }
    
    // Game over
    function gameOver(victory = false) {
        gameActive = false;
        clearInterval(gameInterval);
        
        // Show game over screen
        finalScoreDisplay.textContent = score;
        gameOverScreen.classList.add('active');
        
        // Add victory class if player won
        if (victory) {
            gameOverScreen.querySelector('h2').textContent = 'Victory!';
        } else {
            gameOverScreen.querySelector('h2').textContent = 'Game Over!';
        }
    }
    
    // Handle keyboard input
    function handleKeyDown(e) {
        if (!gameActive) return;
        
        // Prevent default behavior for arrow keys
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd', 'W', 'A', 'S', 'D'].includes(e.key)) {
            e.preventDefault();
        }
        
        // Determine new direction
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
            case 'W':
                if (direction !== 'down') nextDirection = 'up';
                break;
            case 'ArrowRight':
            case 'd':
            case 'D':
                if (direction !== 'left') nextDirection = 'right';
                break;
            case 'ArrowDown':
            case 's':
            case 'S':
                if (direction !== 'up') nextDirection = 'down';
                break;
            case 'ArrowLeft':
            case 'a':
            case 'A':
                if (direction !== 'right') nextDirection = 'left';
                break;
        }
    }
    
    // Add touch controls for mobile (swipes)
    let touchStartX = 0;
    let touchStartY = 0;
    
    function handleTouchStart(e) {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
    }
    
    function handleTouchEnd(e) {
        if (!gameActive) return;
        
        const touchEndX = e.changedTouches[0].screenX;
        const touchEndY = e.changedTouches[0].screenY;
        
        const diffX = touchEndX - touchStartX;
        const diffY = touchEndY - touchStartY;
        
        // Determine swipe direction (using the direction with the larger magnitude)
        if (Math.abs(diffX) > Math.abs(diffY)) {
            // Horizontal swipe
            if (diffX > 0 && direction !== 'left') {
                nextDirection = 'right';
            } else if (diffX < 0 && direction !== 'right') {
                nextDirection = 'left';
            }
        } else {
            // Vertical swipe
            if (diffY > 0 && direction !== 'up') {
                nextDirection = 'down';
            } else if (diffY < 0 && direction !== 'down') {
                nextDirection = 'up';
            }
        }
    }
    
    // Event listeners
    document.addEventListener('keydown', handleKeyDown);
    snakeGrid.addEventListener('touchstart', handleTouchStart, false);
    snakeGrid.addEventListener('touchend', handleTouchEnd, false);
    
    // Restart button listener
    restartButton.addEventListener('click', () => {
        initGame();
    });
    
    // Play Again button listener
    playAgainButton.addEventListener('click', () => {
        initGame();
    });
    
    // Create the initial grid
    createGrid();
    
    // Initialize the game when this script loads
    initGame();
}); 