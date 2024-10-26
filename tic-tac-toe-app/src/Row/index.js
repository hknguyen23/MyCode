import React from 'react';

function Row({squares}) {
  return (
    <div className="board-row">
      {squares}
    </div>
  )
}

export default Row;