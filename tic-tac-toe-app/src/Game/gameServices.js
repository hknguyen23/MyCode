function calculateWinner(squares, pos, n, m, isBlockedRule, isAllowMoreThan5ToWin) {
  const position = parseInt(pos, 10);
  if (position === -1) {
    return {
      winner : null,
      winLine: null,
      isDraw: false
    }
  }

  const nCol = parseInt(n, 10);
  const nRow = parseInt(m, 10);

  // win condition
  let N = 5;

  //#region check for the column win line
  let start = position;
  for (let i = 0; i < N - 1; i++) {
    if (start < nCol) {
      break;
    }
    start -= nCol;
  }
  let end = position;
  for (let i = 0; i < N - 1; i++) {
    if (end + nCol >= nCol * nRow) {
      break;
    }
    end += nCol;
  }

  let jumpStep = nCol;
  let winLine = [];
  for (let i = start; i <= end; i += jumpStep) {
    if (squares[i] != null && squares[i] === squares[position]) {
      winLine.push(i);
    } else {
      winLine = [];
    }

    if (winLine.length === N) {
      let idx1 = winLine[0] - jumpStep;
      let idx2 = winLine[N - 1] + jumpStep;
      // check for the blocked rule
      if (isBlockedRule && checkBlockedRule(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        }
      }
  
      // check exact 5 to win
      if (!isAllowMoreThan5ToWin && checkMoreThan5(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        } 
      }
  
      return {
        winner: squares[position],
        winLine: winLine,
        isDraw: false
      }
    }
  }
  //#endregion
  
  //#region check for the row win line
  start = position;
  for (let i = 0; i < N - 1; i++) {
    if (start % nCol === 0) {
      break;
    }
    start -= 1;
  }
  end = position;
  for (let i = 0; i < N - 1; i++) {
    if (end % nCol === nCol - 1) {
      break;
    }
    end += 1;
  }

  jumpStep = 1;
  winLine = [];
  for (let i = start; i <= end; i += jumpStep) {
    if (squares[i] != null && squares[i] === squares[position]) {
      winLine.push(i);
    } else {
      winLine = [];
    }

    if (winLine.length === N) {
      let idx1 = winLine[0] - jumpStep;
      let idx2 = winLine[N - 1] + jumpStep;
      // check for the blocked rule
      if (isBlockedRule && checkBlockedRule(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        }
      }
  
      // check exact 5 to win
      if (!isAllowMoreThan5ToWin && checkMoreThan5(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        } 
      }
  
      return {
        winner: squares[position],
        winLine: winLine,
        isDraw: false
      }
    }
  }
  //#endregion

  //#region check for the left diagonal win line
  /*
    X . .
    . X .
    . . X
  */
  start = position
  for (let i = 0; i < N - 1; i++) {
    if (start % nCol === 0 || start < nCol) {
      break;
    }
    start -= (nCol + 1);
  }
  end = position;
  for (let i = 0; i < N - 1; i++) {
    if (end % nCol === nCol - 1 || end + nCol + 1 > nCol * nRow) {
      break;
    }
    end += nCol + 1;
  }

  jumpStep = nCol + 1;
  winLine = [];
  for (let i = start; i <= end; i += jumpStep) {
    if (squares[i] != null && squares[i] === squares[position]) {
      winLine.push(i);
    } else {
      winLine = [];
    }

    if (winLine.length === N) {
      let idx1 = winLine[0] - jumpStep;
      let idx2 = winLine[N - 1] + jumpStep;
      // check for the blocked rule
      if (isBlockedRule && checkBlockedRule(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        }
      }
  
      // check exact 5 to win
      if (!isAllowMoreThan5ToWin && checkMoreThan5(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        } 
      }
  
      return {
        winner: squares[position],
        winLine: winLine,
        isDraw: false
      }
    }
  }
  //#endregion

  //#region check for the right diagonal win line
  /*
    . . X
    . X .
    X . .
  */
  start = position
  for (let i = 0; i < N - 1; i++) {
    if (start % nCol === nCol - 1 || start < nCol) {
      break;
    }
    start -= (nCol - 1);
  }
  end = position;
  for (let i = 0; i < N - 1; i++) {
    if (end % nCol === 0 || end + nCol > nCol * nRow) {
      break;
    }
    end += nCol - 1;
  }

  jumpStep = nCol - 1;
  winLine = [];
  for (let i = start; i <= end; i += jumpStep) {
    if (squares[i] != null && squares[i] === squares[position]) {
      winLine.push(i);
    } else {
      winLine = [];
    }

    if (winLine.length === N) {
      let idx1 = winLine[0] - jumpStep;
      let idx2 = winLine[N - 1] + jumpStep;
      if (winLine[0] % nCol === nCol - 1 || winLine[0] < nCol) {
        idx1 = -1;
      }
      if (winLine[N - 1] % nCol === 0 || winLine[N - 1] + nCol > nCol * nRow) {
        idx2 = -1;
      }
      
      // check for the blocked rule
      if (isBlockedRule && checkBlockedRule(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        }
      }
  
      // check exact 5 to win
      if (!isAllowMoreThan5ToWin && checkMoreThan5(squares, position, nCol, nRow, idx1, idx2)) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        } 
      }
  
      return {
        winner: squares[position],
        winLine: winLine,
        isDraw: false
      }
    }
  }
  //#endregion

  //#region check for draw
  if (squares.length === nCol * nRow) {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] == null) {
        return {
          winner : null,
          winLine: null,
          isDraw: false
        }
      }
    }
    return {
      winner : null,
      winLine: null,
      isDraw: true
    }
  }
  //#endregion

  return {
    winner : null,
    winLine: null,
    isDraw: false
  }
}

function checkBlockedRule(squares, position, nCol, nRow, idx1, idx2) {
  return idx1 >= 0 && idx2 <= nCol * nRow && squares[idx1] != null && squares[idx2] != null 
    && squares[idx1] !== squares[position] && squares[idx2] !== squares[position];
}

function checkMoreThan5(squares, position, nCol, nRow, idx1, idx2) {
  return (idx1 >= 0 && squares[idx1] != null && squares[idx1] === squares[position]) 
    || (idx2 <= nCol * nRow && squares[idx2] != null && squares[idx2] === squares[position]);
}

export default calculateWinner;
