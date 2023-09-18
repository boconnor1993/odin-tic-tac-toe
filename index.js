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
    }
    return {getBoard, updateBoard, resetBoard};
  })();

// Create player object using factory
const Player = (name, symbol) => {
    return {name, symbol};
}

// Create game controller using module pattern
const gameController = (() => {
    let turn;
    let gameWon;

    function checkWin(playerSymbol) {
        const board = gameboard.getBoard()
        // Check row win
        for (let row = 0; row < board.length; row++) {
            const rowWin = board[row].every(cell => cell === playerSymbol);
            if (rowWin === true) {
                gameWon = true;
                let playerWon = playerSymbol;
                return {gameWon, playerWon}
            }
        }
    }
  
    function restartGame(gameWon) {
        if (gameWon === true) {
            gameboard.resetBoard();
            turn = null;
            gameWon = null;
        }
    }

    return {turn, checkWin, restartGame}
  })();

// Create playerOne

// Create playerTwo

//