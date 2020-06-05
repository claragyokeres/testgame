import React, { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import './style/game.css'

// Game board 
const generateBoard = () => {
  const numberOfRows = 3;
  const numberOfColumns = 5;
  const board = [];
  let tileNumber = 1;

  for (let rowNumber = 1; rowNumber <= numberOfRows; rowNumber += 1) {
    const row = [];
    for (let columnNumber = 1; columnNumber <= numberOfColumns; columnNumber += 1) {
      if (rowNumber === numberOfRows && columnNumber === numberOfColumns) {
        row.push(null);
      } else {
        row.push(tileNumber)
        tileNumber += 1;
      }
    }
    board.push(row);
  }
  return board;
}

// Initial state of board returned by generateBoard() is an ordered array, so we can use this array to define the winning array and state.
const winningArray = generateBoard();

const shuffleArray = (board) => {
  const newGame = cloneDeep(board);

  newGame.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      const rowIndex1 = Math.floor(Math.random() * (newGame.length));
      const columnIndex1 = Math.floor(Math.random() * (newGame.length));
      const temp = newGame[rowIndex][columnIndex];
      newGame[rowIndex][columnIndex] = newGame[rowIndex1][columnIndex1];
      newGame[rowIndex1][columnIndex1] = temp;
    })
  })
  return newGame;
}

// Compares board with winningArray to see if the game is won
const isGameWon = (board) => {
  let isWon = true;
  board.forEach((row, rowIndex) => {
    row.forEach((column, columnIndex) => {
      if (board[rowIndex][columnIndex] !== winningArray[rowIndex][columnIndex]) {
        isWon = false;
      }
    })
  })
  return isWon;
}

export const App = () => {
  const [won, setWon] = useState(false);
  const [currentGame, setCurrentGame] = useState(shuffleArray(winningArray));


  // Check if the brick can move
  const canMove = (currentRowIndex, currentColumnIndex, brickValue, row) => {
    const newGame = cloneDeep(currentGame);

    // Checking if brick can move up
    if (currentRowIndex !== 0 && currentGame[currentRowIndex - 1][currentColumnIndex] === null) {
      newGame[currentRowIndex - 1][currentColumnIndex] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
      // Checking if brick can move down
    } else if (currentRowIndex !== currentGame.length - 1 && currentGame[currentRowIndex + 1][currentColumnIndex] === null) {
      newGame[currentRowIndex + 1][currentColumnIndex] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
      // Checking if brick can move to the right
    } else if (currentColumnIndex !== row.length - 1 && currentGame[currentRowIndex][currentColumnIndex + 1] === null) {
      newGame[currentRowIndex][currentColumnIndex + 1] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
      // Checking if brick can move to the left
    } else if (currentColumnIndex !== 0 && currentGame[currentRowIndex][currentColumnIndex - 1] === null) {
      newGame[currentRowIndex][currentColumnIndex - 1] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
    }
    setCurrentGame(newGame);
    setWon(isGameWon(newGame));
  }

  // Sätter vilkor för shuffle för att uppdatera state av won tillbaka till false
  const handleShuffle = () => {
    const newGame = cloneDeep(currentGame);
    if (won) {
      setWon(false);
      return shuffleArray(newGame);
    } else {
      return shuffleArray(newGame);
    }
  }

  return (
    <article className="main-container">
      <div className="winning-container">
        {won && (
          <h1 className="winning-title">YOU WIN!</h1>
        )}
      </div>
      <div className="game-board">
        {currentGame.map((row, currentRowIndex) => (
          <div key={currentRowIndex} className="row">
            {row.map((brickValue, currentColumnIndex) => (
              <div
                key={`${currentRowIndex}-${currentColumnIndex}`}
                className={brickValue !== null
                  ? 'game-brick'
                  : 'null-brick'}
                role="button"
                onClick={() => canMove(currentRowIndex, currentColumnIndex, brickValue, row)}>
                {brickValue}
              </div>
            ))}
          </div>
        ))}
      </div>
      <button
        className="shuffle-button"
        type="button"
        onClick={() => setCurrentGame(handleShuffle(currentGame))}>
        Shuffle
      </button>
    </article>
  )
}

