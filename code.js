function createBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let i = 0; i < 81; i++) {
        const input = document.createElement("input");
        input.type = "text";
        input.maxLength = "1";

        const row = Math.floor(i / 9);
        const col = i % 9;

        
        if (row % 3 === 0) input.style.borderTop = "3px solid black";
        if (col % 3 === 0) input.style.borderLeft = "3px solid black";
        if (row === 8) input.style.borderBottom = "3px solid black";
        if (col === 8) input.style.borderRight = "3px solid black";

        input.addEventListener("input", (e) => {
            if (!/^[1-9]$/.test(e.target.value)) {
                e.target.value = "";
            }
        });

        boardDiv.appendChild(input);
    }
}

function getBoard() {
    const inputs = document.querySelectorAll("#board input");
    return Array.from(inputs).map(input =>
        input.value === "" ? 0 : parseInt(input.value)
    );
}

function setBoard(board) {
    const inputs = document.querySelectorAll("#board input");
    inputs.forEach((input, index) => {
        input.value = board[index] === 0 ? "" : board[index];
    });
}
function resetBoard() {
    const inputs = document.querySelectorAll("#board input");

    inputs.forEach(input => {
        input.value = "";
    });

    document.getElementById("message").innerText = "Board cleared. Enter new puzzle.";
}

function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
        if (board[row * 9 + i] === num) return false;
        if (board[i * 9 + col] === num) return false;

        const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
        const boxCol = 3 * Math.floor(col / 3) + (i % 3);

        if (board[boxRow * 9 + boxCol] === num) return false;
    }
    return true;
}

function solve(board) {
    for (let i = 0; i < 81; i++) {
        if (board[i] === 0) {
            const row = Math.floor(i / 9);
            const col = i % 9;

            for (let num = 1; num <= 9; num++) {
                if (isValid(board, row, col, num)) {
                    board[i] = num;

                    if (solve(board)) return true;

                    board[i] = 0;
                }
            }
            return false;
        }
    }
    return true;
}

function solveSudoku() {
    const board = getBoard();

    if (solve(board)) {
        setBoard(board);
        document.getElementById("message").innerText = "✅ Solved Successfully!";
    } else {
        document.getElementById("message").innerText = "❌ No Solution Exists!";
    }
}

function clearBoard() {
    const inputs = document.querySelectorAll("#board input");
    inputs.forEach(input => input.value = "");
    document.getElementById("message").innerText = "";
}

createBoard();