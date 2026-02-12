import React from 'react';
import Row from '../Row';
import Square from '../Square';

function Board({squares, winLine, onClick, nCol, nRow, latestPos}) {
  const renderSquare = (i) => {
    console.log(i);
    console.log(latestPos);
    return (
      <Square
        key={i}
        value={squares[i]}
        isHighlight={winLine && winLine.includes(i)}
        isLatest={latestPos === i}
        onClick={() => onClick(i)}
      />
    );
  };

  const renderRow = (i, squares) => {
    return (
      <Row
        key={i}
        squares={squares}
      />
    );
  };

  const renderBoard = () => {
    let rows = [];
    for (let i = 0; i < nRow; i++) {
      let squares = [];
      for (let j = 0; j < nCol; j++) {
        squares.push(renderSquare(nCol * i + j));
      }
      rows.push(renderRow(i, squares));
    }
    return rows;
  };

  return (
    <div>
      {renderBoard()}
    </div>
  );
}

export default Board;