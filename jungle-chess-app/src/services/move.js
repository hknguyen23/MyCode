function isInside(board, row, col) {
  return row >= 0 && row < board.length && col >= 0 && col < board[0].length;
}

function isOwnDen(tile, player) {
  if (tile.type !== "den") {
    return false;
  }

  // Top den belongs to red
  if (tile.row === 0 && tile.col === 3 && player === "red") {
    return true;
  }

  // Bottom den belongs to blue
  if (tile.row === 8 && tile.col === 3 && player === "blue") {
    return true;
  }

  return false;
}

function isOpponentDen(tile, player) {
  if (tile.type !== "den") {
    return false;
  }
  return !isOwnDen(tile, player);
}

function isRatBlockingWater(board, startRow, startCol, dr, dc) {
  let row = startRow + dr;
  let col = startCol + dc;

  while (isInside(board, row, col) && board[row][col].type === "water") {
    if (board[row][col].piece?.name === "Rat") {
      return true;
    }
    row += dr;
    col += dc;
  }

  return false;
}

function getJumpDestination(board, row, col, dr, dc) {
  let newRow = row + dr;
  let newCol = col + dc;

  while (isInside(board, newRow, newCol) && board[newRow][newCol].type === "water") {
    newRow += dr;
    newCol += dc;
  }

  if (!isInside(board, newRow, newCol)) {
    return null;
  }

  return {
    row: newRow,
    col: newCol
  };
}

function canCapture(board, fromTile, toTile) {
  const defender = toTile.piece;
  if (!defender) {
    return true;
  }

  const attacker = fromTile.piece;
  if (attacker.player === defender.player) {
    return false;
  }

  // Trap rule: if defender is in attacker's trap → attacker wins
  if (toTile.type === "trap") {
    return true;
  }

  if (attacker.name === "Rat") {
    if (defender.name === "Elephant") {
      // Rat cannot attack elephant from water to land
      if (fromTile.type === "water" && toTile.type !== "water") {
        return false;
      }
      return true;
    }

    if (defender.name === "Rat") {
      // Rat cannot attack rat from water to land
      if (fromTile.type === "water" && toTile.type !== "water") {
        return false;
      }
      return true;
    }
  }

  if (attacker.name === "Elephant" && defender.name === "Rat") {
    return false;
  }

  return attacker.rank >= defender.rank;
}

export function getValidMoves(board, row, col) {
  const directions = [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ];

  const moves = [];
  const fromTile = board[row][col];
  const piece = fromTile.piece;
  if (!piece) {
    return moves;
  }

  const player = piece.player;
  directions.forEach(([dr, dc]) => {
    let newRow = row + dr;
    let newCol = col + dc;

    if (!isInside(board, newRow, newCol)) {
      return;
    }

    const targetTile = board[newRow][newCol];
    if (isOwnDen(targetTile, player)) {
      return;
    }

    // WATER RULE
    if (targetTile.type === "water") {
      // Rat can enter water normally
      if (piece.name === "Rat") {
        if (canCapture(board, fromTile, targetTile)) {
          moves.push({
            row: newRow,
            col: newCol,
            type: targetTile.piece ? "capture" : "move"
          });
        }
        return;
      }

      const isVertical = dr !== 0;
      const isHorizontal = dc !== 0;

      let canJump = false;

      // Lion → both directions
      if (piece.name === "Lion") {
        canJump = true;
      }

      // Tiger → vertical only
      if (piece.name === "Tiger" && isVertical) {
        canJump = true;
      }

      // Panther → horizontal only
      if (piece.name === "Panther" && isHorizontal) {
        canJump = true;
      }

      if (canJump) {
        if (!isRatBlockingWater(board, row, col, dr, dc)) {
          const jumpDest = getJumpDestination(board, row, col, dr, dc);
          if (jumpDest) {
            const jumpTile = board[jumpDest.row][jumpDest.col];
            if (canCapture(board, fromTile, jumpTile)) {
              moves.push({
                ...jumpDest,
                type: jumpTile.piece ? "capture" : "move"
              });
            }
          }
        }
      }

      return;
    }

    // Normal movement
    if (canCapture(board, fromTile, targetTile)) {
      moves.push({
        row: newRow,
        col: newCol,
        type: targetTile.piece ? "capture" : "move"
      });
    }
  });

  return moves;
}

export function movePiece(board, from, to) {
  const newBoard = board.map((row) =>
    row.map((cell) => ({
      ...cell
    }))
  );

  newBoard[to.row][to.col].piece = newBoard[from.row][from.col].piece;
  newBoard[from.row][from.col].piece = null;

  return newBoard;
}