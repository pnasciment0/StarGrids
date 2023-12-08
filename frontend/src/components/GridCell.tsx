// GridCell.tsx

import React from 'react';

interface GridCellProps {
  rowCriteriaId: number;
  columnCriteriaId: number;
  position: number;
  positionNickname: string;
  answerPool: Array<{ actorId: number, numTimesActorIsGuessed: number }>;
  numTotalCorrectGuesses: number;
}

const GridCell: React.FC<GridCellProps> = ({ rowCriteriaId, columnCriteriaId, position, positionNickname, answerPool, numTotalCorrectGuesses }) => {
    return (
      <button className="grid-cell" onClick={() => console.log(`Clicked cell ${positionNickname}`)}>
        {/* Display content based on answerPool or other properties */}
        {answerPool.map(answer => (
          <div key={answer.actorId}>{/* Display actor name or other data here */}</div>
        ))}
      </button>
    );
  }
  
  export default GridCell;