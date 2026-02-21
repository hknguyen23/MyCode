import React from "react";
import "./Rules.css";

export default function Rules() {
  return (
    <div className="rules">
      <h3>How to Play</h3>

      <ul>
        <li>Take turns moving one piece.</li>
        <li>Enter opponent's den to win.</li>
        <li>Cannot enter your own den.</li>
        <li>Higher rank captures lower rank.</li>
        <li>Rat can capture Elephant.</li>
        <li>Elephant cannot capture Rat.</li>
        <li>Only Rat can enter water.</li>
        <li>
          Lion: jump water (horizontal & vertical)
        </li>
        <li>
          Tiger: jump water vertically
        </li>
        <li>
          Panther: jump water horizontally
        </li>
        <li>Rat blocks jump if in water.</li>
        <li>Trap weakens piece inside it.</li>
      </ul>
    </div>
  );
}