export const boardReducer = (prevState: string[][], action: { column: number; player: string }) => {
  const column = prevState[action.column];
  const tileIndex = column.indexOf('x');
  if (action.player === 'p1') {
    column[tileIndex] = 'p1';
  } else if (action.player === 'p2') {
    column[tileIndex] = 'p2';
  }
  const newState = [...prevState];
  newState[action.column] = column;
  return newState;
};
