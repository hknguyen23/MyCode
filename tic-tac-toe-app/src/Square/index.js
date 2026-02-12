import React from 'react';

function Square({value, isHighlight, isLatest, onClick}) {
  let className = "square";
  if (isHighlight) {
    className += " yellow";
  } else if (isLatest) {
    className += " latest";
  }
  if (value === "X") {
    className += " blue";
  } else {
    className += " red";
  }
  return (
    <button className={className} onClick={onClick}>
      {value}
    </button>
  )
}

export default Square;