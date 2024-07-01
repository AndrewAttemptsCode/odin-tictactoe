// store the gameboard as an array inside of a Gameboard object

// tuck as much as you can inside factories.
// single instance of something (e.g. the gameboard,
// the displayController etc.) then wrap the factory inside
// an IIFE (module pattern)

const GameBoard = (function() {
    const board = [];

    const createBoard = function() {
        const rows = 3;
        const columns = 3;
        
        for (let i = 0; i < rows; i++) {
            board[i] = [];
            for (let j = 0; j < columns; j++) {
                board[i].push("");
            }
        }
    };

    const getBoard = () => board;

    const placeMarker = function(row, col, marker) {
        if (board[row][col] === "") {
            board[row][col] = marker;
            return true;
        }
        return false;
    };

    const checkWin = function(marker) {
        for (let row = 0; row < 3; row++) {
            if (board[row].every(cell => cell === marker)) {
                return true;
            }
        }

        for (let col = 0; col < 3; col++) {
            if (board.every(row => row[col] === marker)) {
                return true;
            }
        }

        if (
            (board[0][0] === marker && board[1][1] === marker && board[2][2] === marker) ||
            (board[0][2] === marker && board[1][1] === marker && board[2][0] === marker) 
        ) {
            return true;
        }

    return false;

    };

    const checkDraw = function() {
       return board.every(row => row.every(cell => cell !=""));
    };

    return {createBoard, getBoard, placeMarker, checkWin, checkDraw};
})();


const PlayerModule = (function() {

    const createPlayer = (name, marker) => {
        return {name, marker};
    };

    return {createPlayer};
})();


const displayController = (function() {

    const renderBoard = function() {
        const board = GameBoard.getBoard();
        console.clear();
        for (let row = 0; row < 3; row++) {
            console.log(board[row].join("|"));
            if (row < 2) console.log("--+---+--");
        }
    };

    const showMessage = function(message) {
        console.log(message);
    };

    return {renderBoard, showMessage};
})();

const GameController = (function() {
    let currentPlayer;
    let player1;
    let player2;

    const startGame = function() {
        GameBoard.createBoard();
        player1 = PlayerModule.createPlayer("Player 1", "X");
        player2 = PlayerModule.createPlayer("Player 2", "O");
        currentPlayer = player1;
        displayController.renderBoard();
        displayController.showMessage(`${currentPlayer.name}'s turn.`)
    };

    const switchPlayer = function() {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

})();


// Test output code
GameBoard.createBoard();
console.log(GameBoard.getBoard());



console.log(player1);
console.log(player2);

// GameBoard.placeMarker(0, 0, player1.marker);
// GameBoard.placeMarker(0, 1, player1.marker);
// GameBoard.placeMarker(0, 2, player1.marker);
// GameBoard.placeMarker(1, 1, player2.marker);
// GameBoard.placeMarker(2, 0, player2.marker);
// console.log(GameBoard.getBoard());

const player1Wins = GameBoard.checkWin(player1.marker);
const player2Wins = GameBoard.checkWin(player2.marker);
const isDraw = GameBoard.checkDraw();
console.log(`Player 1 wins: ${player1Wins}`);
console.log(`Player 2 wins: ${player2Wins}`);
console.log(`It's a draw: ${isDraw}`);

// displayController.renderBoard();