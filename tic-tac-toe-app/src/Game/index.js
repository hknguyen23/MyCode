import React, {useState, useEffect} from 'react';
import Board from '../Board';
import calculateWinner from './gameServices';

function Game() {
  const [nCol, setNCol] = useState(0);
  const [nRow, setNRow] = useState(0);
  const [isBlockedRule, setIsBlockedRule] = useState(false);
  const [isAllowMoreThan5ToWin, setIsAllowMoreThan5ToWin] = useState(true);
  const [hasWinner, setHasWinner] = useState(false);

  const [history, setHistory] = useState([
    {
      squares: Array(0).fill(null),
      position: -1
    }
  ]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);
  const [isAscending, setIsAscending] = useState(true);

  const handleClick = (i) => {
    const newHistory = history.slice(0, stepNumber + 1);
    const current = newHistory[newHistory.length - 1];
    const squares = current.squares.slice();

    if (hasWinner || squares[i]) {
      return;
    }

    squares[i] = xIsNext ? "X" : "O";
    setHistory(newHistory.concat([
      {
        squares: squares,
        position: i
      }
    ]));
    setStepNumber(newHistory.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const sortButtonClicked = () => {
    setIsAscending(!isAscending);
  };

  const current = history[stepNumber];
  const winInfo = calculateWinner(current.squares, current.position, nCol, nRow, isBlockedRule, isAllowMoreThan5ToWin);
  const winner = winInfo.winner;

  useEffect(() => {
    setHasWinner(winner != null);
  }, [winner]);

  const moves = history.map((step, move) => {
    const rowIndex = Math.floor(step.position / nCol);
    const colIndex = step.position % nCol;
    const desc = move ? 'Go to move #' + move + 
      ' (' + colIndex + ', ' + rowIndex + ')' : 'Go to game start';
    const buttonClassName = (move === stepNumber) ? "selected-move" : "";
    return (
      <li key={move}>
        <button className={buttonClassName} onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  if (!isAscending) {
    moves.reverse();
  }

  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    if (winInfo.isDraw) {
      status = "Draw!!!";
    } else {
      status = "Next player: " + (xIsNext ? "X" : "O");
    }
  }

  const inputButtonClicked = () => {
    setNCol(document.getElementById('nCol').value);
    setNRow(document.getElementById('nRow').value);
    setIsBlockedRule(document.getElementById('isBlockedRule').checked);
    setIsAllowMoreThan5ToWin(document.getElementById('isAllowMoreThan5ToWin').checked);
    setHasWinner(false);
    setHistory([
      {
        squares: Array(0).fill(null),
        position: -1
      }
    ]);
    setStepNumber(0);
    setXIsNext(true);
    setIsAscending(true);
  }

  let element = (
    <div className="input-board-size">
      <label>Column: </label>
      <input id="nCol"></input>
      <label>Row: </label>
      <input id="nRow"></input>
      <label>Blocked Rule: </label>
      <input id="isBlockedRule" type="checkbox"></input>
      <label>Allow more than 5 to win: </label>
      <input id="isAllowMoreThan5ToWin" type="checkbox"></input>
      <button onClick={() => inputButtonClicked()}>OK</button>
    </div>
  );

  // initial
  if (nCol === 0 && nRow === 0) {
    return element;
  }
  if (nCol < 3 || nRow < 3 || isNaN(nCol) || isNaN(nRow)) {
    return (
      <div>
        {element}
        <br></br>
        <div>Invalid input</div>
        <div>Column or row size should be a number equal or bigger than 3</div>
      </div>
    );
  }    
  return (
    <div>
      {element}
      <br></br>
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => handleClick(i)}
            winLine={winInfo.winLine}
            nCol = {nCol}
            nRow = {nRow}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <button onClick={() => sortButtonClicked()}>
              {isAscending ? "Descending" : "Ascending"}
            </button>
          </div>
          <ol>{moves}</ol>
        </div>
      </div>
    </div>
  ); 
}

export default Game;