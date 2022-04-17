import { useEffect, useState } from 'react';
import './BoardTile.css';

function BoardTile({ x, y, value }: { x: number; y: number; value: string }) {
  const [tileColor, setTileColor] = useState('white');

  useEffect(() => {
    if (value === 'p1') {
      setTileColor('red');
    } else if (value === 'p2') {
      setTileColor('yellow');
    }
  }, [value]);

  const style = {
    top: 150 * x + 20,
    left: 15,
    backgroundColor: tileColor,
  };
  return <div className="board-tile" style={style}></div>;
}

export default BoardTile;
