# Word Hunt Solver

A React application that helps solve Word Hunt puzzles by finding all possible words in a 4x4 letter grid.

## How It Works

1. Enter letters into the 4x4 grid
2. The solver automatically finds all valid words (3+ letters) by:
   - Checking all possible paths through adjacent letters
   - Using a trie data structure for efficient word lookup
   - Validating against a dictionary of common words

## Features

- Real-time word finding as you type
- Words sorted by length
- Keyboard navigation between cells
- Mobile-friendly interface

## Try It

Visit: [Word Hunt Solver](https://nbchen98.github.io/word-hunter)

## Local Development

```bash
npm install
npm start
```

## Tech Stack

- React
- JavaScript
- HTML/CSS
