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
                board[i].push("--");
            }
        }
    };

    const getBoard = () => board;

    const placeMarker = function(row, col, marker) {
        if (board[row][col] === "--") {
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
       return board.every(row => row.every(cell => cell !="--"));
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
    const boardElement = document.querySelector("#board");
    const messageElement = document.querySelector("#message");

    const renderBoard = function() {
        boardElement.innerHTML = "";

        const board = GameBoard.getBoard();
        for (let row = 0; row < 3; row ++) {
            for (let col = 0; col < 3; col ++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = row;
                cell.dataset.col = col;
                cell.textContent = board[row][col];
                boardElement.appendChild(cell);
            }
        }
    };

    const showMessage = function(message) {
        messageElement.textContent = message;
    };

    const bindEvents = function() {
        boardElement.addEventListener("click", handleCellClick);
    };

    const handleCellClick = function(event) {
        const target = event.target;
        if (target.classList.contains("cell")) {
            const row = target.dataset.row;
            const col = target.dataset.col;
            GameController.playRound(row, col);
        }
    };

    return {renderBoard, showMessage, bindEvents};
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

    const playRound = function(row, col) {
        if (GameBoard.placeMarker(row, col, currentPlayer.marker)) {
            displayController.renderBoard();
            if (GameBoard.checkWin(currentPlayer.marker)) {
                displayController.showMessage(`${currentPlayer.name} wins!`);
                return;
            } else if (GameBoard.checkDraw()) {
                displayController.showMessage(`It's a draw!`);
                return;
            }
            switchPlayer();
            displayController.showMessage(`${currentPlayer.name}'s turn.`);
        } else {
            displayController.showMessage(`Grid already taken. ${currentPlayer.name}, try again.`);
        }
    };

    return {startGame, playRound};

})();


// Test output code
GameController.startGame();