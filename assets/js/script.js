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
    }

    return {createBoard, getBoard, placeMarker};
})();


const PlayerModule = (function() {

    const createPlayer = (name, marker) => {
        return {name, marker};
    };

    return {createPlayer};
})();


// Test output code
GameBoard.createBoard();
console.log(GameBoard.getBoard());

const player1 = PlayerModule.createPlayer("Player 1", "X");
const player2 = PlayerModule.createPlayer("Player 2", "O");

console.log(player1);
console.log(player2);

GameBoard.placeMarker(0, 0, player1.marker);
GameBoard.placeMarker(1, 1, player2.marker);
console.log(GameBoard.getBoard());
