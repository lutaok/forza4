import { useReducer, useState } from 'react';
import { useSwapTurns } from '../../hooks/players';
import { boardReducer } from '../../reducers/BoardReducer';
import BoardColumn from '../BoardColumn/BoardColumn';
import './Board.css';
import { checkIfPlayerWon, checkIfValidMove } from './BoardService';

function Board() {
  const initialBoardState = [
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x'],
  ];

  const [boardState, setBoardState] = useReducer(boardReducer, initialBoardState);
  const [player, swapPlayer] = useSwapTurns();
  const [gameWon, setGameWon] = useState(false);

  const fillTile = (columnNumber: number) => {
    const valid = checkIfValidMove(columnNumber, boardState, gameWon);
    if (valid) {
      const move = {
        player: player,
        column: columnNumber,
      };
      setBoardState(move);
      if (checkIfPlayerWon(move, boardState)) {
        console.log('HAI VINTO!', move.player);
        setGameWon(true);
      } else {
        swapPlayer();
      }
    }
  };

  return (
    <div className="board">
      {boardState.map((column, index) => (
        <BoardColumn colNumber={index} key={`column_${index}`} column={column} fillTile={fillTile} />
      ))}
    </div>
  );
}

export default Board;
