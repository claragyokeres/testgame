import React, { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import './style/game.css'
import Brick from './components/Brick';
import WinMessage from './components/WinMessage'
import ShuffleButton from './components/ShuffleButton'
import utils from './utils'

const useGameState = () => {
  const [won, setWon] = useState(false);
  const [currentGame, setCurrentGame] = useState(utils.shuffleArray());

  // Initial state of board returned by generateBoard() is an ordered array, so we can use this array to define the winning array and state.
  const winningArray = utils.generateBoard();

  const setGameState = (currentRowIndex, currentColumnIndex, brickValue, rowSize) => {
    let newGame = cloneDeep(currentGame);
    // Checking if brick can move up
    if (currentRowIndex !== 0 && currentGame[currentRowIndex - 1][currentColumnIndex] === null) {
      newGame[currentRowIndex - 1][currentColumnIndex] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
      // Checking if brick can move down
    } else if (currentRowIndex !== currentGame.length - 1 && currentGame[currentRowIndex + 1][currentColumnIndex] === null) {
      newGame[currentRowIndex + 1][currentColumnIndex] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
      // Checking if brick can move to the right
    } else if (currentColumnIndex !== rowSize - 1 && currentGame[currentRowIndex][currentColumnIndex + 1] === null) {
      newGame[currentRowIndex][currentColumnIndex + 1] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
      // Checking if brick can move to the left
    } else if (currentColumnIndex !== 0 && currentGame[currentRowIndex][currentColumnIndex - 1] === null) {
      newGame[currentRowIndex][currentColumnIndex - 1] = brickValue;
      newGame[currentRowIndex][currentColumnIndex] = null;
    }
    setCurrentGame(newGame);
    setWon(utils.isGameWon(newGame, winningArray));
  }

  return { won, setWon, currentGame, setCurrentGame, setGameState };
}

export const App = () => {
  const { won, setWon, currentGame, setCurrentGame, setGameState } = useGameState();

  // Check if the brick can move
  const canMove = (currentRowIndex, currentColumnIndex, brickValue, rowSize) => {
    setGameState(currentRowIndex, currentColumnIndex, brickValue, rowSize);
  }

  const startNewGame = () => {
    // Sätter vilkor för shuffle för att uppdatera state av won tillbaka till false
    if (won) {
      setWon(false);
    }

    setCurrentGame(utils.shuffleArray());
  }

  return (
    <div className="main-container">
      {won && (<WinMessage />
      )}
      <div className="game-board">
        {currentGame.map((row, currentRowIndex) => (
          <div key={currentRowIndex} className="row">
            {row.map((brickValue, currentColumnIndex) => (
              <Brick
                key={`${currentRowIndex}-${currentColumnIndex}`}
                rowIndex={currentRowIndex}
                colIndex={currentColumnIndex}
                rowSize={row.length}
                value={brickValue}
                onClick={canMove} />
            ))}
          </div>
        ))}
      </div>
      <ShuffleButton
        onClick={startNewGame}
      />
    </div>
  )
}

