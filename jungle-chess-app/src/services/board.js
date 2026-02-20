export const ROWS = 9;
export const COLS = 7;

export function getTileType(row, col) {
  if (row === 0 && col === 3) {
    return "den";
  }
  if (row === 8 && col === 3) {
    return "den";
  }

  const traps = [
    [0, 2], [0, 4], [1, 3],
    [8, 2], [8, 4], [7, 3]
  ];

  if (traps.some(([r, c]) => r === row && c === col)) {
    return "trap";
  }

  if (row >= 3 &&row <= 5 &&(col === 1 || col === 2 || col === 4 || col === 5)) {
    return "water";
  }

  if (row >= 3 && row <= 5 && col === 3) {
    return "bridge";
  }

  return "land";
}

function createPiece(name, rank, player) {
  return { name, rank, player };
}

function placeInitialPieces(board) {
  const placements = [
    [0, 0, "Lion", 7, "red"],
    [0, 6, "Tiger", 6, "red"],
    [1, 1, "Dog", 3, "red"],
    [1, 5, "Cat", 2, "red"],
    [2, 0, "Rat", 1, "red"],
    [2, 2, "Panther", 5, "red"],
    [2, 4, "Wolf", 4, "red"],
    [2, 6, "Elephant", 8, "red"],

    [8, 6, "Lion", 7, "blue"],
    [8, 0, "Tiger", 6, "blue"],
    [7, 5, "Dog", 3, "blue"],
    [7, 1, "Cat", 2, "blue"],
    [6, 6, "Rat", 1, "blue"],
    [6, 4, "Panther", 5, "blue"],
    [6, 2, "Wolf", 4, "blue"],
    [6, 0, "Elephant", 8, "blue"],
  ];

  placements.forEach(([row, col, name, rank, player]) => {
    board[row][col].piece = createPiece(name, rank, player);
  });
}

export function createInitialBoard() {
  const board = [];

  for (let row = 0; row < ROWS; row++) {
    const rowArray = [];
    for (let col = 0; col < COLS; col++) {
      rowArray.push({
        row,
        col,
        type: getTileType(row, col),
        piece: null,
      });
    }

    board.push(rowArray);
  }

  placeInitialPieces(board);
  return board;
}
