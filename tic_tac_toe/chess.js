// Chess Game Logic
document.addEventListener('DOMContentLoaded', () => {
    // Board configuration
    const ROWS = 8;
    const COLUMNS = 8;
    const WHITE = 'white';
    const BLACK = 'black';
    
    // Chess pieces configuration
    const PAWN = 'pawn';
    const ROOK = 'rook';
    const KNIGHT = 'knight';
    const BISHOP = 'bishop';
    const QUEEN = 'queen';
    const KING = 'king';
    const EMPTY = 'empty';
    
    // Game state
    let currentPlayer = WHITE;
    let gameActive = true;
    let selectedPiece = null;
    let moveHistory = [];
    let board = createInitialBoard();
    let kingPositions = {
        [WHITE]: { row: 0, col: 4 },
        [BLACK]: { row: 7, col: 4 }
    };
    let capturedPieces = {
        [WHITE]: [],
        [BLACK]: []
    };
    
    // DOM Elements
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
    
    function initializeDOM() {
        chessGrid = document.getElementById('chess-grid');
        chessCurrentPlayer = document.getElementById('chess-current-player');
        chessRestartButton = document.getElementById('chess-restart-btn');
        chessUndoButton = document.getElementById('chess-undo-btn');
        chessGameStatus = document.querySelector('.chess-container .game-status');
        chessCapturedWhite = document.querySelector('.chess-captured-white');
        chessCapturedBlack = document.querySelector('.chess-captured-black');
        
        if (!chessGrid || !chessCurrentPlayer || !chessRestartButton || !chessUndoButton) {
            console.error('Chess DOM elements not found');
            return;
        }
        
        // Add event listeners
        chessRestartButton.addEventListener('click', restartGame);
        chessUndoButton.addEventListener('click', undoMove);
        
        console.log('Chess DOM elements initialized');
    }
    
    function initChessGame() {
        if (!chessGrid) {
            console.error('Cannot initialize chess game - grid element not found');
            return;
        }
        
        // Reset game state
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
    
    function createInitialBoard() {
        // Create an 8x8 empty board
        const board = Array(ROWS).fill().map(() => Array(COLUMNS).fill(EMPTY));
        
        // Set up pawns
        for (let col = 0; col < COLUMNS; col++) {
            board[1][col] = { type: PAWN, color: WHITE };
            board[6][col] = { type: PAWN, color: BLACK };
        }
        
        // Set up white pieces
        board[0][0] = { type: ROOK, color: WHITE };
        board[0][1] = { type: KNIGHT, color: WHITE };
        board[0][2] = { type: BISHOP, color: WHITE };
        board[0][3] = { type: QUEEN, color: WHITE };
        board[0][4] = { type: KING, color: WHITE };
        board[0][5] = { type: BISHOP, color: WHITE };
        board[0][6] = { type: KNIGHT, color: WHITE };
        board[0][7] = { type: ROOK, color: WHITE };
        
        // Set up black pieces
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
    
    function createChessBoard() {
        // Clear the grid
        chessGrid.innerHTML = '';
        
        // Create squares for the chess board
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const square = document.createElement('div');
                square.classList.add('chess-square');
                
                // Add white or black square class
                if ((row + col) % 2 === 0) {
                    square.classList.add('chess-square-white');
                } else {
                    square.classList.add('chess-square-black');
                }
                
                square.dataset.row = row;
                square.dataset.col = col;
                
                // Add event listener
                square.addEventListener('click', handleSquareClick);
                
                // Add piece if there is one
                if (board[row][col] !== EMPTY) {
                    const piece = document.createElement('div');
                    piece.classList.add('chess-piece', board[row][col].type, board[row][col].color);
                    square.appendChild(piece);
                }
                
                chessGrid.appendChild(square);
            }
        }
    }
    
    function handleSquareClick(e) {
        if (!gameActive) return;
        
        const square = e.currentTarget;
        const row = parseInt(square.dataset.row);
        const col = parseInt(square.dataset.col);
        
        // If a piece is already selected
        if (selectedPiece) {
            // Check if this is a valid move
            if (isValidMove(selectedPiece.row, selectedPiece.col, row, col)) {
                // Make the move
                makeMove(selectedPiece.row, selectedPiece.col, row, col);
                
                // Deselect the piece
                clearHighlights();
                selectedPiece = null;
                
                // Check for checkmate or stalemate
                if (isInCheck(getOpponentColor())) {
                    if (isCheckmate()) {
                        gameActive = false;
                        updateGameStatus(true);
                    } else {
                        // Just show check
                        highlightCheck();
                        updateGameStatus(false, false, true);
                    }
                } else if (isStalemate()) {
                    gameActive = false;
                    updateGameStatus(false, true);
                } else {
                    // Switch player
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
            // Select the piece
            selectPiece(row, col);
        }
    }
    
    function selectPiece(row, col) {
        selectedPiece = { row, col };
        
        // Highlight the selected piece
        const square = document.querySelector(`.chess-square[data-row="${row}"][data-col="${col}"]`);
        square.classList.add('highlight');
        
        // Show possible moves
        const possibleMoves = getValidMovesForPiece(row, col);
        possibleMoves.forEach(move => {
            const moveSquare = document.querySelector(`.chess-square[data-row="${move.row}"][data-col="${move.col}"]`);
            moveSquare.classList.add('move-highlight');
        });
    }
    
    function clearHighlights() {
        document.querySelectorAll('.chess-square').forEach(square => {
            square.classList.remove('highlight', 'move-highlight', 'check-highlight');
        });
    }
    
    function highlightCheck() {
        const king = kingPositions[getOpponentColor()];
        const kingSquare = document.querySelector(`.chess-square[data-row="${king.row}"][data-col="${king.col}"]`);
        kingSquare.classList.add('check-highlight');
    }
    
    function makeMove(fromRow, fromCol, toRow, toCol) {
        const movingPiece = board[fromRow][fromCol];
        const capturedPiece = board[toRow][toCol];
        
        // Store the move for undo
        moveHistory.push({
            from: { row: fromRow, col: fromCol },
            to: { row: toRow, col: toCol },
            piece: { ...movingPiece },
            captured: capturedPiece !== EMPTY ? { ...capturedPiece } : null,
            kingMove: movingPiece.type === KING,
            check: false
        });
        
        // Capture piece if there is one
        if (capturedPiece !== EMPTY) {
            capturedPieces[capturedPiece.color].push(capturedPiece);
            updateCapturedPiecesDisplay();
        }
        
        // Move the piece on the board data
        board[toRow][toCol] = movingPiece;
        board[fromRow][fromCol] = EMPTY;
        
        // Update king position if king was moved
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
    
    function updateBoardVisual(fromRow, fromCol, toRow, toCol) {
        // Get the squares
        const fromSquare = document.querySelector(`.chess-square[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const toSquare = document.querySelector(`.chess-square[data-row="${toRow}"][data-col="${toCol}"]`);
        
        // Clear the target square
        toSquare.innerHTML = '';
        
        // Get the piece from the data model
        const piece = board[toRow][toCol];
        
        // Create new piece element
        if (piece !== EMPTY) {
            const pieceElement = document.createElement('div');
            pieceElement.classList.add('chess-piece', piece.type, piece.color);
            pieceElement.classList.add('animate');
            toSquare.appendChild(pieceElement);
            
            // Remove animation class after animation completes
            setTimeout(() => {
                pieceElement.classList.remove('animate');
            }, 500);
        }
        
        // Clear the source square
        fromSquare.innerHTML = '';
    }
    
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
    
    function getPawnMoves(row, col, color) {
        const moves = [];
        const direction = color === WHITE ? 1 : -1;
        const startRow = color === WHITE ? 1 : 6;
        
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
    
    function getRookMoves(row, col) {
        const moves = [];
        const directions = [
            { row: 1, col: 0 },  // down
            { row: -1, col: 0 }, // up
            { row: 0, col: 1 },  // right
            { row: 0, col: -1 }  // left
        ];
        
        return getLinearMoves(row, col, directions);
    }
    
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
    
    function getBishopMoves(row, col) {
        const moves = [];
        const directions = [
            { row: 1, col: 1 },   // down-right
            { row: 1, col: -1 },  // down-left
            { row: -1, col: 1 },  // up-right
            { row: -1, col: -1 }  // up-left
        ];
        
        return getLinearMoves(row, col, directions);
    }
    
    function getQueenMoves(row, col) {
        // Queen combines rook and bishop moves
        return [...getRookMoves(row, col), ...getBishopMoves(row, col)];
    }
    
    function getKingMoves(row, col) {
        const moves = [];
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
    
    function getLinearMoves(row, col, directions) {
        const moves = [];
        const piece = board[row][col];
        
        directions.forEach(direction => {
            let newRow = row + direction.row;
            let newCol = col + direction.col;
            
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
    
    function isInBounds(row, col) {
        return row >= 0 && row < ROWS && col >= 0 && col < COLUMNS;
    }
    
    function wouldBeInCheckAfterMove(fromRow, fromCol, toRow, toCol) {
        // Make temporary move
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
    
    function isInCheck(playerColor) {
        const kingPos = kingPositions[playerColor];
        const opponentColor = playerColor === WHITE ? BLACK : WHITE;
        
        // Check all opponent's pieces
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
    
    function isCheckmate() {
        // If not in check, can't be checkmate
        if (!isInCheck(getOpponentColor())) return false;
        
        // Check if any move by the opponent can get out of check
        return !hasLegalMoves(getOpponentColor());
    }
    
    function isStalemate() {
        // If in check, not stalemate
        if (isInCheck(getOpponentColor())) return false;
        
        // If no legal moves, it's stalemate
        return !hasLegalMoves(getOpponentColor());
    }
    
    function hasLegalMoves(playerColor) {
        for (let row = 0; row < ROWS; row++) {
            for (let col = 0; col < COLUMNS; col++) {
                const piece = board[row][col];
                if (piece !== EMPTY && piece.color === playerColor) {
                    const moves = getValidMovesForPiece(row, col);
                    if (moves.length > 0) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
    
    function updateGameStatus(isWin = false, isDraw = false, isCheck = false) {
        if (!chessCurrentPlayer || !chessGameStatus) {
            console.error('Cannot update game status - elements not found');
            return;
        }
        
        chessCurrentPlayer.textContent = currentPlayer === WHITE ? 'White' : 'Black';
        chessCurrentPlayer.className = currentPlayer === WHITE ? 'chess-white' : 'chess-black';
        
        if (isWin) {
            chessGameStatus.innerHTML = `<div class="player-turn">Player <span class="${currentPlayer === WHITE ? 'chess-white' : 'chess-black'}">${currentPlayer === WHITE ? 'White' : 'Black'}</span> wins!</div>`;
        } else if (isDraw) {
            chessGameStatus.innerHTML = `<div class="player-turn">Game ended in a stalemate!</div>`;
        } else if (isCheck) {
            chessGameStatus.innerHTML = `<div class="player-turn">Player <span class="${getOpponentColor() === WHITE ? 'chess-white' : 'chess-black'}">${getOpponentColor() === WHITE ? 'White' : 'Black'}</span> is in check!</div>`;
            setTimeout(() => {
                if (gameActive) {
                    chessGameStatus.innerHTML = `<div class="player-turn">Player <span id="chess-current-player" class="${currentPlayer === WHITE ? 'chess-white' : 'chess-black'}">${currentPlayer === WHITE ? 'White' : 'Black'}</span>'s turn</div>`;
                    chessCurrentPlayer = document.getElementById('chess-current-player');
                }
            }, 2000);
        } else {
            chessGameStatus.innerHTML = `<div class="player-turn">Player <span id="chess-current-player" class="${currentPlayer === WHITE ? 'chess-white' : 'chess-black'}">${currentPlayer === WHITE ? 'White' : 'Black'}</span>'s turn</div>`;
            chessCurrentPlayer = document.getElementById('chess-current-player');
        }
    }
    
    function restartGame() {
        clearHighlights();
        
        // Add animation effect
        const gameBoard = document.querySelector('.chess-board');
        gameBoard.style.animation = 'pop 0.5s ease';
        
        setTimeout(() => {
            gameBoard.style.animation = '';
            initChessGame();
        }, 500);
    }
    
    function undoMove() {
        if (moveHistory.length === 0 || !gameActive) return;
        
        const lastMove = moveHistory.pop();
        
        // Restore the board
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
    
    function getOpponentColor() {
        return currentPlayer === WHITE ? BLACK : WHITE;
    }
}); 