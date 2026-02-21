import React from "react";
import "./Board.css";

const getPieceImage = (name) =>
  require(`../assets/${name.toLowerCase()}.png`);

export default function Board({
  board,
  selected,
  validMoves,
  onTileClick,
}) {
  return (
    <div className="board">
      {board.map((row) =>
        row.map((tile) => {
          const isSelected =
            selected &&
            selected.row === tile.row &&
            selected.col === tile.col;

          const moveInfo = validMoves.find(
            (m) => m.row === tile.row && m.col === tile.col
          );

          return (
            <div
              key={`${tile.row}-${tile.col}`}
              className={`tile ${tile.type}`}
              onClick={() => onTileClick(tile)}
            >
              {/* Valid move dot */}
              {moveInfo && (
                <div
                  className={
                    moveInfo.type === "capture"
                      ? "capture-indicator"
                      : "move-dot"
                  }
                />
              )}

              {/* Piece wrapper */}
              {tile.piece && (
                <div className="piece-wrapper">
                  {isSelected && <div className="selected-ring" />}

                  <div className={`piece ${tile.piece.player}`}>
                    <img
                      src={getPieceImage(tile.piece.name)}
                      alt={tile.piece.name}
                      className="piece-img"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}