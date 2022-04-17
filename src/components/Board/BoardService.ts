export const checkIfPlayerWon = (move: { player: string; column: number }, board: string[][]) => {
  const columnToCheck = prepareColumn(board, move.column);
  const rowToCheck = prepareRow(board, move.column, move.player);
  const diagRight = prepareDiagonalRight(board, move.column, move.player);
  const diagonalLeft = prepareDiagonalLeft(board, move.column, move.player);

  if (checkConnect4(columnToCheck, move.player)) {
    return true;
  }
  if (checkConnect4(rowToCheck, move.player)) {
    return true;
  }
  if (checkConnect4(diagRight, move.player)) {
    return true;
  }
  if (checkConnect4(diagonalLeft, move.player)) {
    return true;
  }

  return false;
};

export const checkIfValidMove = (columnNumber: number, board: string[][], won: boolean): boolean => {
  if (board[columnNumber] && board[columnNumber].includes('x') && !won) {
    return true;
  }
  return false;
};

const prepareColumn = (board: string[][], columnNumber: number): string[] => {
  return board[columnNumber];
};

const prepareRow = (board: string[][], columnNumber: number, player: string): string[] => {
  const lastPlayerMoveIndex = getLastPlayerMoveIndex(board, columnNumber, player);
  const row = [];
  for (const col in board) {
    row.push(board[col][lastPlayerMoveIndex]);
  }
  return row;
};

const prepareDiagonalRight = (board: string[][], columnNumber: number, player: string): string[] => {
  const diagonalRight = [];
  const lastPlayerMoveIndex = getLastPlayerMoveIndex(board, columnNumber, player);
  // Pivot array
  diagonalRight.push(board[columnNumber][lastPlayerMoveIndex]);
  if (lastPlayerMoveIndex >= 0 && columnNumber !== 0) {
    for (let i = 0; i < lastPlayerMoveIndex; i++) {
      if (columnNumber - (i + 1) >= 0) {
        diagonalRight.unshift(board[columnNumber - (i + 1)][lastPlayerMoveIndex - (i + 1)]);
      }
    }
  }
  if (lastPlayerMoveIndex < 5 && columnNumber !== 6) {
    for (let i = lastPlayerMoveIndex + 1; i <= 5; i++) {
      if (columnNumber + (i - lastPlayerMoveIndex) <= 6) {
        diagonalRight.push(board[columnNumber + (i - lastPlayerMoveIndex)][i]);
      }
    }
  }
  return diagonalRight;
};

const prepareDiagonalLeft = (board: string[][], columnNumber: number, player: string): string[] => {
  const diagonalLeft = [];
  const lastPlayerMoveIndex = getLastPlayerMoveIndex(board, columnNumber, player);
  // Pivot array
  diagonalLeft.push(board[columnNumber][lastPlayerMoveIndex]);
  if (lastPlayerMoveIndex < 5 && columnNumber !== 0) {
    for (let i = lastPlayerMoveIndex + 1; i <= 5; i++) {
      if (columnNumber - (i - lastPlayerMoveIndex) >= 0) {
        diagonalLeft.unshift(board[columnNumber - (i - lastPlayerMoveIndex)][i]);
      }
    }
  }
  if (lastPlayerMoveIndex >= 0 && columnNumber !== 6) {
    for (let i = 0; i < lastPlayerMoveIndex; i++) {
      if (columnNumber + (i + 1) <= 6) {
        diagonalLeft.push(board[columnNumber + (i + 1)][lastPlayerMoveIndex - (i + 1)]);
      }
    }
  }
  return diagonalLeft;
};

const getLastPlayerMoveIndex = (board: string[][], columnNumber: number, player: string): number => {
  return board[columnNumber].lastIndexOf(player);
};

const checkConnect4 = (tilesToCheck: string[], player: string) => {
  if (tilesToCheck.length < 4) {
    return false;
  }
  let playerCount: number = 0;
  for (let i = 0; i < tilesToCheck.length; i++) {
    if (tilesToCheck[i] === player) {
      playerCount += 1;
    } else if (playerCount < 4) {
      playerCount = 0;
    }
  }

  if (playerCount >= 4) {
    return true;
  }
};
