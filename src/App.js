import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import { loadWordList } from './wordlist';
import Board from './Board';
import Results from './Results';

function App() {
  const [board, setBoard] = useState(Array(4).fill().map(() => Array(4).fill('')));
  const [words, setWords] = useState([]);
  const [isBoardFilled, setIsBoardFilled] = useState(false);
  const [wordList, setWordList] = useState([]);

  useEffect(() => {
    loadWordList().then(setWordList);
  }, []);

  // Cell Refs
  const inputRefs = useRef(
    Array.from({ length: 4 }, () => Array.from({ length: 4 }, () => React.createRef()))
  );

  // Check board every time it changes
  useEffect(() => {
    const filled = board.every(row => row.every(cell => cell !== ''));
    setIsBoardFilled(filled);

    if (filled) {
      findWords();
    }
  }, [board]);

  // Move focus to a cell
  const focusCell = (row, col) => {
    if (row >= 0 && row < 4 && col >= 0 && col < 4) {
      inputRefs.current[row][col].current.focus();
    }
  };

  // Handle input change for each cell
  const handleCellChange = (rowIndex, colIndex, value) => {
    if (value.length > 1) {
      value = value.charAt(value.length - 1);
    }
    if (value && !value.match(/[a-zA-Z]/)) {
      return;
    }

    const newBoard = board.map(row => [...row]);
    newBoard[rowIndex][colIndex] = value.toUpperCase();
    setBoard(newBoard);

    // Move to next cell if value entered
    if(colIndex < 3) {
      focusCell(rowIndex, colIndex + 1);
    } else if(rowIndex < 3) {
      focusCell(rowIndex + 1, 0);
    }
  };

  // Handle backspace change
  const handleCellKeyDown = (rowIndex, colIndex, e) => {
    if (e.key === 'Backspace') {
      if (!board[rowIndex][colIndex] || e.target.selectionStart === 0) {
        if (colIndex > 0) {
          focusCell(rowIndex, colIndex - 1);
        } else if (rowIndex > 0) {
          focusCell(rowIndex - 1, 3);
        }
        e.preventDefault();
      }
    }
  };

  // Function to find words on the board
  const findWords = () => {
    if (!wordList.length) return;
    const found = new Set();
    const n = board.length;
    const m = board[0].length;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],           [0, 1],
      [1, -1],  [1, 0],  [1, 1]
    ];

    class TrieNode {
      constructor() {
        this.children = {};
        this.isWord = false;
      }
    }
    function buildTrie(words) {
      const root = new TrieNode();
      for (let word of words) {
        let node = root;
        for (let ch of word) {
          if (!node.children[ch]) node.children[ch] = new TrieNode();
          node = node.children[ch];
        }
        node.isWord = true;
      }
      return root;
    }
    const trie = buildTrie(wordList);

    function dfs(row, col, node, path, visited) {
      if (
        row < 0 || row >= n || col < 0 || col >= m ||
        visited[row][col] || !board[row][col]
      ) return;
      
      const ch = board[row][col].toUpperCase();
      
      const next = node.children[ch];
      if (!next) return;
      
      path += ch;
      visited[row][col] = true;
      
      if (next.isWord && path.length >= 3) {
        found.add(path);
        console.log('Found word:', path);
      }
      
      for (let [dr, dc] of directions) {
        dfs(row + dr, col + dc, next, path, visited);
      }
      
      visited[row][col] = false;
    }

    for (let i = 0; i < n; ++i) {
      for (let j = 0; j < m; ++j) {
        if (board[i][j]) {
          dfs(i, j, trie, '', Array.from({ length: n }, () => Array(m).fill(false)));
        }
      }
    }
    setWords(Array.from(found).sort((a, b) => b.length - a.length || a.localeCompare(b)));
  };

  const resetBoard = () => {
    setBoard(Array(4).fill().map(() => Array(4).fill('')));
    setWords([]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Word Hunt Solver</h1>
      </header>
      <main className="App-main">
        <div className="game-container">
          <div className="board-container">
            <Board
              board={board}
              onCellChange={handleCellChange}
              onCellKeyDown={handleCellKeyDown}
              inputRefs={inputRefs}
            />
            <button className="reset-button" onClick={resetBoard}>
              Reset Board
            </button>
          </div>

          <Results words={words} isBoardFilled={isBoardFilled} />
        </div>
      </main>
    </div>
  );
}

export default App;
