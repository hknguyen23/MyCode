import React from "react";
import "./Legend.css";

export default function Legend() {
  const pieces = [
    { short: "E", name: "Elephant", rank: 8 },
    { short: "L", name: "Lion", rank: 7 },
    { short: "T", name: "Tiger", rank: 6 },
    { short: "P", name: "Panther", rank: 5 },
    { short: "W", name: "Wolf", rank: 4 },
    { short: "D", name: "Dog", rank: 3 },
    { short: "C", name: "Cat", rank: 2 },
    { short: "R", name: "Rat", rank: 1 },
  ];

  return (
    <div className="legend">
      <h3>Piece Legend</h3>
      {pieces.map((p) => (
        <div key={p.name} className="legend-row">
          <span className="legend-short">{p.short}</span>
          <span className="legend-name">
            {p.name} ({p.rank})
          </span>
        </div>
      ))}
    </div>
  );
}