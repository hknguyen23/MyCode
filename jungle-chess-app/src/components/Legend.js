import React from "react";
import "./Legend.css";

const getPieceImage = (name) =>
  require("../assets/" + name.toLowerCase() + ".png");

export default function Legend() {
  const pieces = [
    { name: "Elephant", rank: 8 },
    { name: "Lion", rank: 7 },
    { name: "Tiger", rank: 6 },
    { name: "Panther", rank: 5 },
    { name: "Wolf", rank: 4 },
    { name: "Dog", rank: 3 },
    { name: "Cat", rank: 2 },
    { name: "Rat", rank: 1 },
  ];

  return (
    <div className="legend">
      <h3>Piece Legend</h3>

      {pieces.map((p) => (
        <div key={p.name} className="legend-row">
          <div className="legend-piece">
            <img
              src={getPieceImage(p.name)}
              alt={p.name}
              className="legend-img"
            />
          </div>

          <div className="legend-info">
            <span className="legend-name">{p.name}</span>
            <span className="legend-rank">Rank: {p.rank}</span>
          </div>
        </div>
      ))}
    </div>
  );
}