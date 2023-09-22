// Create gameboard object using module pattern
const gameboard = (() => {
    let board = [['','',''],['','',''],['','','']];
    const getBoard = () => board;

    function updateBoard(row, column, playerSymbol) {
        if (board[row][column] === '') {
            board[row][column] = playerSymbol;
        }
    };

    function resetBoard() {
        board = [['','',''],['','',''],['','','']];
    };

    return {getBoard, updateBoard, resetBoard};
  })();

// Create player object using factory
const Player = (name, symbol) => {
    return {name, symbol};
}

// Create game controller using module pattern
const gameController = (() => {
    let turn = 'X';
    let gameWon = false;
    let gameOver = false;

    function checkWin(playerSymbol) {
        const board = gameboard.getBoard();
    
        // Check rows and columns
        for (let i = 0; i < 3; i++) {
            if (board[i].every(cell => cell === playerSymbol) || 
                [board[0][i], board[1][i], board[2][i]].every(cell => cell === playerSymbol)) {
                return true;
            }
        }
    
        // Check diagonals
        if ([board[0][0], board[1][1], board[2][2]].every(cell => cell === playerSymbol) ||
            [board[0][2], board[1][1], board[2][0]].every(cell => cell === playerSymbol)) {
            return true;
        }
    
        return false;
    }
    
  
    function restartGame(gameWon) {
        if (gameWon === true) {
            gameboard.resetBoard();
            turn = null;
            gameWon = null;
        }
    }

    function isBoardFull() {
        const board = gameboard.getBoard();
        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                if (board[row][col] === '') {
                    return false;
                }
            }
        }
        return true;
    }

    return {turn, checkWin, restartGame, isBoardFull, gameOver};
  })();

// Create playerOne and playerTwo
const playerOne = Player('Player 1', 'X');
const playerTwo = Player('Player 2', 'O');

// Render board from array
function renderBoard() {
    const squares = document.querySelectorAll('.gameSquare');
    const board = gameboard.getBoard();

    let row;
    let column;

    for (let i = 0; i < squares.length; i++) {
        row = Math.floor(i / 3);
        column = i % 3;
        squares[i].textContent = board[row][column];
    }
}

// Define squares variable
const squares = document.querySelectorAll('.gameSquare');
const winnerMessage = document.getElementById('winnerMessage');
const winnerText = document.getElementById('winnerText');
const closeButton = document.getElementById('closeButton');

// Add event listener
squares.forEach((square, i) => {
    square.addEventListener('click', function() {
        // Check if game is already over
        if (gameController.gameOver === true) {
            return;
        }

        // Get the clicked row and column, then update the board and render
        row = Math.floor(i / 3);
        column = i % 3;

        // Get board and check if square is already taken
        const board = gameboard.getBoard();

        if (board[row][column] !== '') {
            alert('Square already taken. Choose a blank square!');
            return;
        }

        let currentPlayer = gameController.turn;
        gameboard.updateBoard(row, column, currentPlayer);
        gameController.turn = (gameController.turn === 'X') ? 'O' : 'X';
        renderBoard();

        // Check if the game has now been won
        if (gameController.checkWin(currentPlayer)) {
            gameController.gameOver = true;
            winnerText.textContent = `${currentPlayer} wins!`;
            winnerMessage.classList.remove('hidden');
        } else if (gameController.isBoardFull()) {
            winnerText.textContent = 'Game tied';
            winnerMessage.classList.remove('hidden');
        }
    })
});

// Close the winner message
closeButton.addEventListener('click', function() {
    winnerMessage.classList.add('hidden');
});

// Reset button logic
const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', function() {
    gameboard.resetBoard();
    gameController.gameOver = false;
    gameController.turn = 'X';
    renderBoard();
})