// CriteriaCell.tsx

import React from 'react';

interface CriteriaCellProps {
  criteria: { type: string; name?: string; description?: string; posterUrl?: string };
}

const CriteriaCell: React.FC<CriteriaCellProps> = ({ criteria }) => {
  return (
    <div className="criteria-cell">
      {criteria.type === "Movie" && (
        <>
          <img src={"https://www.themoviedb.org/t/p/w1280/" + criteria.posterUrl} alt={criteria.name} className="movie-poster" />
          <div className="movie-name">{criteria.name}</div>
        </>
      )}
      {criteria.type === "Category" && (
        <div className="category-description">{criteria.description}</div>
      )}
    </div>
  );
}

export default CriteriaCell;
