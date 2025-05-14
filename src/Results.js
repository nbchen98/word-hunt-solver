import React from 'react';
import './Results.css';

export default function Results({ words, isBoardFilled }) {
  const columns = [
    { label: '3 Letters', filter: w => w.length === 3 },
    { label: '4 Letters', filter: w => w.length === 4 },
    { label: '5 Letters', filter: w => w.length === 5 },
    { label: '6 Letters', filter: w => w.length === 6 },
    { label: '7+ Letters', filter: w => w.length >= 7 }
  ];
  return (
    <div className="words-container">
      <h2>Found Words</h2>
      {isBoardFilled ? (
        words.length > 0 ? (
          <div className="words-columns">
            {[...columns].reverse().map(({ label, filter }) => {
              const filteredWords = words.filter(filter).sort((a, b) => a.localeCompare(b));
              return (
                <div key={label} className="words-column">
                  <h3>{label}</h3>
                  {filteredWords.length > 0 ? (
                    <ul>
                      {filteredWords.map((word, idx) => (
                        <li key={idx}>{word}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="no-words">-</p>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <p>No words found</p>
        )
      ) : (
        <p>Fill the board to find words</p>
      )}
    </div>
  );
}
