import BoardTile from '../BoardTile/BoardTile';
import './BoardColumn.css';

function BoardColumn({ colNumber, column, fillTile }: { colNumber: number; column: string[]; fillTile: (columnNumber: number) => void }) {
  return (
    <div
      className="board-column"
      id={`columnNo_${colNumber}`}
      onClick={() => {
        fillTile(colNumber);
      }}
    >
      {column
        .slice(0)
        .reverse()
        .map((value, index) => (
          <BoardTile key={`tile-${index}_${colNumber}`} x={index} y={colNumber} value={value} />
        ))}
    </div>
  );
}

export default BoardColumn;
