/**
 * Tic Tac Toe game
 * Author: Vanessa
 * Date: 2025-07-19
 */

/**
 * @type {string[]} - The current game board state, 9 cells.
 */
const board = Array(9).fill("");
const comp = "O";
const player = "X";
let currentPlayer;
let disable = false;
let cellsClicked = 0;

/**
 * Updates the start/clear button text.
 * @returns {void}
 */
function updateButtonText() {
    const btn = document.getElementById('startClearbtn');
    btn.textContent = disable ? "Start" : "Clear";
}

/**
 * Updates the UI cells based on board state.
 * @returns {void}
 */
function updateCell() {
    board.forEach((val, i) => {
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = val;
    });
}

/**
 * Clears the board and resets state.
 * @returns {void}
 */
function clearCells() {
    board.forEach((_, i) => {
        board[i] = "";
        const cell = document.getElementById(`cell-${i}`);
        cell.textContent = "";
        cell.style.color = "black";
    });
    disable = true;
    currentPlayer = null;
    updateButtonText();
    cellsClicked = 0;
}

/**
 * Highlights the winning cells.
 * @param {number[]} combo - Array of winning cell indices.
 * @returns {void}
 */
function highlightWin(combo) {
    combo.forEach(i => {
        const cell = document.getElementById(`cell-${i}`);
        cell.style.color = "red";
    });
}

/**
 * Checks if the specified player has a winning combination.
 * @param {string} player - "X" or "O"
 * @returns {number[]|undefined} Winning combo indices or undefined if none.
 */
function checkWin(player) {
    const wins = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];
    return wins.find(combo => combo.every(i => board[i] === player));
}

/**
 * Makes a move for the computer.
 * @returns {void}
 */
const compMoves = () => {
    currentPlayer = comp;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === "") {
            board[i] = comp;
            updateCell();
            currentPlayer = player;
            break;
        }
    }
    const win = checkWin(comp);
    if (win) {
        highlightWin(win);
        disable = false;
        updateButtonText();
        alert('Computer wins!');
    }
};

/**
 * Handles a player clicking a cell.
 * @param {number} index - Cell index (0-8)
 * @returns {void}
 */
const cellClick = (index) => {
    if (board[index] !== "") return;

    if (cellsClicked === 0) {
        board[index] = player;
        updateCell();
        cellsClicked = 1;
    } else {
        board[index] = player;
        updateCell();
        const win = checkWin(player);
        if (win) {
            highlightWin(win);
            disable = false;
            updateButtonText();
            alert(`${player} wins!`);
        } else {
            currentPlayer = comp;
            setTimeout(() => {
                compMoves();
            }, 1000);
        }
    }
};

/**
 * Handles start/clear button click.
 * @returns {void}
 */
const btnPressed = () => {
    if (disable === true) {
        clearCells();
        disable = false;
        updateButtonText();
        currentPlayer = comp;
        setTimeout(() => {
            compMoves();
        }, 1000);
    } else {
        clearCells();
    }
};

document.getElementById("startClearbtn").addEventListener("click", btnPressed);

for (let i = 0; i < 9; i++) {
    document.getElementById(`cell-${i}`).addEventListener("click", () => cellClick(i));
}
