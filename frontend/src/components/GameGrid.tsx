//GameGrid.tsx

import React from 'react';
import dummyGridData from '../dummyGridData.json';
import GridCell from './GridCell';
import CriteriaCell from './CriteriaCell';

const GameGrid = () => {

  const gridSize = 3;
  return (

    <div className="grid-container">
      {/* Empty cell for top-left corner */}
      <div className="empty-cell"></div>

      {/* Column Criteria */}
      {dummyGridData.Criteria.map((criteria, index) => (
        <CriteriaCell key={`criteria-col-${index}`} criteria={criteria} />
      ))}

      {dummyGridData.Puzzle.map((cell, index) => (
        <>
          {/* Row Criteria for each new row */}
          {index % 3 === 0 && (
            <CriteriaCell key={`criteria-row-${index}`} criteria={{type: "Category"}} />
          )}
          <GridCell key={`cell-${index}`} {...cell} answerPool = {cell.possibleAnswers} />
        </>
      ))}
    </div>

  );
}
export default GameGrid;
