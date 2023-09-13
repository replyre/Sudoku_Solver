document.addEventListener("DOMContentLoaded", () => {
  const gridSize = 9;
  const solveButton = document.getElementById("solve-btn");
  solveButton.addEventListener("click", solveSudoku);

  const sudokuGrid = document.getElementById("sudoku-grid");
  for (let r = 0; r < gridSize; r++) {
    const newRow = document.createElement("tr");
    for (let c = 0; c < gridSize; c++) {
      const cell = document.createElement("td");
      const input = document.createElement("input");
      input.type = "number";
      (input.className = "cell"), (input.id = `cell-${r}-${c}`);
      cell.appendChild(input);
      newRow.appendChild(cell);
    }
    sudokuGrid.appendChild(newRow);
  }
});

async function solveSudoku() {
  const gridSize = 9;
  const sudokuArray = [];

  for (let r = 0; r < gridSize; r++) {
    sudokuArray[r] = [];
    for (let c = 0; c < gridSize; c++) {
      const cellId = `cell-${r}-${c}`;
      const cellValue = document.getElementById(cellId).value;
      sudokuArray[r][c] = cellValue !== "" ? parseInt(cellValue) : 0;
    }
  }
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cellId = `cell-${r}-${c}`;
      const cell = document.getElementById(cellId);
      if (sudokuArray[r][c] !== 0) {
        cell.classList.add("user-input");
      }
    }
  }

  if (solveSudokuHelper(sudokuArray)) {
    for (let r = 0; r < gridSize; r++) {
      for (let c = 0; c < gridSize; c++) {
        const cellId = `cell-${r}-${c}`;
        const cell = document.getElementById(cellId);

        if (!cell.classList.contains("user-input")) {
          cell.value = sudokuArray[r][c];
          cell.classList.add("solved");
          await sleep(20);
        }
      }
    }
  } else {
    alert("No solution exists for the given Sudoku Puzzle");
  }
}

function solveSudokuHelper(board) {
  const gridSize = 9;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      if (board[r][c] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValidMove(board, r, c, num)) {
            board[r][c] = num;

            if (solveSudokuHelper(board)) {
              return true;
            }
            board[r][c] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function isValidMove(board, r, c, num) {
  const gridSize = 9;

  for (let i = 0; i < gridSize; i++) {
    if (board[r][i] === num || board[i][c] === num) {
      return false;
    }
  }
  const sRow = Math.floor(r / 3) * 3;
  const sCol = Math.floor(c / 3) * 3;
  for (let i = sRow; i < sRow + 3; i++) {
    for (let j = sCol; j < sCol + 3; j++)
      if (board[i][j] === num) {
        return false;
      }
  }
  return true;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

document.getElementById("clear").addEventListener("click", clear);
function clear() {
  let gridSize = 9;
  for (let r = 0; r < gridSize; r++) {
    for (let c = 0; c < gridSize; c++) {
      const cellId = `cell-${r}-${c}`;
      document.getElementById(cellId).value = "";
      document.getElementById(cellId).classList.remove("user-input");
    }
  }
}
