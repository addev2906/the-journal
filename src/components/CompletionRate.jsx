import React from 'react'
import './CompletionRate.css'

function CompletionRate({ foundCount, totalCount }) {
  const percentage = totalCount > 0 ? Math.round((foundCount / totalCount) * 100) : 0;

  return (
    <div className="completion-rate">
      <h2>Pictos Completion Rate: </h2>
      <h3>{`${foundCount} / ${totalCount} (${percentage}%)`}</h3>
    </div>
  );
}

export default CompletionRate