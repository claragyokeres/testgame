import React, { useState } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import './style/game.css'
import Brick from './components/Brick';
import WinMessage from './components/WinMessage'
import ShuffleButton from './components/ShuffleButton'
import utils from './utils'

//Using lodash clonedeep in order to make sure that history should not be able to change

//Setting the game logic
const setGameState = ({ currentRowIndex, currentColumnIndex, brickValue, rowSize, currentGame, setCurrentGame, setWon, winningArray }) => {
  let newGame = cloneDeep(currentGame);
  // Can brick move UP
  if (currentRowIndex !== 0 && currentGame[currentRowIndex - 1][currentColumnIndex] === null) {
    newGame[currentRowIndex - 1][currentColumnIndex] = brickValue;
    newGame[currentRowIndex][currentColumnIndex] = null;
    // Can brick move DOWN
  } else if (currentRowIndex !== currentGame.length - 1 && currentGame[currentRowIndex + 1][currentColumnIndex] === null) {
    newGame[currentRowIndex + 1][currentColumnIndex] = brickValue;
    newGame[currentRowIndex][currentColumnIndex] = null;
    // Can brick move RIGHT
  } else if (currentColumnIndex !== rowSize - 1 && currentGame[currentRowIndex][currentColumnIndex + 1] === null) {
    newGame[currentRowIndex][currentColumnIndex + 1] = brickValue;
    newGame[currentRowIndex][currentColumnIndex] = null;
    // Can brick move LEFT
  } else if (currentColumnIndex !== 0 && currentGame[currentRowIndex][currentColumnIndex - 1] === null) {
    newGame[currentRowIndex][currentColumnIndex - 1] = brickValue;
    newGame[currentRowIndex][currentColumnIndex] = null;
  }
  setCurrentGame(newGame);
  setWon(utils.isGameWon(newGame, winningArray));
}

export const App = () => {
  const [won, setWon] = useState(false);
  const [currentGame, setCurrentGame] = useState(utils.shuffleArray());

  // Winning array and state. Initial state is an ordered array by generateBoard()
  const winningArray = utils.generateBoard();

  // Check if the brick can move
  const canMove = (currentRowIndex, currentColumnIndex, brickValue, rowSize) => {
    setGameState({ currentRowIndex, currentColumnIndex, brickValue, rowSize, currentGame, setCurrentGame, setWon, winningArray });
  }

  // Sets conditions for shuffle to update state won to false
  const startNewGame = () => {
    if (won) {
      setWon(false);
    }
    setCurrentGame(utils.shuffleArray());
  }

  return (
    <div className="main-container">
      {won && (<WinMessage />
      )}
      <h1 className="header-title"> 15 PUZZLE GAME</h1>
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

