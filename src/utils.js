const utils = {
    generateBoard: () => {
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
    },

    shuffleArray: () => {
        const newGame = utils.generateBoard();

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
    },

    // Compares board with winningArray to see if the game is won
    isGameWon: (board, winningArray) => {
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
}

export default utils;