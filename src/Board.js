import React from 'react';
import './Board.css';
export default function Board({ board, onCellChange, onCellKeyDown, inputRefs }) {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {row.map((cell, colIndex) => (
            <input
              key={colIndex}
              type="text"
              className="board-cell"
              value={cell}
              maxLength={1}
              ref={inputRefs.current[rowIndex][colIndex]}
              onChange={e => onCellChange(rowIndex, colIndex, e.target.value)}
              onKeyDown={e => onCellKeyDown(rowIndex, colIndex, e)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
