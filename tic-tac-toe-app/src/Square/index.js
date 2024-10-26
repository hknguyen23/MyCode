import React from 'react';

function Square({value, isHighlight, onClick}) {
  const className = "square" + (isHighlight ? " yellow" : "") + (value === "X" ? " blue" : " red");
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Square;