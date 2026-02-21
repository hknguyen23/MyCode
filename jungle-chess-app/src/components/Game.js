import React, { useState } from "react";
import Board from "./Board";
import Legend from "./Legend";
import Rules from "./Rules";
import { createInitialBoard } from "../services/board";
import { getValidMoves, movePiece } from "../services/move";
import "./Game.css";

export default function Game() {
  const [board, setBoard] = useState(createInitialBoard());
  const [currentPlayer, setCurrentPlayer] = useState("red");
  const [selected, setSelected] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [winner, setWinner] = useState(null);
  const [history, setHistory] = useState([]);

  function handleTileClick(tile) {
    if (winner) {
      return;
    }
    // Move execution
    if (selected && validMoves.some((m) => m.row === tile.row && m.col === tile.col)) {
      // Save current state BEFORE moving
      setHistory((prev) => [
        ...prev,
        {
          board,
          currentPlayer,
          winner,
        },
      ]);

      const newBoard = movePiece(board, selected, tile);
      setBoard(newBoard);
      setSelected(null);
      setValidMoves([]);

      // Win condition
      if (tile.type === "den") {
        setWinner(currentPlayer);
        return;
      }
      
      setCurrentPlayer(currentPlayer === "red" ? "blue" : "red");
      return;
    }

    // Select piece (must belong to current player)
    if (tile.piece && tile.piece.player === currentPlayer) {
      setSelected(tile);
      setValidMoves(getValidMoves(board, tile.row, tile.col));
    } else {
      setSelected(null);
      setValidMoves([]);
    }
  }

  function undoMove() {
    if (history.length === 0) {
      return;
    }
  
    const previous = history[history.length - 1];
    setBoard(previous.board);
    setCurrentPlayer(previous.currentPlayer);
    setWinner(previous.winner);
  
    setHistory(history.slice(0, history.length - 1));
    setSelected(null);
    setValidMoves([]);
  }

  function resetGame() {
    setBoard(createInitialBoard());
    setCurrentPlayer("red");
    setSelected(null);
    setValidMoves([]);
    setWinner(null);
  }

  return (
    <div>
      <div style={{ textAlign: "center", marginBottom: "10px" }}>
        {winner ? (
          <h2>{winner.toUpperCase()} Wins 🎉</h2>
        ) : (
          <h2>Turn: {currentPlayer.toUpperCase()}</h2>
        )}
        <button onClick={resetGame}>Reset Game</button>
        <button onClick={undoMove} disabled={history.length === 0}>Undo</button>
      </div>      

      <div className="game-layout">
        <Rules />

        <Board
          board={board}
          selected={selected}
          validMoves={validMoves}
          onTileClick={handleTileClick}
        />

        <Legend />
      </div>
    </div>
  );
}
