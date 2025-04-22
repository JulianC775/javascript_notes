// Chess Game Logic
document.addEventListener('DOMContentLoaded', () => {
    // Board configuration - standard 8x8 chess board
    const ROWS = 8;
    const COLUMNS = 8;
    const WHITE = 'white';
    const BLACK = 'black';
    
    // Chess pieces configuration - constants for each piece type
    const PAWN = 'pawn';
    const ROOK = 'rook';
    const KNIGHT = 'knight';
    const BISHOP = 'bishop';
    const QUEEN = 'queen';
    const KING = 'king';
    const EMPTY = 'empty'; // Represents an empty square
    
    // Game state variables
    let currentPlayer = WHITE; // Track whose turn it is
    let gameActive = true; // Is the game in progress?
    let selectedPiece = null; // Currently selected piece for movement
    let moveHistory = []; // Store moves for undo functionality
    let board = createInitialBoard(); // 2D array representing the board state
    let kingPositions = {
        // Track king positions for check/checkmate detection
        [WHITE]: { row: 0, col: 4 },
        [BLACK]: { row: 7, col: 4 }
    };
    let capturedPieces = {
        // Track captured pieces for display
        [WHITE]: [],
        [BLACK]: []
    };
    
    // DOM Elements - declared here but initialized after DOM is loaded
    let chessGrid;
    let chessCurrentPlayer;
    let chessRestartButton;
    let chessUndoButton;
    let chessGameStatus;
    let chessCapturedWhite;
    let chessCapturedBlack;
    
    // Initialize DOM elements and game
    initializeDOM();
    initChessGame();
    
    /**
     * Initializes all DOM elements needed for the chess game
     * Gets references to grid, status displays, buttons, etc.
     */
    function initializeDOM() {
        chessGrid = document.getElementById('chess-grid');
        chessCurrentPlayer = document.getElementById('chess-current-player');
        chessRestartButton = document.getElementById('chess-restart-btn');
        chessUndoButton = document.getElementById('chess-undo-btn');
        chessGameStatus = document.querySelector('.chess-container .game-status');
        chessCapturedWhite = document.querySelector('.chess-captured-white');
        chessCapturedBlack = document.querySelector('.chess-captured-black');
        
        // Safety check to make sure elements exist
        if (!chessGrid || !chessCurrentPlayer || !chessRestartButton || !chessUndoButton) {
            console.error('Chess DOM elements not found');
            return;
        }
        
        // Add event listeners for game controls
        chessRestartButton.addEventListener('click', restartGame);
        chessUndoButton.addEventListener('click', undoMove);
        
        console.log('Chess DOM elements initialized');
    }
    
    /**
     * Initializes/resets the game state and board
     * Called at the start and when the game is restarted
     */
    function initChessGame() {
        if (!chessGrid) {
            console.error('Cannot initialize chess game - grid element not found');
            return;
        }
        
        // Reset game state to starting conditions
        currentPlayer = WHITE;
        gameActive = true;
        selectedPiece = null;
        moveHistory = [];
        board = createInitialBoard();
        kingPositions = {
            [WHITE]: { row: 0, col: 4 },
            [BLACK]: { row: 7, col: 4 }
        };
        capturedPieces = {
            [WHITE]: [],
            [BLACK]: []
        };
        
        // Create visual board
        createChessBoard();
        
        // Update status display
        updateGameStatus();
        
        // Clear captured pieces display
        updateCapturedPiecesDisplay();
        
        console.log('Chess game initialized');
    }
    
    /**
     * Creates the initial board state with all pieces in starting positions
     * @returns {Array} 2D array with initial piece positions
     */
    function createInitialBoard() {
        // Create an 8x8 empty board
        const board = Array(ROWS).fill().map(() => Array(COLUMNS).fill(EMPTY));
        
        // Set up pawns in their starting rows (row 1 for white, row 6 for black)
        for (let col = 0; col < COLUMNS; col++) {
            board[1][col] = { type: PAWN, color: WHITE };
            board[6][col] = { type: PAWN, color: BLACK };
        }
        
        // Set up white pieces in the bottom row (row 0)
        board[0][0] = { type: ROOK, color: WHITE };
        board[0][1] = { type: KNIGHT, color: WHITE };
        board[0][2] = { type: BISHOP, color: WHITE };
        board[0][3] = { type: QUEEN, color: WHITE };
        board[0][4] = { type: KING, color: WHITE };
        board[0][5] = { type: BISHOP, color: WHITE };
        board[0][6] = { type: KNIGHT, color: WHITE };
        board[0][7] = { type: ROOK, color: WHITE };
        
        // Set up black pieces in the top row (row 7)
        board[7][0] = { type: ROOK, color: BLACK };
        board[7][1] = { type: KNIGHT, color: BLACK };
        board[7][2] = { type: BISHOP, color: BLACK };
        board[7][3] = { type: QUEEN, color: BLACK };
        board[7][4] = { type: KING, color: BLACK };
        board[7][5] = { type: BISHOP, color: BLACK };
        board[7][6] = { type: KNIGHT, color: BLACK };
        board[7][7] = { type: ROOK, color: BLACK };
        
        return board;
    }
    
    /**
     * Creates the visual chess board in the DOM
     * Generates 64 square elements with appropriate coloring
     * and places pieces according to the board data structure
     */
    function createChessBoard() {
        // Clear the grid of any existing elements
        chessGrid.innerHTML = '';
        
        // Create squares for the chess board
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const square = document.createElement('div');
                square.classList.add('chess-square');
                
                // Add white or black square class in a checkerboard pattern
                if ((row + col) % 2 === 0) {
                    square.classList.add('chess-square-white');
                } else {
                    square.classList.add('chess-square-black');
                }
                
                // Store the square's position as data attributes
                square.dataset.row = row;
                square.dataset.col = col;
                
                // Add click event listener for player interaction
                square.addEventListener('click', handleSquareClick);
                
                // Add piece if there is one at this position
                if (board[row][col] !== EMPTY) {
                    const piece = document.createElement('div');
                    piece.classList.add('chess-piece', board[row][col].type, board[row][col].color);
                    square.appendChild(piece);
                }
                
                chessGrid.appendChild(square);
            }
        }
    }
    
    /**
     * Handles click events on board squares
     * Manages piece selection and movement
     * @param {Event} e - Click event
     */
    function handleSquareClick(e) {
        if (!gameActive) return; // Ignore clicks if game is over
        
        const square = e.currentTarget;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        
        // If a piece is already selected, try to move it
        if (selectedPiece) {
            // Check if this is a valid move for the selected piece
            if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
                // Make the move
                makeMove(selectedPiece.row, selectedPiece.col, row, col);
                
                // Deselect the piece
                clearHighlights();
                selectedPiece = null;
                
                // Check for checkmate or stalemate conditions
                if (isInCheck(getOpponentColor())) {
                    if (isCheckmate()) {
                        // Game over - current player won
                        gameActive = false;
                        updateGameStatus(true);
                    } else {
                        // Opponent is in check but not checkmate
                        highlightCheck();
                        updateGameStatus(false, false, true);
                    }
                } else if (isStalemate()) {
                    // Game over - stalemate
                    gameActive = false;
                    updateGameStatus(false, true);
                } else {
                    // Normal move - switch player
                    currentPlayer = getOpponentColor();
                    updateGameStatus();
                }
            } else if (board[row][col] !== EMPTY && board[row][col].color === currentPlayer) {
                // If clicked on own piece, select that piece instead
                clearHighlights();
                selectPiece(row, col);
            } else {
                // Invalid move, deselect
                clearHighlights();
                selectedPiece = null;
            }
        } else if (board[row][col] !== EMPTY && board[row][col].color === currentPlayer) {
            // Select the piece if it belongs to the current player
            selectPiece(row, col);
        }
    }
    
    /**
     * Selects a piece and shows its possible moves
     * @param {number} row - Row position of selected piece
     * @param {number} col - Column position of selected piece
     */
    function selectPiece(row, col) {
        selectedPiece = { row, col };
        
        // Highlight the selected piece
        const square = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);
        square.classList.add('highlight');
        
        // Show possible moves with visual indicators
        const possibleMoves = getValidMovesForPiece(row, col);
        possibleMoves.forEach(move => {
            const moveSquare = document.querySelector(`.chess-square[data-row="${move.row}"][data-col="${move.col}"]`);
            moveSquare.classList.add('move-highlight');
        });
    }
    
    /**
     * Clears all visual highlights from the board
     */
    function clearHighlights() {
        document.querySelectorAll('.chess-square').forEach(square => {
            square.classList.remove('highlight', 'move-highlight', 'check-highlight');
        });
    }
    
    /**
     * Highlights the opponent's king when in check
     */
    function highlightCheck() {
        const king = kingPositions[getOpponentColor()];
        const kingSquare = document.querySelector(`.chess-square[data-row="${king.row}"][data-col="${king.col}"]`);
        kingSquare.classList.add('check-highlight');
    }
    
    /**
     * Executes a move on the board
     * Updates the board data structure and visual representation
     * @param {number} fromRow - Starting row
     * @param {number} fromCol - Starting column
     * @param {number} toRow - Target row
     * @param {number} toCol - Target column
     */
    function makeMove(fromRow, fromCol, toRow, toCol) {
        const movingPiece = board[fromRow][fromCol];
        const capturedPiece = board[toRow][toCol];
        
        // Store the move for undo functionality
        moveHistory.push({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: { ...movingPiece },
            captured: capturedPiece !== EMPTY ? { ...capturedPiece } : null,
            kingMove: movingPiece.type === KING,
            check: false
        });
        
        // Handle captured piece if there is one
        if (capturedPiece !== EMPTY) {
            capturedPieces[capturedPiece.color].push(capturedPiece);
            updateCapturedPiecesDisplay();
        }
        
        // Move the piece on the board data
        board[toRow][toCol] = movingPiece;
        board[fromRow][fromCol] = EMPTY;
        
        // Update king position tracking if the king was moved
        if (movingPiece.type === KING) {
            kingPositions[movingPiece.color] = { row: toRow, col: toCol };
        }
        
        // Handle pawn promotion (queen for simplicity)
        if (movingPiece.type === PAWN && (toRow === 0 || toRow === 7)) {
            board[toRow][toCol] = { type: QUEEN, color: movingPiece.color };
        }
        
        // Update visual representation
        updateBoardVisual(fromRow, fromCol, toRow, toCol);
    }
    
    /**
     * Updates the visual board after a move
     * Adds animation to the moved piece
     * @param {number} fromRow - Starting row
     * @param {number} fromCol - Starting column
     * @param {number} toRow - Target row
     * @param {number} toCol - Target column
     */
    function updateBoardVisual(fromRow, fromCol, toRow, toCol) {
        // Get the source and target squares
        const fromSquare = document.querySelector(`.chess-square[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const toSquare = document.querySelector(`.chess-square[data-row="${toRow}"][data-col="${toCol}"]`);
        
        // Clear the target square
        toSquare.innerHTML = '';
        
        // Get the piece from the data model
        const piece = board[toRow][toCol];
        
        // Create new piece element with animation
        if (piece !== EMPTY) {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('chess-piece', piece.type, piece.color);
            pieceElement.classList.add('animate'); // Add animation class
            toSquare.appendChild(pieceElement);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                pieceElement.classList.remove('animate');
            }, 500);
        }
        
        // Clear the source square
        fromSquare.innerHTML = '';
    }
    
    /**
     * Updates the display of captured pieces
     * Shows pieces captured by each player
     */
    function updateCapturedPiecesDisplay() {
        // Clear displays
        chessCapturedWhite.innerHTML = '';
        chessCapturedBlack.innerHTML = '';
        
        // Add captured black pieces (captured by white)
        capturedPieces[BLACK].forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('chess-captured-piece', piece.type, piece.color);
            chessCapturedWhite.appendChild(pieceElement);
        });
        
        // Add captured white pieces (captured by black)
        capturedPieces[WHITE].forEach(piece => {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('chess-captured-piece', piece.type, piece.color);
            chessCapturedBlack.appendChild(pieceElement);
        });
    }
    
    /**
     * Checks if a move is valid according to chess rules
     * @param {number} fromRow - Starting row
     * @param {number} fromCol - Starting column
     * @param {number} toRow - Target row
     * @param {number} toCol - Target column
     * @returns {boolean} - True if the move is valid
     */
    function isValidMove(fromRow, fromCol, toRow, toCol) {
        const piece = board[fromRow][fromCol];
        
        // Can't move if no piece or wrong color
        if (piece === EMPTY || piece.color !== currentPlayer) {
            return false;
        }
        
        // Can't capture own piece
        if (board[toRow][toCol] !== EMPTY && board[toRow][toCol].color === currentPlayer) {
            return false;
        }
        
        // Get all valid moves for this piece
        const validMoves = getValidMovesForPiece(fromRow, fromCol);
        
        // Check if the target position is in valid moves
        return validMoves.some(move => move.row === toRow && move.col === toCol);
    }
    
    /**
     * Gets all valid moves for a specific piece
     * Filters out moves that would leave the king in check
     * @param {number} row - Row position of the piece
     * @param {number} col - Column position of the piece
     * @returns {Array} - Array of valid move positions
     */
    function getValidMovesForPiece(row, col) {
        const piece = board[row][col];
        let moves = [];
        
        if (piece === EMPTY) return moves;
        
        // Get potential moves based on piece type
        switch (piece.type) {
            case PAWN:
                moves = getPawnMoves(row, col, piece.color);
                break;
            case ROOK:
                moves = getRookMoves(row, col);
                break;
            case KNIGHT:
                moves = getKnightMoves(row, col);
                break;
            case BISHOP:
                moves = getBishopMoves(row, col);
                break;
            case QUEEN:
                moves = getQueenMoves(row, col);
                break;
            case KING:
                moves = getKingMoves(row, col);
                break;
        }
        
        // Filter out moves that would leave the king in check
        return moves.filter(move => !wouldBeInCheckAfterMove(row, col, move.row, move.col));
    }
    
    /**
     * Gets valid moves for a pawn
     * Includes forward movement, initial double move, and diagonal captures
     * @param {number} row - Row position of the pawn
     * @param {number} col - Column position of the pawn
     * @param {string} color - Color of the pawn (WHITE or BLACK)
     * @returns {Array} - Array of valid move positions
     */
    function getPawnMoves(row, col, color) {
        const moves = [];
        const direction = color === WHITE ? 1 : -1; // White pawns move up, black pawns move down
        const startRow = color === WHITE ? 1 : 6;   // Starting rows for pawns
        
        // Move forward one square
        if (isInBounds(row + direction, col) && board[row + direction][col] === EMPTY) {
            moves.push({ row: row + direction, col });
            
            // Move forward two squares from starting position
            if (row === startRow && board[row + 2 * direction][col] === EMPTY) {
                moves.push({ row: row + 2 * direction, col });
            }
        }
        
        // Capture diagonally
        [col - 1, col + 1].forEach(captureCol => {
            if (isInBounds(row + direction, captureCol) && 
                board[row + direction][captureCol] !== EMPTY && 
                board[row + direction][captureCol].color !== color) {
                moves.push({ row: row + direction, col: captureCol });
            }
        });
        
        return moves;
    }
    
    /**
     * Gets valid moves for a rook
     * Horizontal and vertical movement
     * @param {number} row - Row position of the rook
     * @param {number} col - Column position of the rook
     * @returns {Array} - Array of valid move positions
     */
    function getRookMoves(row, col) {
        const directions = [
            { row: 1, col: 0 },  // down
            { row: -1, col: 0 }, // up
            { row: 0, col: 1 },  // right
            { row: 0, col: -1 }  // left
        ];
        
        return getLinearMoves(row, col, directions);
    }
    
    /**
     * Gets valid moves for a knight
     * L-shaped movement: 2 squares in one direction, 1 square perpendicular
     * @param {number} row - Row position of the knight
     * @param {number} col - Column position of the knight
     * @returns {Array} - Array of valid move positions
     */
    function getKnightMoves(row, col) {
        const moves = [];
        const possibleMoves = [
            { row: row + 2, col: col + 1 },
            { row: row + 2, col: col - 1 },
            { row: row - 2, col: col + 1 },
            { row: row - 2, col: col - 1 },
            { row: row + 1, col: col + 2 },
            { row: row + 1, col: col - 2 },
            { row: row - 1, col: col + 2 },
            { row: row - 1, col: col - 2 }
        ];
        
        possibleMoves.forEach(move => {
            if (isInBounds(move.row, move.col) && (board[move.row][move.col] === EMPTY || 
                board[move.row][move.col].color !== board[row][col].color)) {
                moves.push(move);
            }
        });
        
        return moves;
    }
    
    /**
     * Gets valid moves for a bishop
     * Diagonal movement
     * @param {number} row - Row position of the bishop
     * @param {number} col - Column position of the bishop
     * @returns {Array} - Array of valid move positions
     */
    function getBishopMoves(row, col) {
        const directions = [
            { row: 1, col: 1 },   // down-right
            { row: 1, col: -1 },  // down-left
            { row: -1, col: 1 },  // up-right
            { row: -1, col: -1 }  // up-left
        ];
        
        return getLinearMoves(row, col, directions);
    }
    
    /**
     * Gets valid moves for a queen
     * Combines rook and bishop movement (horizontal, vertical, and diagonal)
     * @param {number} row - Row position of the queen
     * @param {number} col - Column position of the queen
     * @returns {Array} - Array of valid move positions
     */
    function getQueenMoves(row, col) {
        // Queen combines rook and bishop moves
        return [...getRookMoves(row, col), ...getBishopMoves(row, col)];
    }
    
    /**
     * Gets valid moves for a king
     * One square in any direction
     * @param {number} row - Row position of the king
     * @param {number} col - Column position of the king
     * @returns {Array} - Array of valid move positions
     */
    function getKingMoves(row, col) {
        const moves = [];
        // Check all 8 squares around the king
        for (let r = -1; r <= 1; r++) {
            for (let c = -1; c <= 1; c++) {
                if (r === 0 && c === 0) continue; // Skip current position
                
                const newRow = row + r;
                const newCol = col + c;
                
                if (isInBounds(newRow, newCol) && (board[newRow][newCol] === EMPTY || 
                    board[newRow][newCol].color !== board[row][col].color)) {
                    moves.push({ row: newRow, col: newCol });
                }
            }
        }
        return moves;
    }
    
    /**
     * Helper function for linear movement (rooks, bishops, queens)
     * @param {number} row - Starting row
     * @param {number} col - Starting column
     * @param {Array} directions - Array of direction vectors to check
     * @returns {Array} - Array of valid move positions
     */
    function getLinearMoves(row, col, directions) {
        const moves = [];
        const piece = board[row][col];
        
        directions.forEach(direction => {
            let newRow = row + direction.row;
            let newCol = col + direction.col;
            
            // Continue in the direction until an obstacle or board edge
            while (isInBounds(newRow, newCol)) {
                if (board[newRow][newCol] === EMPTY) {
                    // Empty square, can move here
                    moves.push({ row: newRow, col: newCol });
                } else if (board[newRow][newCol].color !== piece.color) {
                    // Opponent's piece, can capture and stop
                    moves.push({ row: newRow, col: newCol });
                    break;
                } else {
                    // Own piece, stop
                    break;
                }
                
                // Continue in the direction
                newRow += direction.row;
                newCol += direction.col;
            }
        });
        
        return moves;
    }
    
    /**
     * Checks if a position is within the board boundaries
     * @param {number} row - Row to check
     * @param {number} col - Column to check
     * @returns {boolean} - True if position is on the board
     */
    function isInBounds(row, col) {
        return row >= 0 && row < ROWS && col >= 0 && col < COLUMNS;
    }
    
    /**
     * Checks if a move would leave the player's king in check
     * Makes a temporary move, checks for check, then restores the board
     * @param {number} fromRow - Starting row
     * @param {number} fromCol - Starting column
     * @param {number} toRow - Target row
     * @param {number} toCol - Target column
     * @returns {boolean} - True if the move would result in check
     */
    function wouldBeInCheckAfterMove(fromRow, fromCol, toRow, toCol) {
        // Make temporary move by deep copying the board and king positions
        const originalBoard = JSON.parse(JSON.stringify(board));
        const originalKingPositions = JSON.parse(JSON.stringify(kingPositions));
        
        const piece = board[fromRow][fromCol];
        board[toRow][toCol] = piece;
        board[fromRow][fromCol] = EMPTY;
        
        // Update king position if king is moved
        if (piece.type === KING) {
            kingPositions[piece.color] = { row: toRow, col: toCol };
        }
        
        // Check if the player would be in check
        const wouldBeInCheck = isInCheck(currentPlayer);
        
        // Restore the board
        board = originalBoard;
        kingPositions = originalKingPositions;
        
        return wouldBeInCheck;
    }
    
    /**
     * Determines if a player is in check
     * @param {string} playerColor - Color of player to check (WHITE or BLACK)
     * @returns {boolean} - True if the player is in check
     */
    function isInCheck(playerColor) {
        const kingPos = kingPositions[playerColor];
        const opponentColor = playerColor === WHITE ? BLACK : WHITE;
        
        // Check all opponent's pieces to see if any can attack the king
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const piece = board[row][col];
                if (piece !== EMPTY && piece.color === opponentColor) {
                    // Get raw moves without check validation (to avoid recursion)
                    let moves = [];
                    switch (piece.type) {
                        case PAWN:
                            moves = getPawnMoves(row, col, piece.color);
                            break;
                        case ROOK:
                            moves = getRookMoves(row, col);
                            break;
                        case KNIGHT:
                            moves = getKnightMoves(row, col);
                            break;
                        case BISHOP:
                            moves = getBishopMoves(row, col);
                            break;
                        case QUEEN:
                            moves = getQueenMoves(row, col);
                            break;
                        case KING:
                            moves = getKingMoves(row, col);
                            break;
                    }
                    
                    // If any move can capture the king, the player is in check
                    if (moves.some(move => move.row === kingPos.row && move.col === kingPos.col)) {
                        return true;
                    }
                }
            }
        }
        
        return false;
    }
    
    /**
     * Determines if a player is in checkmate
     * Checkmate = in check and no legal moves
     * @returns {boolean} - True if opponent is in checkmate
     */
    function isCheckmate() {
        // If not in check, can't be checkmate
        if (!isInCheck(getOpponentColor())) return false;
        
        // Check if any move by the opponent can get out of check
        return !hasLegalMoves(getOpponentColor());
    }
    
    /**
     * Determines if a player is in stalemate
     * Stalemate = not in check but no legal moves
     * @returns {boolean} - True if opponent is in stalemate
     */
    function isStalemate() {
        // If in check, not stalemate
        if (isInCheck(getOpponentColor())) return false;
        
        // If no legal moves, it's stalemate
        return !hasLegalMoves(getOpponentColor());
    }
    
    /**
     * Checks if a player has any legal moves
     * @param {string} playerColor - Color of player to check
     * @returns {boolean} - True if the player has at least one legal move
     */
    function hasLegalMoves(playerColor) {
        // Check all pieces of the player
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const piece = board[row][col];
                if (piece !== EMPTY && piece.color === playerColor) {
                    // If any piece has a valid move, return true
                    const moves = getValidMovesForPiece(row, col);
                    if (moves.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    /**
     * Updates the game status display
     * Shows current player, check status, win, or draw
     * @param {boolean} isWin - Is this update for a win?
     * @param {boolean} isDraw - Is this update for a draw?
     * @param {boolean} isCheck - Is this update for a check?
     */
    function updateGameStatus(isWin = false, isDraw = false, isCheck = false) {
        if (!chessCurrentPlayer || !chessGameStatus) {
            console.error('Cannot update game status - elements not found');
            return;
        }
        
        // Update player indicator
        chessCurrentPlayer.textContent = currentPlayer === WHITE ? 'White' : 'Black';
        chessCurrentPlayer.className = currentPlayer === WHITE ? 'chess-white' : 'chess-black';
        
        // Update status message based on game state
        if (isWin) {
            chessGameStatus.innerHTML = `<div class="player-turn">Player <span class="${currentPlayer === WHITE ? 'chess-white' : 'chess-black'}">${currentPlayer === WHITE ? 'White' : 'Black'}</span> wins!</div>`;
        } else if (isDraw) {
            chessGameStatus.innerHTML = `<div class="player-turn">Game ended in a stalemate!</div>`;
        } else if (isCheck) {
            // Show "in check" message then revert to normal status after delay
            chessGameStatus.innerHTML = `<div class="player-turn">Player <span class="${getOpponentColor() === WHITE ? 'chess-white' : 'chess-black'}">${getOpponentColor() === WHITE ? 'White' : 'Black'}</span> is in check!</div>`;
            setTimeout(() => {
                if (gameActive) {
                    chessGameStatus.innerHTML = `<div class="player-turn">Player <span id="chess-current-player" class="${currentPlayer === WHITE ? 'chess-white' : 'chess-black'}">${currentPlayer === WHITE ? 'White' : 'Black'}</span>'s turn</div>`;
                    chessCurrentPlayer = document.getElementById('chess-current-player');
                }
            }, 2000);
        } else {
            // Normal turn indicator
            chessGameStatus.innerHTML = `<div class="player-turn">Player <span id="chess-current-player" class="${currentPlayer === WHITE ? 'chess-white' : 'chess-black'}">${currentPlayer === WHITE ? 'White' : 'Black'}</span>'s turn</div>`;
            chessCurrentPlayer = document.getElementById('chess-current-player');
        }
    }
    
    /**
     * Restarts the chess game
     * Resets board, pieces, and game state
     */
    function restartGame() {
        clearHighlights();
        
        // Add animation effect
        const gameBoard = document.querySelector('.chess-board');
        gameBoard.style.animation = 'pop 0.5s ease';
        
        // Wait for animation to finish before resetting
        setTimeout(() => {
            gameBoard.style.animation = '';
            initChessGame();
        }, 500);
    }
    
    /**
     * Undoes the last move
     * Restores the board to its previous state
     */
    function undoMove() {
        if (moveHistory.length === 0 || !gameActive) return;
        
        const lastMove = moveHistory.pop();
        
        // Restore the board state
        board[lastMove.from.row][lastMove.from.col] = lastMove.piece;
        board[lastMove.to.row][lastMove.to.col] = lastMove.captured || EMPTY;
        
        // Update king position if king was moved
        if (lastMove.kingMove) {
            kingPositions[lastMove.piece.color] = { row: lastMove.from.row, col: lastMove.from.col };
        }
        
        // Remove from captured pieces if a piece was captured
        if (lastMove.captured) {
            const index = capturedPieces[lastMove.captured.color].findIndex(
                p => p.type === lastMove.captured.type
            );
            if (index !== -1) {
                capturedPieces[lastMove.captured.color].splice(index, 1);
                updateCapturedPiecesDisplay();
            }
        }
        
        // Update visual board
        createChessBoard();
        
        // Switch back to previous player
        currentPlayer = getOpponentColor();
        
        // Update status
        clearHighlights();
        updateGameStatus();
    }
    
    /**
     * Helper function to get the opponent's color
     * @returns {string} - Opponent's color (WHITE or BLACK)
     */
    function getOpponentColor() {
        return currentPlayer === WHITE ? BLACK : WHITE;
    }
}); 